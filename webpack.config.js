const path = require('path');

module.exports = {
  entry: './client/Index.jsx',
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'client/styles')
        ],
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}