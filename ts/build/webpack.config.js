const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
let config = process.env.NODE_ENV === 'development' ? devConfig : proConfig

module.exports = merge(baseConfig, config)
