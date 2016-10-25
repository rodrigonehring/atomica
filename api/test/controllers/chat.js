const chai = require('chai');
const expect = chai.expect;
const app = require('../../src/app');
const request = require('supertest');


const user1 = request.agent(app);


describe('Chat Controller', () => {

  // it('/api-v2/status - not_connected', function(done) {
  //   user1
  //     .get('/api-v2/status')
  //     .expect(function(res) {
  //       expect(res.body).to.be.equal('not_connected');
  //     })
  //     .expect(200, done);
  // });

  // it('/api-v2/create-account - should create account', function(done) {
  //   user1
  //     .post('/api-v2/create-account')
  //     .send({
  //       email: 'admin@test.com',
  //       password: '123456',
  //       password2: '123456',
  //     })
  //     .expect(200, done);
  // });

  it('should login', done => {
    user1
      .post('/api-v2/login')
      .send({ email: 'admin@test.com', password: '123456' })
      .end(done);
  });

  it('list messages', function(done) {
    user1
      .get('/api-v2/chat')
      .expect(function(res) {
        expect(res.body.length).to.be.least(0);
      })
      .expect(200, done);
  });

  it('delete messages', function(done) {
    user1
      .delete('/api-v2/chat')
      .expect(function(res) {
        console.log(res.body);
        // expect(res.body.length).to.be.least(1);
      })
      .expect(200, done);
  });

  // it('list messages empty', function(done) {
  //   user1
  //     .get('/api-v2/chat')
  //     .expect(function(res) {
  //       expect(res.body.length).to.be.equal(0);
  //     })
  //     .expect(200, done);
  // });

});
