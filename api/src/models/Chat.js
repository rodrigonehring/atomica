import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';

const chatSchema = new mongoose.Schema({
  messages: Array,
  users: Array,
}, { timestamps: false });


// Create new class with model methods 
class ChatModel {

  static newMessage(message) { 	
    return this.find().then(chat => {
      chat.messages.concat(message);
      return chat.save();
    })
  }

  static newUserOnline(user) {  
    return this.find().then(res => {
      res.users.concat(user);
      return res.save()
    })
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
