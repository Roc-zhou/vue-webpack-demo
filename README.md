# 使用webpack4手动撸一个vue工程，不使用vue-cli
> 项目地址：https://github.com/Roc-zhou/vue-webpack-demo.git

### 初始化项目
```sh
npm init -y
```
### 安装webpack webpack-cli
[webpack](https://www.webpackjs.com/guides/) 官方安装文档
```sh
npm install --save-dev webpack webpack-cli  // 使用的是webpack4.x
```
### 新建 webpack.config.js webpack配制文件
```sh
touch webpack.config.js
```
### 在根目录新建 index.html 文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>使用webpack4手动撸一个vue工程，不使用vue-cli</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```
### 搭建项目框架 创建目录 主入口文件等
```
src 目录下

|-- App.vue
|-- assets
|   `-- public
|       |-- Script
|       |-- css
|       `-- images
|-- components
|   `-- HelloWorld.vue
|-- main.js
`-- router
    `-- index.js
```
### App.vue 文件内容 
```
<template>
<div id="app">
    <router-view/>
</div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
</style>

```
### main.js 文件
```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
```
### HelloWorld.js 文件
```
<template>
  <div class='helloworld'>
    你好 VUE
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    return next(vm => {});
  },
  name: 'helloworld',
  data() {
    return {};
  },
}
</script>
<style scoped>

</style>
```
### ./router/index.js 文件
```
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('../components/HelloWorld.vue'),
    }
  ],
})

export default router
```
### 安装 vue vue-router
```
npm install --save vue vue-router
```
到这我们就把项目的框架搭建完毕，接下来我们配制开发环境，使我们搭建的项目可以在浏览器端像vue-cli一样 执行 npm run dev 命令跑起来！！
### 安装几个webpack 必须插件
```sh
// 安装本地服务器插件
npm install -D webpack-dev-server
// html插件自动添加js文件
npm install -D html-webpack-plugin
// vue 单文件组件
npm i vue-loader vue-template-compiler -D
// 安装css
npm i css-loader style-loader -D
```
### 修改 webpack.config.js 文件
```
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
  mode: 'development',  // production Or development 环境
  entry: "./src/main.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 必须是绝对路径
    filename: "js/[name].[hash].js", // 「入口分块(entry chunk)」的文件名模板（出口分块？）
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true, // 压缩
    port: 8080,
    hot: true, // 热加载
    open: false, //自定打开默认浏览器
  },
  plugins: [ // 插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      minify: true, //压缩
      hash: false, //添加hash清除缓存
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: path.resolve(__dirname, 'node_modules') // 排除文件
      }
    ]
  },
}
```
执行 `npm run dev` 启动后 浏览器地址栏输入 localhost:8080 就会看到 你好 VUE！！

到这我们使用webpack4 简单配制 vue项目算是初步完成！
接下来我们在 进行更优化的配制...