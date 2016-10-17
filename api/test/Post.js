const chai = require('chai');
const expect = chai.expect;
const Post = require('../models/Post');

describe('Post Model', () => {
  it('should create a new post', (done) => {
    Post.newPost({title: 'olar', content: '...', slug: 'slug-olar', image: '...'}).then(res => {
      console.log(res);
      done()
    });
  });

  it('should find user by slug', (done) => {
    Post.findOne({ slug: 'slug-olar' }, (err, user) => {
      expect(err).to.be.null;
      expect(user.slug).to.equal('slug-olar');
      done();
    });
  });


});
