'use strict';

var Slug = require('slug');
var Chat = require('../models/Chat');

exports.getAllMessages = function (req, res) {
	Post.find().sort('-createdAt').exec(function (err, posts) {
		return res.json(posts);
	});
};

modules.exports = {
	getAllMessages: function getAllMessages(req, res) {
		Chat.getAllMessages().then(res.json);
	},
	newMessage: function newMessage(req, res) {}
};