const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  title: String,
  content: String,
  image: String,
}, { timestamps: true });


const Post = mongoose.model('Post', userSchema);

module.exports = Post;
