'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongoose = require('mongoose');
var loadClass = require('mongoose-class-wrapper');

var postSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  title: String,
  content: String,
  image: String
}, { timestamps: true });

// Create new class with model methods 

var PostModel = function () {
  function PostModel() {
    _classCallCheck(this, PostModel);
  }

  _createClass(PostModel, null, [{
    key: 'newPost',
    value: function newPost(_ref) {
      var _this = this;

      var title = _ref.title;
      var content = _ref.content;
      var image = _ref.image;
      var slug = _ref.slug;

      var errors = [];
      if (!title) errors.push('missing_title');else if (title.length < 4) errors.push('missing_title');
      if (!content) errors.push('missing_content');
      if (!image) errors.push('missing_image');
      if (!slug) errors.push('missing_slug');

      if (errors.length) throw errors;

      return this.findOne({ slug: slug }).then(function (post) {
        if (post) throw 'already_exist';
        return new _this({ title: title, content: content, image: image, slug: slug }).save(function (err) {
          return err;
        });
      });
    }
  }, {
    key: 'getPost',
    value: function getPost(_ref2) {
      var slug = _ref2.slug;

      return this.findOne({ slug: slug }).then(function (post) {
        if (!post) throw 'post_not_found';
        return post;
      });
    }
  }, {
    key: 'editPost',
    value: function editPost(slugId, _ref3) {
      var title = _ref3.title;
      var slug = _ref3.slug;
      var image = _ref3.image;
      var content = _ref3.content;

      return this.findOne({ slug: slugId }).then(function (post) {
        if (!post) throw 'post_not_found';
        if (title) post.title = title;
        if (slug) post.slug = slug;
        if (image) post.image = image;
        if (content) post.content = content;

        return post.save();
      });
    }
  }, {
    key: 'removePost',
    value: function removePost(_ref4) {
      var slug = _ref4.slug;

      return this.findOne({ slug: slug }).remove();
    }
  }]);

  return PostModel;
}();

postSchema.plugin(loadClass, PostModel);
module.exports = mongoose.model('Post', postSchema);