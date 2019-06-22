const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Metadata = require('./src/utils/metadata')
const package = require('./package.json')

module.exports = {
  output: {
    filename: `${package.longName.replace(/\s+/g, '_')}.user.js`
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader', 'postcss-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            beautify: false,
            preamble: Metadata.generate()
          }
        }
      })
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
