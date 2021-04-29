const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const cesiumSource = 'node_modules/cesium/Build/Cesium'
module.exports = {
  assetsDir: './static',
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: false, // 是否开启eslint
  configureWebpack: config => {
    let plugins = []
    if (process.env.NODE_ENV === 'production') {
      plugins = [
        new webpack.DefinePlugin({
          // Cesium载入静态的资源的相对路径
          CESIUM_BASE_URL: JSON.stringify('static')
        }),
        // 拷贝Cesium 资源、控价、web worker到静态目录
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: 'static/Workers' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'static/Assets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: 'static/ThirdParty' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'static/Widgets' }])
      ]
    } else {
      plugins = [
        new webpack.DefinePlugin({
          // Cesium载入静态的资源的相对路径
          CESIUM_BASE_URL: JSON.stringify('')
        }),
        // 拷贝Cesium 资源、控价、web worker到静态目录
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: 'Workers' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }])
      ]
    }
    return {
      module: {
        unknownContextCritical: false,
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            include: path.resolve(__dirname, 'node_modules/cesium/Source'),
            sideEffects: false,
            use: [
              {
                // Cesium源码里包含了一些开发错误和警告信息，但是产品中是不需要的。
                // 因为没有webpack内置的方式去删除这些警告，我们将使用 strip-pragma-loader。
                loader: 'strip-pragma-loader',
                options: {
                  pragmas: {
                    debug: false
                  }
                }
              }
            ]
          }
          // {
          //   test: /\.css$/,
          //   use: ['style-loader', { loader: 'css-loader' }],
          //   sideEffects: true
          // },
          // { // 为了压缩css代码，在css-loader中使用minimize选项。malin
          //   test: /\.css$/,
          //   use: [
          //     'style-loader',
          //     {
          //       loader: 'css-loader',
          //       options: {
          //         // minify loaded css
          //         minimize: true
          //       }
          //     }
          //   ]
          // },
          // { // 增加对图片json等的支持。 malin
          //   test: /\.(bmp|png|gif|jpg|jpeg|svg|xml|json)$/,
          //   use: ['url-loader']
          // }
        ]
      },
      optimization: {
        // 我们去查看哪些导出的模块被使用，然后再进行打包
        usedExports: true,
        // webpack默认会把Cesium和整个程序代码打进一个 chunk中，最终这个库非常庞大。
        // 我们也可以用CommonChunksPlugin把Cesium打到它自己的包，提升程序的性能。
        // 如果最终你的程序创建了多个chunks，他们可以引用一个通用的cesiumchunk。
        // 最新版webpack使用config.optimization.splitChunks去设置
        splitChunks: {
          maxInitialRequests: Infinity,
          minSize: 0,
          maxSize: 250000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'all',
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              }
            },
            commons: {
              name: 'Cesium',
              test: /[\\/]node_modules[\\/]cesium[\\/]/,
              priority: 10,
              chunks: 'all'
            }
          }
        }
      },
      output: {
        // 需要编译Cesium中的多行字符串
        sourcePrefix: ' '
      },
      amd: {
        // 允许Cesium兼容 webpack的require方式
        toUrlUndefined: true
      },
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
          '@': path.resolve('src')
        }
      },
      node: {
        // 解决一些第三方库使用的fs 模块，它一般是用在NodeJS的环境里，而不能在浏览器环境里使用。
        fs: 'empty',
        Buffer: false,
        http: 'empty',
        https: 'empty',
        zlib: 'empty'
      },
      plugins: plugins
    }
  }

  // css: {
  //   loaderOptions: {
  //     // postcss: {
  //     //   plugins: [
  //     //     require('postcss-px2rem')({
  //     //       // 以设计稿750为例， 750 / 10 = 75
  //     //       remUnit: 192
  //     //     })
  //     //   ]
  //     // },

  //     // 给 sass-loader 传递选项
  //     // sass: {
  //     //   // @/ 是 src/ 的别名
  //     //   // 所以这里假设你有 `src/variables.sass` 这个文件
  //     //   // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
  //     //   additionalData: `@import "~@/variables.sass"`
  //     // },
  //     // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
  //     // 因为 `scss` 语法在内部也是由 sass-loader 处理的
  //     // 但是在配置 `prependData` 选项的时候
  //     // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
  //     // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
  //     scss: {
  //       prependData: `@import "~@/style/common/variables.scss";`
  //     }
  //     // 给 less-loader 传递 Less.js 相关选项
  //     // less: {
  //     //   // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
  //     //   // `primary` is global variables fields name
  //     //   globalVars: {
  //     //     primary: '#fff'
  //     //   }
  //     // }
  //   }
  // }
}
