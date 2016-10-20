
const Slug = require('slug')
const Chat = require('../models/Chat');


exports.getAllMessages = (req, res) => {
    Post.find().sort('-createdAt').exec((err, posts) => res.json(posts))
}


modules.exports = {
	getAllMessages(req, res) {
		Chat.getAllMessages()
		.then(res.json);
	},
	newMessage(req, res) {

	},
}