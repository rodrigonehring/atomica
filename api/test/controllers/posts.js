const chai = require('chai');
const expect = chai.expect;
const app = require('../../src/app');
const request = require('supertest');
const db = require('../../src/config/db');

import path from 'path';

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
	  })
	  .end(done);
	});


	// it('should delete post my-awesome-title', done => {
	// 	user1
	// 		.delete('/api-v2/delete/' + id)
	// 		.end(done);
	// });

});
