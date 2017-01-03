var webpack = require('webpack');

var BUILD_DIR = `${__dirname}/public`;
var APP_DIR = `${__dirname}/client/App`;

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;
