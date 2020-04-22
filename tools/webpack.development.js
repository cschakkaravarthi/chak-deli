const path = require('path');

const PUBLIC_PATH = '/';
const APP_PATH = path.resolve(__dirname, '../index');

const config = {
  mode: 'development',
  output: {
    path: APP_PATH,
    publicPath: PUBLIC_PATH,
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js'
  },
  optimization: {
    nodeEnv: 'development',
    moduleIds: 'named',
    minimize: false
  }
};

module.exports = config;
