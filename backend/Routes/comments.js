const express = require("express")
const Comment =require('../Controllers/comments')

const auth = require("../middleware/auth");
const router=express.Router()
router.post("/:mentorApplicationId", auth, Comment.addComment);
router.delete("/:mentorApplicationId", auth, Comment.deleteComment);
router.get("/", Comment.getComment);
module.exports=router