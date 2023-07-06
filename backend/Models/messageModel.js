// messageModel.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // model
    required: true,
  },
  receiverId: { 
    type: String,
    required: true 
  },
  messageContent: {
    type: String, 
    required: true 
  },
  sendDate: { 
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
