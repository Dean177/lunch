var path = require('path');
var webpack = require('webpack');
var AppDir = path.join(__dirname, '..', 'app');

module.exports = {
  devtool: 'source-map',
  entry: './app/index.ts',
  module: {
    preLoaders: [{
      test: /\.tsx?$/,
      loader: 'tslint',
      include: AppDir,
    }],
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['babel', 'awesome-typescript-loader'],
      include: AppDir,
    }]
  },
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'app.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
    }),
  ],
  resolve: {
    root: [path.resolve('../app')],
    extensions: ['', '.jsx', '.js', '.tsx', '.ts']
  },
  tslint: {
    emitErrors: true,
    failOnHint: true,
  }
};
