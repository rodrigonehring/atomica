const mongoose = require('mongoose');
const loadClass = require('mongoose-class-wrapper');

const postSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  title: String,
  content: String,
  image: String,
}, { timestamps: true });

// Create new class with model methods 
class PostModel {

  static newPost({ title, content, image, slug }) {
  	let errors = [];
  	if (!title) errors.push('missing_title');
  	else if (title.length < 4) errors.push('missing_title');
    if (!content) errors.push('missing_content');
    if (!image) errors.push('missing_image');
    if (!slug) errors.push('missing_slug');

  	if (errors.length) throw errors;
  	
    return this.findOne({ slug })
    	.then(post => {
    		if (post) throw('already_exist');
    		return new this({title, content, image, slug}).save(err => err);
    	});
  }

  static getPost({ slug }) {
  	return this.findOne({ slug })
  		.then(post => {
  			if (!post) throw('post_not_found');
  			return post;
  		});
  }

  static editPost(slugId, { title, slug, image, content }) {
		return this.findOne({ slug: slugId })
			.then(post => {
				if (!post) throw('post_not_found');
        if (title) post.title = title;
        if (slug) post.slug = slug;
        if (image) post.image = image;
        if (content) post.content = content;

				return post.save();
			});
	}

	static removePost({ slug }) {
		return this.findOne({ slug })
			.remove();
	}
 
}
 
postSchema.plugin(loadClass, PostModel);
module.exports = mongoose.model('Post', postSchema);
