const express = require("express");
const multer = require("multer");
const messageController = require("../Controllers/messageController");
const auth = require("../middleware/auth");
const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

router.post("/messages/:senderId", auth, messageController.createMessage);
router.get("/messages/:id", auth, messageController.getMessagesById);
router.get("/messages", auth, messageController.getMessagesBySender);

module.exports = router;
