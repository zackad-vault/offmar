const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Metadata = require('./src/utils/metadata')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.BannerPlugin({
      banner: Metadata.generate(),
      raw: true,
      entryOnly: true
    })
  ]
}
