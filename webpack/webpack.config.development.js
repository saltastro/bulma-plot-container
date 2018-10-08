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
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">
${generateCSSReferences(css, publicPath)}
${generateJSReferences(js, publicPath)}
</head>
<body>
<plot-modal>
<div>
<p>Hello</p>
<p>World!</p>
</div>
</plot-modal>
<button class="f">Show!</button>
<script>
document.querySelector('.f').addEventListener('click', () => document.querySelector('plot-modal').show())
</script>
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
