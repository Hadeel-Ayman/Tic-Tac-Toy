const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  googleId: {
    type: String,
  },
  gitId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(val) {
      let password = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
      );
      if (!password.test(val)) {
        throw new Error(
          "password must include uppercase, lowercase, number, special character !@#$%^&*"
        );
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error("email is invalid");
    },
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
  // messages : [
  //   {
  //     type : mongoose.Schema.Types.ObjectId,
  //     ref  :'Message',
  //   }
  // ]
});

userSchema.virtual("messages" , {
  ref : "Message",
  foreignField : "sender",
  localField   :"_id"
})


userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(8);
    this.password = await bcryptjs.hash(this.password, salt);
  }
});

userSchema.methods.generateToken = async function () {
  const user = this
  const token = jwt.sign(
    {
      _id: user._id.toString()
    }, 'SECRET_KEY')
  user.tokens = user.tokens.concat(token)
  await user.save()
  return token
}

userSchema.methods.toJson = function () {
  const userObject = this.toObject(); //important to convert document to object
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// Login
userSchema.statics.findByCredentials = async (mail, pass) => {
  const user = await User.findOne({ email: mail });
  if (!user) {
    throw new Error('Error logging')
  }
  const isMatch = await bcryptjs.compare(pass, user.password)
  if (!isMatch) {
    throw new Error('Error logging')
  }
  return user
}

const User = mongoose.model("User", userSchema);
module.exports = User;