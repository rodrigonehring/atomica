const mongoose = require('mongoose');
const loadClass = require('mongoose-class-wrapper');

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    name: String,
    id: String,
    image: String,
  },
}, { timestamps: true });

// Create new class with model methods 
class ChatModel {

  static newMessage({ message, user }) { 	
    return new this({
      message,
      user: {
        name: user.name,
        id: user.id,
        image: user.image,
      }
    }).save();
  }

  static getAllMessages() {
  	return this.find().then(messages => messages);
  }

  static removeMessage(id) {
    return this.find({ _id: id})
      .remove();
  }
 
}
 
chatSchema.plugin(loadClass, ChatModel);
module.exports = mongoose.model('Chat', chatSchema);
