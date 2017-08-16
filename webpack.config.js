'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var styleLintPlugin = require('stylelint-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

require('es6-promise').polyfill();

module.exports = {
  entry: './src/main.js',

  output: {
    path: './build',
    filename: 'js/app.js'
  },

  plugins: [
    // Specify the resulting CSS filename
    new ExtractTextPlugin('css/app.css'),

    // Stylelint plugin
    new styleLintPlugin({
      configFile: '.stylelintrc',
      context: '',
      files: '**/*.scss',
      syntax: 'scss',
      failOnError: false,
      quiet: false
    }),

    new HtmlWebpackPlugin({
      template : __dirname + '/index.html',
      filename : 'index.html',
      inject : 'head'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['eslint-loader']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!postcss!sass-loader?outputStyle=expanded'
        )
      }
    ]
  },

  eslint: {
    failOnWarning: false,
    failOnError: true
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],

  stats: {
    // Colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
