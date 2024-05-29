const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  publicPath: '/example',
  assetsDir: './static',
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: false, // 是否开启eslint
  configureWebpack: (config) => {
    const plugins = []
    return {
      module: {
        unknownContextCritical: false,
        rules: []
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
  },
  chainWebpack: (config) => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin)
  }
}
