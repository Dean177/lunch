var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index'
  ],
  output: {
    path: path.join(__dirname, 'out/client'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ __DEVELOPMENT__: false }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?stage=0'],
        include: [
          path.join(__dirname, 'src', 'client'),
          path.join(__dirname, 'src', 'shared')
        ]
      },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.(png|gif|jpg)$/, loader: "file-loader" }
    ]
  }
};