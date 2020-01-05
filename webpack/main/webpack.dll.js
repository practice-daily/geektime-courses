const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    library: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name]_[chunkhash].dll.js',
    path: path.join(__dirname, './dll/library'),
    library: '[name]' // 与 DllPlugin 的 name 保持一致
  },
  plugins: [
    new webpack.DllPlugin({
      context: path.join(__dirname, './dll/library'),
      name: '[name]', // 这里的命名要遵循变量命名规范，它是最终的包变量名
      path: path.join(__dirname, './dll/library/[name]-manifest.json')
    }),
    // 把带hash的dll插入到html中
    new AssetsPlugin({
      filename: '[name]-manifest.json',
      path: './'
    })
  ]
}
