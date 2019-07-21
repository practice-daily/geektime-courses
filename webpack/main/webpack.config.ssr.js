const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

// 多页应用设置
const setMPA = () => {
  let entry = {}
  let htmlWebpackPlugins = []

  // entryPaths: [ '/Users/squirrel/practice/webpack/src/index/index.js', '/Users/squirrel/practice/webpack/src/search/index.js' ]
  const entryPaths = glob.sync(path.join(__dirname, './src/*/index-server.js'))

  Object.keys(entryPaths).map(index => {
    const entryPath = entryPaths[index]
    const match = entryPath.match(/src\/(.*)\/index-server\.js/)
    const entryName = match && match[1]

    if (!entryName) return

    entry[entryName] = entryPath
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `./src/${entryName}/index.html`),
        filename: `${entryName}.html`, // default index.html
        chunks: ['vendors', 'commons', entryName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: false,
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
  mode: 'none',
  // mode: 'production',
  entry,
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name]-server.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader',
          // 'eslint-loader'
        ]
      },
      {
        test: /.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  /**
                   * Replace Autoprefixer browsers option to Browserslist config.
                   * Use browserslist key in package.json or .browserslistrc file.
                   * 
                   * Using browsers option cause some error. Browserslist config 
                   * can be used for Babel, Autoprefixer, postcss-normalize and other tools.
                   * 
                   * If you really need to use option, rename it to overrideBrowserslist.
                   * 
                   * Learn more at:
                   * https://github.com/browserslist/browserslist#readme
                   * https://twitter.com/browserslist
                   */
                  // browsers: ['last 2 version', '>1%', 'ios 7'],
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          // {
          //   loader: 'url-loader',
          //   options: {
          //     limit: 10240
          //   }
          // }
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        // use: 'file-loader'
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: cssnano
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, './src/index/index.html'),
    //   filename: 'index.html', // default index.html
    //   chunks: ['index'],
    //   inject: true,
    //   minify: {
    //     html5: true,
    //     collapseWhitespace: true,
    //     preserveLineBreaks: false,
    //     minifyCSS: true,
    //     minifyJS: true,
    //     removeComments: false
    //   }
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, './src/search/index.html'),
    //   filename: 'search.html',
    //   chunks: ['search'],
    //   inject: true,
    //   title: 'search',
    //   // minify: {
    //   //   html5: true,
    //   //   collapseWhitespace: true,
    //   //   removeComments: true
    //   // }
    // }),
    // 避免构建前每次都要手动删除dist，使用clean-webpack-plugin默认会删除output指定的输出目录
    new CleanWebpackPlugin(),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React'
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM'
    //     }
    //   ]
    // }),
    // scope hoisting, webpack3需手动引入，webpack4在mode为production时默认开启
    new webpack.optimize.ModuleConcatenationPlugin()
  ].concat(htmlWebpackPlugins),
  // devtool: 'source-map',
  // optimization: {
  //   /**
  //    * 1. 基础库分离: 使用 html-webpack- externals-plugin, 将 react、react-dom 基础包通过 cdn 引入，不打入 bundle 中
  //    * 2. 公共脚本分离: 使用 Webpack4 内置的 SplitChunksPlugin (替代 CommonsChunkPlugin 插件)
  //    */
  //   splitChunks: {
  //     minSize: 0,
  //     cacheGroups: {
  //       vendors: {
  //         test: /(react|react-dom)/,
  //         // 注意：name 指定的值需在 html-webpack-plugin 参数 chunks 中引入后才能在页面中生效
  //         name: 'vendors',
  //         /**
  //          * chunks 参数说明:
  //          * async 异步引⼊的库进⾏分离(默认)
  //          * initial 同步引⼊的库进行分离
  //          * all 所有引⼊的库进⾏分离(推荐)
  //          */
  //         chunks: 'all'
  //       },
  //       commons: {
  //         name: 'commons',
  //         minChunks: 2,
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // }
}