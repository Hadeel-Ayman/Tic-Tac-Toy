const express = require("express");
const { register, login } = require("../Controllers/userController");

const User = require("../Models/userModel");
const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id }).populate("messages");
    console.log(user);
    res.json(user);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
