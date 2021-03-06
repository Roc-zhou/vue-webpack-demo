const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const devObj = require('./build')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const NODE_ENV = process.env.NODE_ENV

const assetsPath = function (_path) {
  const assetsSubDirectory = devObj.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

const config = {
  mode: NODE_ENV,  // production Or development 环境
  entry: "./src/main.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "docs"), // 必须是绝对路径
    filename: "js/[name].[hash].js", // 「入口分块(entry chunk)」的文件名模板（出口分块？）
  },
  devServer: {
    disableHostCheck: false,
    contentBase: path.join(__dirname, "dist"),
    publicPath: devObj.assetsPublicPath,
    compress: true, // 压缩
    port: devObj.port,
    hot: true, // 热加载
    open: false, //自定打开默认浏览器
    host: devObj.host,
    quiet: true,
    overlay: { warnings: false, errors: true },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(devObj.assetsPublicPath, 'index.html') },
      ],
    },
  },
  plugins: [ // 插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      minify: true, //压缩
      hash: true, //添加hash清除缓存
      inject: true
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 自动添加文件后缀
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '/src/components'), // 解析  src/components  => @
    }
  },
  module: {
    rules: [
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: path.resolve(__dirname, 'node_modules'), // 排除文件
        options: {
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  devtool: NODE_ENV === 'production' ? devObj.sourceMap ? '#source-map' : '' : '#eval-source-map', // 线上环境可以选择不生成map 文件
}
if (NODE_ENV === 'development') {
  config.devServer.proxy = { // proxy URLs to backend development server
    "/api": "http://localhost:3000"
  }
}

module.exports = new Promise((resolve, reject) => {
  // 配置可用端口
  portfinder.basePort = devObj.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      config.devServer.port = port
      config.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`项目运行在: http://${config.devServer.host}:${port}`],
        }
      }))
      resolve(config)
    }
  })
})
