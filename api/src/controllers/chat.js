const Slug = require('slug')
const Chat = require('../models/Chat');


// console.log('socket',)

const controller = sockets => ({

	getMessages(req, res) {
		Chat.getAllMessages().then(messages => {
			res.json(messages);
		})
	},

	addMessage(req, res) {
		if (!req.body.message) 
			res.status(403).json({msg: 'empty_message'});

		Chat.newMessage(req.body.message, req.user, req.body.type).then(obj => {
			sockets.emit('action', {
				type: 'NEW_MESSAGE',
				data: obj,
			});
			res.json(obj._id);
		});
	},

	deleteMessages(req, res) {
		Chat.deleteAllMessages().then(() => {
			sockets.emit('action', {
				type: 'REMOVED_ALL_MESSAGES',
			});
			res.json({msg: 'removed_all_messages'});
		})
	},

	deleteMessage(req, res) {
		if (!req.user || !req.user.admin)
			return res.status(403).json({msg: 'not_authorized'});

		const id = req.params.id;

		if (id == 'undefined')
			res.status(403).end();

		Chat.deleteMessage(id).then(() => {
			sockets.emit('removed_message', id);
			res.json({msg: 'removed_message'});
		})
	},

})

export default controller;