const chai = require('chai');
const expect = chai.expect;
const app = require('../../src/app');
const request = require('supertest');


const user1 = request.agent(app);
var io = require('socket.io-client');
var socketURL = 'http://localhost:5000';


var options ={
  transports: ['websocket'],
  'force new connection': true
};

const client = io.connect(socketURL, options);
client.on('connect', function(message) {
  


describe('Chat Controller', () => {


  it('should login', done => {
    user1
      .post('/api-v2/login')
      .send({ email: 'admin@test.com', password: '123456' })
      .end(done);
  });


  it('add message', function(done) {



    user1
      .post('/api-v2/chat')
      .send({
        message: 'olar!!',
      })
      .expect(function(res) {
        expect(res.body.msg).to.be.equal('ok');
        done();
      });

    //   client.emit('worked!', 'worked');

    // client.on('new message',function(message) {
    //   console.log(message);
    //   // expect(usersName).to.be.a('string');
    //   // expect(usersName).to.be.equal(chatUser1.name + ' has joined.')
    //   client.disconnect();
    //   done(); 
    // });


  });

  it('list messages', function(done) {
    user1
      .get('/api-v2/chat')
      .expect(function(res) {
        console.log(res.body);
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



});



