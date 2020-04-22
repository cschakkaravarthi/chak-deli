const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');


//const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const APP_PATH = path.resolve(__dirname, '../src');
const ENTRY_PATH = path.resolve(APP_PATH, './index.tsx');

module.exports = function (env) {
  return {
    target: 'web',
    entry: ENTRY_PATH,
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      symlinks: false
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|css|eot|ttf)$/,
          loader: 'file-loader'
        },
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            env !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-url-loader',
          options: {
            noquotes: true
          }
        }
      ]
    },
    node: {
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(APP_PATH, 'index.html')
      }),

      new MomentLocalesPlugin(),
      /*new LodashModuleReplacementPlugin({
        'collections': true,
        'paths': true
      }),*/
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static'
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/manifest.json',
          to: 'manifest.json',
          toType: 'file'
        }, {
          from: 'src/assets',
          to: 'assets'
        }, {
          from: 'src/config',
          to: 'config'
        }, {
          from: 'src/.well-known',
          to: '.well-known'
        }
      ]),
      new InjectManifest({
        swSrc: 'src/sw.js',
        swDest: 'sw.js',
        exclude: [/\.map$/]
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css'
      })
    ],
    devServer: {
      historyApiFallback: true,
      compress: true,
      allowedHosts: ['.umusic.net'],
      port: 5000
    }
  };
};
