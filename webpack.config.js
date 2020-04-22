const merge = require('webpack-merge');

module.exports = function (env, argv) {
  return merge(
    require('./tools/webpack.common.js')(env || argv.mode),
    require(`./tools/webpack.${env || argv.mode}.js`)
  );
};
