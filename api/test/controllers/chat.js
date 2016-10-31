import test from 'ava';
const app = require('../../src/app');
const request = require('supertest');


const user1 = request.agent(app);
var io = require('socket.io-client');
var socketURL = 'http://localhost:5000';


var options ={
  transports: ['websocket'],
  'force new connection': true
};

test.before(t => user1
  .post('/api-v2/login')
  .send({ email: 'admin@test.com', password: '123456' })
  .then(function(res) {
    t.is(res.body.user.email, 'admin@test.com');
    // t.pass();
  })
);

test('status online', t => user1
  .get('/api-v2/status')
  .then(function(res) {
    t.is(res.body.user.email, 'admin@test.com');
  })
);


test('add message and receive via sockets', t => {
    const client = io.connect(socketURL, options);

    return new Promise((resolve, reject) => {
        client.on('connect', message => {
            user1
              .post('/api-v2/chat')
              .send({
                message: 'olar!!',
              }).then();

            client.on('new_message', res => {
                t.is(res.message, 'olar!!');
                client.disconnect();
                resolve();
            });
        }); // on connect
    });
});



test('list messages - not empty!', t => {
  user1
    .post('/api-v2/chat')
    .send({
      message: 'olar!!',
    }).then(() => {
      user1
        .get('/api-v2/chat')
        .then(({ body }) => {
            if (body.length !== 0)
                t.pass(body);
            else t.fail('empty!')
        })
    });
});

test('delete single message', t => {
    return new Promise((resolve, reject) => {
        const client = io.connect(socketURL, options);
        let id;
        client.on('connect', message => {

            user1
              .post('/api-v2/chat')
              .send({
                message: 'olar!!',
              }).then(res => {
                id = res.body;
                user1
                    .delete('/api-v2/chat/' + id)
                    .then(({ body }) => {
                        if (body !== 'removed_message')
                            reject('wrong');
                    });
              });

            client.on('removed_message', res => {
                t.is(res, id);
                client.disconnect();
                resolve();
            });
        }); // on connect
    });
});


// test('delete all messages', t => {
//     return new Promise((resolve, reject) => {
//         const client = io.connect(socketURL, options);
//         client.on('connect', message => {

//             user1
//               .post('/api-v2/chat')
//               .send({
//                 message: 'olar!!',
//               }).then(() => {
//                 user1
//                   .post('/api-v2/chat')
//                   .send({
//                     message: 'olasadsar!!',
//                   }).then(() => {
//                     user1
//                       .post('/api-v2/chat')
//                       .send({
//                         message: 'oladsadsar!!',
//                       }).then(() => {
//                         user1
//                           .get('/api-v2/chat')
//                           .then(({ body }) => {
//                               if (body.length < 3)
//                                 reject('menor que 3');
//                               user1
//                                 .delete('/api-v2/chat')
//                                 .then(function(res) {
//                                   if (res !== 'removed_all_messages')
//                                     reject('!removed_all_messages');
//                                 });
//                           });
//                       });
//                   });
//               });
            
//             client.on('removed_all_messages', res => {
//                 client.disconnect();
//                 resolve();
//             });
//         }); // on connect
//     });
// });
