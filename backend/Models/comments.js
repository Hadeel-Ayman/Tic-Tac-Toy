const mongoose = require("mongoose");
const {Schema} =mongoose;
const CommentSchema = new Schema(
  {
    mentorApplicationId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    desc: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Comment= mongoose.model("Comment",CommentSchema)
module.exports=Comment