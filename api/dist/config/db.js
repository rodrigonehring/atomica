'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load({ path: '.env' });

/**
 * Connect to MongoDB.
 */
_mongoose2.default.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
_mongoose2.default.connection.on('error', function () {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running. db.js');
  process.exit(1);
});

exports.default = _mongoose2.default;