'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongoose = require('mongoose');
var loadClass = require('mongoose-class-wrapper');

var chatSchema = new mongoose.Schema({
  message: String,
  user: {
    name: String,
    id: String,
    image: String
  }
}, { timestamps: true });

// Create new class with model methods 

var ChatModel = function () {
  function ChatModel() {
    _classCallCheck(this, ChatModel);
  }

  _createClass(ChatModel, null, [{
    key: 'newMessage',
    value: function newMessage(_ref) {
      var message = _ref.message;
      var user = _ref.user;

      return new this({
        message: message,
        user: {
          name: user.name,
          id: user.id,
          image: user.image
        }
      }).save();
    }
  }, {
    key: 'getAllMessages',
    value: function getAllMessages() {
      return this.find().then(function (messages) {
        return messages;
      });
    }
  }, {
    key: 'removeMessage',
    value: function removeMessage(id) {
      return this.find({ _id: id }).then(function (message) {
        if (!message) throw 'message_not_found';
      }).remove();
    }
  }]);

  return ChatModel;
}();

chatSchema.plugin(loadClass, ChatModel);
module.exports = mongoose.model('Post', chatSchema);