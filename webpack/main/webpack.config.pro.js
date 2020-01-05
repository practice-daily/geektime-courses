const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// 速度分析
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
// 体积分析
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')
const os = require('os')

const smp = new SpeedMeasureWebpackPlugin()

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
        chunks: ['vendors', 'commons', entryName],
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

const config = {
  // mode: 'none',
  mode: 'production',
  entry,
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  // externals: [ 'react', 'react-dom' ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  // externals: Object.keys(require('./package.json').dependencies) || [],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            // 多进程多实例打包
            loader: 'thread-loader',
            options: {
              workers: 3
            }
          },
          'babel-loader',
          // 'eslint-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
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
        test: /\.(woff|woff2|eot|ttf|otf)$/,
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
    // 避免构建前每次都要手动删除dist，使用clean-webpack-plugin默认会删除output指定的输出目录
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano
    }),

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
    // new webpack.optimize.ModuleConcatenationPlugin(),

    // new FriendlyErrorsWebpackPlugin(),
    function () {
      // compiler 在每次构建结束后会触发 done 这 个 hook
      this.hooks.done.tap('done', (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('--watch') === -1) {
          console.log('build error*********')
          process.exit(1)
        }
      })
    },

    // DllPlugin 结合 DllReferencePlugin 用于基础包(框架包或业务包)分包
    new webpack.DllReferencePlugin({
      // context: path.join(__dirname, './dll/library'),
      context: __dirname,
      manifest: require('./dll/library/library-manifest.json')
    }),

    // new BundleAnalyzerPlugin(),
  ].concat(htmlWebpackPlugins),
  // devtool: 'source-map',
  /**
   * 构建时显示日志统计信息，配合插件 friendly-errors-webpack-plugin
   * stats: errors-only | minimal | none | normal | verbose
   * 注：webpack构建分析时注释掉 插件 friendly-errors-webpack-plugin 和 stats, 可以看到更全的信息
   */
  // stats: 'errors-only',
  optimization: {
    /**
     * 1. 基础库分离: 使用 html-webpack- externals-plugin, 将 react、react-dom 基础包通过 cdn 引入，不打入 bundle 中
     * 2. 公共脚本分离: 使用 Webpack4 内置的 SplitChunksPlugin (替代 CommonsChunkPlugin 插件)
     */
    // splitChunks: {
    //   minSize: 0,
    //   cacheGroups: {
    //     /**
    //      * DllPlugin 通常用于基础包（框架包、业务包）的分离。
    //      * SplitChunks 虽然也可以做 DllPlugin 的事情，但是更加推荐使用 SplitChunks 去提取页面间的公共 js 文件。
    //      * 因为使用 SplitChunks 每次去提取基础包还是需要耗费构建时间的，如果是 DllPlugin 只需要预编译一次，后面的基础包时间都可以省略掉。
    //      */
    //     // vendors: {
    //     //   test: /(react|react-dom)/,
    //     //   // 注意：name 指定的值需在 html-webpack-plugin 参数 chunks 中引入后才能在页面中生效
    //     //   name: 'vendors',
    //     //   /**
    //     //    * chunks 参数说明:
    //     //    * async 异步引⼊的库进⾏分离(默认)
    //     //    * initial 同步引⼊的库进行分离
    //     //    * all 所有引⼊的库进⾏分离(推荐)
    //     //    */
    //     //   chunks: 'all'
    //     // },
    //     commons: {
    //       name: 'commons',
    //       minChunks: 2,
    //       chunks: 'all'
    //     }
    //   }
    // },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 并行压缩
        // Enable/disable multi-process parallel running.
        // Use multi-process parallel running to improve the build speed. Default number of concurrent runs: os.cpus().length - 1.
        // parallel: true
        parallel: 4
      })
    ]
  }
}
console.log('os.cpus-------', os.cpus().length, os.cpus())
module.exports = smp.wrap(config)
