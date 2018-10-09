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
<style>
    .plots {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 50px;
    }
    
    plot-container {
    width: 300px;
    }
    
    plot-info div {
    padding: 5px;
    border: 1px solid lightgray;
    background-color: white;
    }
    
    plot-modal div{
    background-color: white;
    }
</style>
${generateCSSReferences(css, publicPath)}
${generateJSReferences(js, publicPath)}
</head>
<body>
<div class="plots">
<plot-container>
<div>Hello World 1</div>
<plot-modal>
  <div>Large Hello World 1</div>
</plot-modal>
<plot-info>
  <div>
  <p>Hello</p>
  <p>World</p>
  <p>Info 1</p>
</div>
</plot-info>
</plot-container>
<plot-container>
<div>Hello World 2</div>
<plot-modal>
  <div>Large Hello World 2</div>
</plot-modal>
<plot-info>
  <div>
  <p>Hello</p>
  <p>World</p>
  <p>Info 2</p>
</div>
</plot-info>
</plot-container>
<plot-container>
<div>Hello World 3</div>
<plot-modal>
  <div>Large Hello World 3</div>
</plot-modal>
<plot-info>
  <div>
  <p>Hello</p>
  <p>World</p>
  <p>Info 3</p>
</div>
</plot-info>
</plot-container>
<plot-container>
<div>Hello World 4</div>
<plot-modal>
  <div>Large Hello World 4</div>
</plot-modal>
<plot-info>
  <div>
  <p>Hello</p>
  <p>World</p>
  <p>Info 4</p>
</div>
</plot-info>
</plot-container>
</div>
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
