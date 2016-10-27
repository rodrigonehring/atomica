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



  


describe('Chat Controller', () => {
  let id;


  it('should login', done => {
    user1
      .post('/api-v2/login')
      .send({ email: 'admin@test.com', password: '123456' })
      .end(done);
  });


  it('add message and receive via sockets', function(done) {
    const client = io.connect(socketURL, options);
    client.on('connect', function(message) {
      user1
        .post('/api-v2/chat')
        .send({
          message: 'olar!!',
        })
        .expect(function(res) {
          expect(res.body.msg).to.be.equal('ok');
        }).end();

      client.on('new_message',function(message) {
        expect(message).to.be.a('object');
        id = message._id;
        expect(message.message).to.be.equal('olar!!');
        client.disconnect();
        done(); 
      });

    }); // on connect
  });

  it('add message and receive via sockets', function(done) {
    const client = io.connect(socketURL, options);
    client.on('connect', function(message) {
      user1
        .post('/api-v2/chat')
        .send({
          message: 'olar!!',
        })
        .expect(function(res) {
          expect(res.body.msg).to.be.equal('ok');
        }).end();

      client.on('new_message',function(message) {
        expect(message).to.be.a('object');
        id = message._id;
        expect(message.message).to.be.equal('olar!!');
        client.disconnect();
        done(); 
      });

    }); // on connect
  });

  it('add message and receive via sockets', function(done) {
    const client = io.connect(socketURL, options);
    client.on('connect', function(message) {
      user1
        .post('/api-v2/chat')
        .send({
          message: 'olar!!',
        })
        .expect(function(res) {
          expect(res.body.msg).to.be.equal('ok');
        }).end();

      client.on('new_message',function(message) {
        expect(message).to.be.a('object');
        id = message._id;
        expect(message.message).to.be.equal('olar!!');
        client.disconnect();
        done(); 
      });

    }); // on connect
  });

  it('list messages', function(done) {
    user1
      .get('/api-v2/chat')
      .expect(function(res) {
        expect(res.body.length).to.be.least(3);
        done();
      }).end();
  });

  it('delete single message', function(done) {
    const client = io.connect(socketURL, options);

    client.on('connect', function(message) {
      user1
        .delete('/api-v2/chat/' + id)
        .expect(function(res) {
          expect(res.body.msg).to.be.equal('removed_message');
        })
        .end();

      client.on('removed_message', res => {
        expect(res).to.be.equal(id);
        done();
      });

    }); // on connect

  });

  it('delete all messages', function(done) {
    const client = io.connect(socketURL, options);
    client.on('connect', function(message) {
      user1
        .delete('/api-v2/chat')
        .end(function(res) {
          expect(res.body.msg).to.be.equal('removed_all_messages');
        });

        client.on('removed_all_messages', function() {
          client.disconnect();
          done();
        });
    }); // on connect
  });

  // it('list messages empty after deletion', function(done) {
  //   user1
  //     .get('/api-v2/chat')
  //     .expect(function(res) {
  //       expect(res.body.length).to.be.equal(0);
  //       done();
  //     }).end();
  // });

  // it('list messages empty', function(done) {
  //   user1
  //     .get('/api-v2/chat')
  //     .expect(function(res) {
  //       expect(res.body.length).to.be.equal(0);
  //     })
  //     .expect(200, done);
  // });





});



