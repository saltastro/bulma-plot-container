const merge = require('webpack-merge')
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')
const {
  generateCSSReferences,
  generateJSReferences
} = MiniHtmlWebpackPlugin

const html = ({ css, js, publicPath }) => `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
${generateCSSReferences(css, publicPath)}
${generateJSReferences(js, publicPath)}
</head>
<body>
<plot-info>
<p>Hello</p>
<p>World!</p>
</plot-info>
</body>
</html>`

const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'cheap-module-source-map',

  devServer: {
    port: 8000
  },

  plugins: [
    new MiniHtmlWebpackPlugin({
      template: html
    })
  ]
})
