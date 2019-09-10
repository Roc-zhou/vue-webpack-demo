const path = require('path')

const devObj = {
  port: 8087,
  sourceMap: true,
  host: '0.0.0.0',
  assetsRoot: path.resolve(__dirname, '/dist'),
  assetsSubDirectory: 'public',
  assetsPublicPath: '/', // 图片相对路径
}


module.exports = devObj