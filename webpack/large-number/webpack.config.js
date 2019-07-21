const path = require('path')
const Terserplugin = require('terser-webpack-plugin')

const config = {
  mode: 'none',
  entry: {
    'large-number': './src/large-number.js',
    'large-number.min': './src/large-number.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    library: 'LargeNumber',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new Terserplugin({
        include: /\.min\.js$/
      })
    ]
  }
}

module.exports = config
