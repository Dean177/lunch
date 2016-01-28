const path = require('path');
const webpack = require('webpack');
const { serverPort } = require('./src/shared/constants/config');
const DefinePlugin = webpack.DefinePlugin;
const NoErrorsPlugin = webpack.NoErrorsPlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;

module.exports = {
  devtool: '#eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index',
  ],
  output: {
    path: path.join(__dirname, 'out/client'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  noInfo: true,
  plugins: [
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
    new DefinePlugin({
      __DEVELOPMENT__: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'PORT': process.env.PORT || serverPort
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: [
          path.join(__dirname, 'src', 'client'),
          path.join(__dirname, 'src', 'shared'),
        ],
        query: {
          plugins: [
            [
              'react-transform', {
                transforms: [
                  { transform: 'react-transform-hmr', imports: ['react'], locals: ['module'] },
                  { transform: 'react-transform-catch-errors', imports: ['react', 'redbox-react'] },
                ],
              },
            ],
          ],
        },
      },
      { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ },
      { test: /\.(css)(\?.+)$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|gif|jpg)$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    ],
  },
};
