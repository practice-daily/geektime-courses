const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const { CheckerPlugin } = require('awesome-typescript-loader')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              /**
               * ts-loader 内部会使用 tsc
               * transpileOnly(默认为false)设置为true时，ts编译器只做语言转换不做类型检查
               * 为了加快编译速度，将transpileOnly设置为true关闭类型检查；借助fork-ts-checker-webpack-plugin在一个独立的进程中进行类型检查
               */
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ],
        // use: [
        //   {
        //     /**
        //      * awesome-typescript-loader 与 ts-loader 的区别
        //      * 1. 更适合与 Babel 集成，使用 Babel 的转义与缓存
        //      * 2. 不需要安装额外的插件就可以把类型检查放在独立进程中进行
        //      * 3. 不过实际是有类型检查遗漏的，建议还是使用 ts-loader
        //      */
        //     loader: 'awesome-typescript-loader',
        //     options: {
        //       transpileOnly: true
        //     }
        //   }
        // ],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html'
    }),
    new ForkTsCheckerWebpackPlugin(),
    // new CheckerPlugin(),
    new VueLoaderPlugin(),
  ]
}
