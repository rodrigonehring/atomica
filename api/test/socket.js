// const chai = require('chai');
// const expect = chai.expect;

// var io = require('socket.io-client'),
//     server = require('../src/app');


// var socketURL = 'http://localhost:5000';

// var chatUser1 = {
// 	name:'Tom',
// 	id: '1',
//   image: 'url',
// };

// var options ={
//   transports: ['websocket'],
//   'force new connection': true
// };


// describe("Chat Server",function(){

//   /* Test 1 - A Single User */
//   it('Should broadcast new user once they connect',function(done){
//     var client = io.connect(socketURL, options);

//     client.on('connect',function(data){
//       	client.emit('user', chatUser1);
//     });

//     client.on('new message',function(message) {
//       console.log(message);
//       // expect(usersName).to.be.a('string');
//       // expect(usersName).to.be.equal(chatUser1.name + ' has joined.')
//       client.disconnect();
//       done(); 
//     });
//   });


// });