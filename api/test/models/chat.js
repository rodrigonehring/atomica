// const chai = require('chai');
// const expect = chai.expect;
// const Chat = require('../../src/models/Chat');
// const db = require('../../src/config/db');

// describe('Chat Model', () => {
//   let id;

//   it('should create a new message', done => {

//     Chat.newMessage({
//       message: 'olar!',
//       user: {
//         name: 'rodrigo',
//         id: '0000',
//         image: '.jpg',
//       }
//     }).then(res => {
//       id = res.id;
//       expect(res.message).to.equal('olar!');
//       done();
//     });

//   });

//   it('should find in array of all messages the one created before', done => {

//     Chat.getAllMessages().then(res => {
//       let one = res.filter(item => item._id == id)[0];
//       expect(one.message).to.be.equal('olar!');
//       done();
//     });

//   });

//   it('should delete the one created before', done => {

//     Chat.removeMessage(id).then(res => {
//       done();
//     });

//   });

//   it('should not find id x', done => {

//     Chat.getAllMessages().then(res => {
//       let one = res.filter(item => item._id == id)[0];
//       expect(one).to.be.undefined;
//       done();
//     });

//   });

// });
