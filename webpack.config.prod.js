const path = require('path');
const webpack = require('webpack');
const DefinePlugin = webpack.DefinePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;

module.exports = {
  entry: ['./src/client/index'],
  output: {
    path: path.join(__dirname, 'out/client'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  plugins: [
    new DefinePlugin({
      __DEVELOPMENT__: false,
      __PORT__: process.env.PORT,
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'PORT': process.env.PORT,
      },
    }),
    new UglifyJsPlugin(),
    new OccurenceOrderPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [path.join(__dirname, 'src', 'client'), path.join(__dirname, 'src', 'shared')],
        query: {
          plugins: [
            'babel-plugin-transform-react-constant-elements',
            'babel-plugin-transform-react-inline-elements',
            'babel-plugin-transform-react-remove-prop-types',
            'transform-decorators-legacy'
          ]
        },
      },
      { test: /\.(css)(\?.+)$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|gif|jpg)$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    ],
  },
};
