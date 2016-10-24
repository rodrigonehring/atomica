// const chai = require('chai');
// const expect = chai.expect;

// var io = require('socket.io-client'),
//     server = require('../src/app');


// var socketURL = 'http://localhost:5000';
// var chatUser1 = {'name':'Tom'};

// var options ={
//   transports: ['websocket'],
//   'force new connection': true
// };


// describe("Chat Server",function(){
// 	console.log('1');

//   /* Test 1 - A Single User */
//   it('Should broadcast new user once they connect',function(done){
//     var client = io.connect(socketURL, options);

//     client.on('connect',function(data){
//       	client.emit('connectionname',chatUser1);
//     });

//     client.on('new user',function(usersName){
//     	console.log('3');
//       usersName.should.be.type('string');
//       usersName.should.equal(chatUser1.name + " has joined.");
//       /* If this client doesn't disconnect it will interfere 
//       with the next test */
//       client.disconnect();
//       done(); 
//     });
//   });


// });