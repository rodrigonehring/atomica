import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';

const chatSchema = new mongoose.Schema({
  message: String,
  type: String,
  user: Object,
}, { timestamps: true });

const chatOnlineSchema = new mongoose.Schema({
  email: String,
  userID: String,
}, { timestamps: true });

const chatOnline = mongoose.model('ChatOnline', chatOnlineSchema);


// Create new class with model methods 
class ChatModel {

  static newMessage(message, user, type = 'message') { 	
    return new this({
      message,
      user: {
        email: user.email,
      },
      type,
    }).save();
  }

  static newUserOnline({ email, id,  }) {  
    return new chatOnline({
      email,
      userID: id,
    }).save();
  }

  static getUsersOnline() {
    return chatOnline.find({});
  }

  static getAllMessages() {
  	return this.find().then(messages => messages);
  }

  static deleteAllMessages() {
    return this.remove({})
  }

  static deleteMessage(id) {
    return this.remove({ _id: id})
  }
}
 
chatSchema.plugin(loadClass, ChatModel);

module.exports = mongoose.model('Chat', chatSchema);
