'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Slug = require('slug');
var Post = require('../models/Post');

exports.listPosts = function (req, res) {
	Post.find().sort('-createdAt').exec(function (err, posts) {
		return res.json(posts);
	});
};

exports.postSlug = function (req, res) {
	Post.findOne({ slug: req.params.slug }, function (err, post) {
		if (err) res.json(err);
		if (!post) {
			res.status(404).json({ msg: 'Post nao encontrado' });
		} else {
			res.json(post);
		}
	});
};

exports.addPost = function (req, res) {

	if (req.user && req.user.admin) {
		var _ret = function () {
			if (!req.file) {
				return {
					v: res.status(400).json({ msg: 'Esqueceu da imagem?' })
				};
			}
			if (!req.body.title || !req.body.content) {
				return {
					v: res.status(400).json({ msg: 'Empty title or content, fix it' })
				};
			}
			var post = new Post({
				slug: Slug(req.body.title),
				title: req.body.title,
				content: req.body.content,
				image: req.file.filename
			});

			Post.findOne({ slug: Slug(req.body.title) }, function (err, existingPost) {
				if (existingPost) {
					return res.status(409).json({ msg: 'Already have a post with this slug, change the title please' });
				}
				post.save(function (err) {
					if (err) {
						return next(err);
					}
					res.json({ post: post });
				});
			});
		}();

		if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	} else {
		return res.status(401).json({ msg: 'Precisa ser admin para enviar um Post!!!!111!' });
	}
};

exports.deletePost = function (req, res) {
	if (req.user._id == req.params.id) return res.status(400).json({ msg: 'Se deletar?' });
	if (req.user && req.user.admin) {
		Post.findOne({ _id: req.params.id }).remove().then(function () {
			res.json({ msg: 'removed' });
		});
	} else {
		res.status(401).json({ msg: 'permission denied' });
	}
};