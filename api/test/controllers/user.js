const chai = require('chai');
const expect = chai.expect;
const app = require('../../src/app');
const request = require('supertest');
const db = require('../../src/config/db');


const user1 = request.agent(app);
// user1
//   .post('/api-v2/login')
//   .send({ email: 'admin@test.com', password: '123456' }).end(console.log);


describe('User Controller', () => {

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

  it('/api-v2/status - connected', function(done) {
    user1
      .get('/api-v2/status')
      .expect(function(res) {
        expect(res.body).to.not.be.equal('not_connected');
      })
      .expect(200, done);
  });

});
