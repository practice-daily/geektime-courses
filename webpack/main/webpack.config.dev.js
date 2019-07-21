const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// 多页应用设置
const setMPA = () => {
  let entry = {}
  let htmlWebpackPlugins = []

  // entryPaths: [ '/Users/squirrel/practice/webpack/src/index/index.js', '/Users/squirrel/practice/webpack/src/search/index.js' ]
  const entryPaths = glob.sync(path.join(__dirname, './src/*/index.js'))

  Object.keys(entryPaths).map(index => {
    const entryPath = entryPaths[index]
    const match = entryPath.match(/src\/(.*)\/index\.js/)
    const entryName = match && match[1]
    if (!entryName) return

    entry[entryName] = entryPath
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `./src/${entryName}/index.html`),
        filename: `${entryName}.html`, // default index.html
        chunks: [entryName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  mode: 'development',
  // entry: {
  //   index: path.resolve(__dirname, './src/index.js'),
  //   search: path.resolve(__dirname, './src/search.js')
  // },
  entry,
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader'
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  devServer: {
    // contentBase: './dist',
    contentBase: path.join(__dirname, 'dist'),
    /**
     * Note that webpack.HotModuleReplacementPlugin is required to fully enable HMR.
     * If webpack or webpack-dev-server are launched with the --hot option,
     * this plugin will be added automatically,
     * so you may not need to add this to your webpack.config.js.
     */
    hot: true,
    stats: 'errors-only'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ].concat(htmlWebpackPlugins),
  devtool: 'source-map'
}
