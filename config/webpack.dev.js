var webpack = require('webpack');
var path = require('path');
var AppDir = path.join(__dirname, '..', 'app');

module.exports = {
  devtool: '#eval-source-map',
  entry: ['webpack-hot-middleware/client', path.join(AppDir, 'client', 'index.ts')],
  module: {
    //preLoaders: [{
    //  test: /\.tsx?$/,
    //  loader: 'tslint',
    //  include: APP_DIR,
    //  exclude: [/node_modules/]
    //}],
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['babel', 'ts'],
        include: AppDir,
        exclude: [/node_modules/],
      },
      {
        test: /\.(css)(\?.+)$/,
        loaders: ['style-loader', 'css-loader'],
      },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|gif|jpg)$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    ]
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.DefinePlugin({ __DEVELOPMENT__: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    root: [path.resolve('../app')],
    extensions: ['', '.jsx', '.js', '.tsx', '.ts', '.scss'],
  }
};
