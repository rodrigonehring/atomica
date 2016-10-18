const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  slug: { type: String, unique: true },
  title: String,
  content: String,
  image: String,
}, { timestamps: true });

Schema.statics.newPost = function({ title, content, image, slug }) {
	return this.findOne({ slug })
		.then(post => {
			if (post) throw('already_exist');
			return new this({title, content, image, slug}).save(err => err);
		});
}

Schema.statics.getPost = function({ slug }) {
	return this.findOne({ slug })
		.then(post => {
			if (!post) throw('post_not_found');
			return post;
		});
}

Schema.statics.editPost = function({ slug }) {
	return this.findOne({ slug })
		.then(post => {
			if (!post) throw('post_not_found');
			return post;
		});
}

Schema.statics.removePost = function({ slug }) {
	return this.findOne({ slug })
		.remove();
}

const Post = mongoose.model('Post', Schema);

module.exports = Post;
