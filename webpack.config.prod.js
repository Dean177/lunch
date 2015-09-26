import path from 'path';
import webpack, { optimize, DefinePlugin} from 'webpack';

const config  = {
  devtool: 'source-map',
  entry: [
    './src/client/index'
  ],
  output: {
    path: path.join(__dirname, 'out/client'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new optimize.OccurenceOrderPlugin(),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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

export default config;