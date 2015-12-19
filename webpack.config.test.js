const path = require('path');
const webpack = require('webpack');
const RewirePlugin = require('rewire-webpack');
const DefinePlugin = webpack.DefinePlugin;

module.exports = {
  devtool: '#eval-source-map',
  target: 'node',
  entry: ['./src/tests/index'],
  output: {
    path: path.join(__dirname, 'out/tests/client'),
    filename: 'test-bundle.js',
    publicPath: '/assets/',
  },
  noInfo: true,
  plugins: [
    new DefinePlugin({ __DEVELOPMENT__: true }),
    new RewirePlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /sinon\.js$/,
        loader: "imports?define=>false,require=>false",
      },
      { test: /\.(css)(\?.+)$/, loader: 'null-loader' },
      { test: /\.scss$/, loader: 'null-loader' },
      { test: /\.(png|gif|jpg)$/, loader: 'null-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'null-loader' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'null-loader' },
    ],
  },
};
