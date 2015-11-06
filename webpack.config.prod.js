import path from 'path';
import { DefinePlugin} from 'webpack';

const config = {
  entry: ['./src/client/index'],
  output: {
    path: path.join(__dirname, 'out/client'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  plugins: [
    new DefinePlugin({
      __DEVELOPMENT__: false,
      'process.env': { 'NODE_ENV': JSON.stringify('production') },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: { stage: 0 },
        include: [ path.join(__dirname, 'src', 'client'), path.join(__dirname, 'src', 'shared') ],
      },
      {
        test: /\.(css)(\?.+)$/,
        loaders: ['style-loader', 'css-loader'],
      },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|gif|jpg)$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    ],
  },
};

export default config;
