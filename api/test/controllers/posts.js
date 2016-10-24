import chai from 'chai';
import path from 'path';
import request from 'supertest';
import app from '../../src/app';

const expect = chai.expect;
const user1 = request.agent(app);

describe('Post Controller', () => {

	let id;

	it('should login', done => {
	  user1
	    .post('/api-v2/login')
	    .send({ email: 'admin@test.com', password: '123456' })
	    .end(done);
	});

	// it('should create a post', done => {
	// user1
	//   .post('/api-v2/posts')
	//   .attach('image', __dirname + '/500.jpg')
	//   .field('title', 'my awesome title')
	//   .field('content', 'my awesome content')
	//   .expect(({body}) => expect(body.title).to.be.equal('my awesome title'))
	//   .end(done);
	// });

	it('should get post', done => {
	user1
	  .get('/api-v2/posts/read/my-awesome-title')
	  .expect(res => {
	  	id = res.body._id;
	  	expect(res.body.slug).to.be.equal('my-awesome-title');
	  })
	  .end(done);
	});


	it('should delete post my-awesome-title', done => {
		user1
			.delete('/api-v2/delete/' + 'my-awesome-title')
			.expect(200)
			.end(done);
	});

});
