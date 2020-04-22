const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const PUBLIC_PATH = '/';
const DIST_PATH = path.resolve(__dirname, '../dist');

const config = {
  mode: 'production',
  output: {
    path: DIST_PATH,
    publicPath: PUBLIC_PATH,
    filename: '[name].[contenthash:8].js', // chunkhash
    chunkFilename: 'chunk.[name].[chunkhash:8].js' // chunkhash
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name (module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin()
    ]
  }
};

module.exports = config;
