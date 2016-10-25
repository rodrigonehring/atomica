const Slug = require('slug')
const Chat = require('../models/Chat');


// console.log('socket',)

const controller = sockets => ({

	getMessages(req, res) {
		Chat.getAllMessages().then(messages => {
			res.json(messages);
		})
	},

	addMessages(req, res) {
		if (!req.body.message) res.status(403).json({msg: 'empty_message'})
		Chat.newMessage(req.body.message, req.user).then(obj => {
			// io.sockets.on('connect', () => {
			// 	sockets.emit('new message', 'olar');
			// });
			res.json({msg: 'ok'});
		});
	},

	deleteMessages(req, res) {
		Chat.deleteAllMessages().then(() => {
			res.json({msg: 'removed_all_messages'});
		})
	},

})

export default controller;