const chai = require('chai');
const expect = chai.expect;
const db = require('../../config/db');
const Post = require('../../models/Post');

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

  it('should edit a post title', (done) => {
    Post.editPost('slug-olar', {
      title: 'ae',
    })
    .then(post => {
      expect(post.title).to.equal('ae');
      done();
    });
  });

  it('should edit a post slug', (done) => {
    Post.editPost('slug-olar', {
      slug: 'nova-slug',
    })
    .then(post => {
      expect(post.slug).to.equal('nova-slug');
      done();
    });
  });

  it('should remove post', (done) => {
    Post.removePost({ slug: 'nova-slug' })
    .then(() => {
      done();
    })
  });

  it('should not find post by slug, because is deleted', (done) => {
    Post.getPost({ slug: 'nova-slug' })
      .catch(err => {
        expect(err).to.be.equal('post_not_found');
        done()
      });
  });



    // it('should not create a new post', done => {
    //   Post.newPost({title: 'olar'})
    //   .catch(err => {
    //     expect(err).to.be.equal('post_not_found');
    //     done();
    //   });
    // });



});
