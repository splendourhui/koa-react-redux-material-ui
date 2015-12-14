var path = require('path');
var webpack = require('webpack');
var merge = require('lodash/object/merge');

var commonConfig = {
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    alias: {
      'react-dom': 'react-dom/dist/react-dom.min.js',
      'history': 'react-router/node_modules/history',
      'lodash': 'lodash',
      'moment': 'moment/min/moment.min.js'
    },
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      }, {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      }, {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      }, {
        test: /[\.jsx|\.js ]$/,
        exclude: /node_modules/,
        loader: "babel-loader?stage=0&optional[]=runtime"
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  }
};

var clientConfig = merge({}, commonConfig, {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].bundle.js'
  },
  plugins: [
    ...commonConfig.plugins
  ],
  externals: {
    'jquery': 'window.$'
  },
  module: {
    loaders: [...commonConfig.module.loaders]
  }
});

module.exports = clientConfig;
