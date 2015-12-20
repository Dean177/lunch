// noinspection Eslint
"use strict";
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const RewirePlugin = require('rewire-webpack');
const DefinePlugin = webpack.DefinePlugin;
const BannerPlugin = webpack.BannerPlugin;
const IgnorePlugin = webpack.IgnorePlugin;

function walkSync(dir, filesList) {
  let fileList = filesList || [];
  fs.readdirSync(dir).forEach((file) => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      fileList = walkSync(dir + '/' + file, fileList);
    } else {
      fileList.push({ fileName: file, path: dir + '/' + file });
    }
  });
  return fileList;
}

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => { return ['.bin'].indexOf(x) === -1; })
  .forEach((mod) => { nodeModules[mod] = 'commonjs ' + mod; });

const testFiles = {};
walkSync('./test')
  .filter((testFile) => (testFile.fileName.includes('.spec.js')))
  .forEach((spec) => { testFiles[spec.fileName.substr(0, spec.fileName.length - 3)] = spec.path; });

module.exports = {
  devtool: '#eval-source-map',
  target: 'node',
  entry: testFiles,
  output: {
    path: path.join(__dirname, 'out/test'),
    filename: '[name].js',
    publicPath: '/assets/',
  },
  noInfo: true,
  plugins: [
    new DefinePlugin({ __DEVELOPMENT__: true }),
    new BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
    new RewirePlugin(),
    new IgnorePlugin(/jsdom$/),
    new IgnorePlugin(/sinon$/)
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      { test: /sinon.*\js$/, loader: "imports?define=>false,require=>false" },
      { test: /\.(css)(\?.+)$/, loader: 'null-loader' },
      { test: /\.scss$/, loader: 'null-loader' },
      { test: /\.(png|gif|jpg)$/, loader: 'null-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'null-loader' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'null-loader' },
    ],
  },
};
