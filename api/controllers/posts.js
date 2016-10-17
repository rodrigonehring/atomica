
const Slug = require('slug')
const Post = require('../models/Post');


exports.listPosts = (req, res) => {
    Post.find().sort('-createdAt').exec((err, posts) => res.json(posts))
}

exports.postSlug = (req, res) => {
	Post.findOne({slug: req.params.slug}, (err, post) => {
		if (err) res.json(err)
		if (!post) {
			res.status(404).json({msg: 'Post nao encontrado'})
		} else {
			res.json(post)
		}
	})
}


exports.addPost = (req, res) => {

	if (req.user && req.user.admin) {
        if (!req.file) {
            return res.status(400).json({msg: 'Esqueceu da imagem?'})
        }
        if (!req.body.title || !req.body.content) {
          return res.status(400).json({ msg: 'Empty title or content, fix it' })
        }
		const post = new Post({
			slug: Slug(req.body.title),
			title: req.body.title,
			content: req.body.content,
            image: req.file.filename
		});

		Post.findOne({ slug: Slug(req.body.title) }, (err, existingPost) => {
			if (existingPost) {
			  return res.status(409).json({ msg: 'Already have a post with this slug, change the title please' })
			}
			post.save((err) => {
			  if (err) { return next(err) }
			    res.json({post: post})
			});
		});
	} else {
		return res.status(401).json({msg: 'Precisa ser admin para enviar um Post!!!!111!'})
	}
}

exports.deletePost = (req, res) => {
  if (req.user._id == req.params.id)
    return res.status(400).json({msg: 'Se deletar?'})
  if (req.user && req.user.admin) {
    Post.findOne({_id: req.params.id}).remove()
      .then(() => {
        res.json({msg: 'removed'})
      })
  } else {
    res.status(401).json({msg: 'permission denied'})
  }
}
