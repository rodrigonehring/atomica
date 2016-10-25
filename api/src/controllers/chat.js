
const Slug = require('slug')
const Chat = require('../models/Chat');
import Socket from './sockets';
const socket = new Socket();


export default {

	getMessages(req, res) {
		Chat.getAllMessages().then(messages => {
			res.json(messages);
		})
	},

	addMessages(req, res) {
		if (!req.body.message) res.status(403).json({msg: 'empty_message'})
		Chat.newMessage(req.body.message).then(() => {
			res.json({msg: 'ok'});
		});
	},

	deleteMessages(req, res) {
		Chat.deleteAllMessages().then(() => {
			res.json({msg: 'removed_all_messages'});
		})
	},
}
