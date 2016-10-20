const mongoose = require('mongoose');
const loadClass = require('mongoose-class-wrapper');

const chatSchema = new mongoose.Schema({
  message: String,
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
      .then(message => {
        if (!message) throw('message_not_found');
      }).remove();
  }
 
}
 
chatSchema.plugin(loadClass, ChatModel);
module.exports = mongoose.model('Post', chatSchema);
