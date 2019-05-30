# 开发环境

项目开发过程中一般需要经历三个环境：开发环境、测试环境和生产环境。

1. 开发环境是指程序员在开发软件功能、编写代码时的程序运行环境；
2. 测试环境是开发环境到生产环境的过渡，是软件功能开发完成，在将代码正式发布到线上时进行进一步测试的环境；
3. 生产环境是将代码打包发布到正式线上所运行的环境；

  不同环境的使用场景不同，对我们的 webpack 配置要求也会不一样。

1. 在开发环境需要的是提高开发效率，所以会需要错误跟踪调试、自动编译、热替换（HMR）、代理（proxy）和本地数据 Mock 等等；
2. 测试环境需要的是模拟线上环境，所以一般是克隆一份生产环境的配置，并利用一些测试工具运行测试用例；
3. 生产环境需要将代码提交到线上，是直接面向用户的，这就要求我们打包的代码有更小的体积、更快的加载速度，所以打包的重点是代码压缩、拆分、合并等优化操作。

# mode

提供 `mode` 配置选项，告知 webpack 使用相应模式的内置优化。

值：

- development 开发模式  侧重于功能调试和优化开发体验

- production 生产模式    侧重于模块体积优化和线上部署

```javascript
module.exports = {
  mode: 'development'
};
```

webpack4不配置mode，命令行有黄色警告信息；



## 使用 source map

当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。

例如，如果将三个源文件（`a.js`, `b.js` 和 `c.js`）打包到一个 bundle（`bundle.js`）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 `bundle.js`。

这并通常没有太多帮助，因为我们开发者需要准确地知道错误来自于哪个源文件。

在`webpack`的配置文件中配置`source maps`，需要配置[devtool](https://www.webpackjs.com/configuration/devtool/)

查看文档后，对小到中型的项目中，`eval-source-map`是一个很好的选项。

```
//webpack.config.js
module.exports = {
  	...
    devtool: 'eval-source-map'
    ...
｝
```



## 使用观察模式

每次要编译代码时，手动运行 `npm start` 就会变得很麻烦。

你可以指示 webpack "watch" 依赖图中的所有文件以进行更改。如果其中一个文件被更新，代码将被重新编译，所以你不必手动运行整个构建。

```
//package.json
...
"scripts": {
    "start": "webpack",
    "watch": "webpack --watch"
}
...
```

现在，你可以在命令行中运行 `npm run watch`，就会看到 webpack 编译代码，然而却不会退出命令行。

这是因为 script 脚本还在观察文件。

我这里使用的vscode开发工具，使用live-server打开，修改代码的时候，live-server自动帮助刷新浏览器。

但是webpack也为我们提供了类似的功能，[webpack-dev-server](https://www.webpackjs.com/configuration/dev-server/) 



## webpack-dev-server

`webpack-dev-server` 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

```
npm install --save-dev webpack-dev-server
```

**修改脚本命令**

- watch — 观察者模式

- start —开启web服务器

- build — 打包

  这样的命令更加的语义化，或者也可以自定义命令。

[Script使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

```
//package.json
"scripts": {
    "watch": "webpack --watch",
    "start": "webpack-dev-server",
    "build": "webpack"
},
```



**相关配置**

```
//webpack.config.js
devServer: {
   	contentBase: path.join(__dirname,"/dist"),  //路径
    historyApiFallback: true	,//不跳转
    hot:true,	//热模块加载
    hotOnly:true,	没有页面刷新的情况下启用热模块替换
    open:true,	//打开默认浏览器
    index: 'index.html', //索引文件
    inline: true,//实时刷新
    publicPath："",//公共路径
    port: 9000	//指定端口
},
```

[查看更多配置](https://webpack.js.org/configuration/dev-server/#devservercontentbase)

运行 `npm run start`,浏览器自动打开`http://localhost:9000/









