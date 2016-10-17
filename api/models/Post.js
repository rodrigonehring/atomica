const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  slug: { type: String, unique: true },
  title: String,
  content: String,
  image: String,
}, { timestamps: true });

Schema.statics.newPost = function({ title, content, image, slug }) {
	return this.findOne({ slug })
		.then((err, existing) => {
			if (existing) throw new Error('Já existe');
			return new this({title, content, image, slug}).save(err => err);
		});
};

const Post = mongoose.model('Post', Schema);

module.exports = Post;
