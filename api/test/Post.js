const chai = require('chai');
const expect = chai.expect;
const db = require('../config/db');
const Post = require('../models/Post');

describe('Post Model', () => {

  it('should create a new post', (done) => {
    Post.newPost({title: 'olar', content: '...', slug: 'slug-olar', image: '...'}).then(() => {
      done();
    }).catch(console.log);
  });

  it('should create a new post with same name', (done) => {
    Post.newPost({title: 'olar', content: '...', slug: 'slug-olar', image: '...'}).then(() => {
      done();
    }).catch(err => {
      expect(err).to.be.equal('already_exist');
      done()
    });
  });

  it('should find post by slug', (done) => {
    Post.getPost({ slug: 'slug-olar' })
      .then(post => {
        expect(post.slug).to.equal('slug-olar');
        done();
      });
  });

  // it('should edit a post', (done) => {
  //   Post.editPost({ slug: 'slug-olar' })
  //     .then(post => {
  //       expect(post.slug).to.equal('slug-olar');
  //       done();
  //     });
  // });

  it('should remove post', (done) => {
    Post.removePost({ slug: 'slug-olar' })
    .then(() => {
      done();
    })
  });

  it('should not find post by slug, because is deleted', (done) => {
    Post.getPost({ slug: 'slug-olar' })
      .catch(err => {
        expect(err).to.be.equal('post_not_found');
        done()
      });
  });

});
