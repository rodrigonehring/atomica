import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';

const usersOnlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: false });


// Create new class with model methods 
class UserOnlineModel {

  static online({ name, image, id }) { 	
    return new this({
      name, image, id
    }).save().then(res => res);
  }

  static getAll() {
  	return this.find().then(users => users);
  }

  static offline(id) {
    return this.find({ _id: id})
      .remove();
  }
}
 
usersOnlineSchema.plugin(loadClass, UserOnlineModel);
module.exports = mongoose.model('UsersOnline', usersOnlineSchema);
