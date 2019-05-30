# 基本架构

## 安装

### 前提

安装 [Node.js](<http://nodejs.cn/>) 的最新版本。

**检测安装是否成功**

使用查看版本号命令

```bash
npm -v
node -v
```



### 全局安装

```bash
npm install -g webpack
```

<u>*不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。*</u>



### 本地安装

```bash
npm install --save-dev webpack
```

使用`webpack -v`命令时，会提示需要安装webpack-cli。

原来webpack4+已经将功能迁移到webpack-cli上了。

```bash
npm install --save-dev webpack-cli
```

****

**查看版本**

*这里使用下面对应版本*

```bash
$ webpack -v
4.32.0
```



## 项目搭建

### **目录结构**

**第一种：一个页面一个文件夹，内部包含所有依赖**

```
webpack-project //项目根目录
    --src //开发目录
        -index //主页的目录
          +index.html
          +images
          +js
          +css
        -about //about页面的目录（内部和上面index一样）
        -works //同上
        -contact //同上
    --dist //发布目录
        -内容就是用html-webpack-plugin生成的和src一样的结构
    --package.json
    --mode_moudule
    ...
```

**第二种：HTML都扔模板目录，js/css/image等资源放另外目录**

```
webpack-project //项目根目录
    --src //开发目录
      -views //HTML模块目录，所有的HTML页面都塞进去
        +index.html
        +about.html
        +contact.html
      -css
      -js
        +index.js
        +about.js
        +contact.js
        +components //其他的js片段
      -images
      
    --dist //发布目录
        --内容就是用html-webpack-plugin生成的和src一样的结构
    --package.json
    --mode_moudule
    ...
```

**第三种：不使用html-webpack-plugin生成html，html直接引用dist里的打包后资源**

```
webpack-project //项目根目录
    --src //开发目录
      -css
      -js
        +index.js
        +about.js
        +contact.js
        +components //其他的js片段
      -images
    --dist //发布目录
      -css
      -js
      -images
    --package.json
    --mode_moudule
    --index.html
    --about.html
    --contact.html
 
```



### 开始搭建

```bash
$ mkdir webpack-dome   //创建项目
$ cd webpack-dome/     //进入项目
$ npm init  //初始化项目
```

输入这个命令后，终端会问你一系列诸如项目名称，项目描述，作者等信息，不过不用担心，如果你准备在npm中发布你的模块，这些问题的答案都不重要，回车即可。

#### **安装webpack**

```bash
npm install --save-dev webpack webpack-cli
```

安装成功:

```bash
...
 							Thanks for using Webpack!
                 Please consider donating to our Open Collective
                        to help us maintain this package.
...
```

```bash
$ dir//查看文件
node_modules  package.json  package-lock.json
```

**package.json**

  管理本地安装的npm包，一个package.json文件可以做下面这些事情：

- 展示项目所依赖的npm包
- 允许你指定一个包的版本【范围】
- 让你建立版本稳定，意味着你可以更好地与其他开发者共享

**package-lock.json**

1. package.json文件下载到的依赖包可能在不同的情况下，各库包的版本语义可能并不相同，有的库包开发者并不严格遵守这一原则：相同大版本号的同一个库包，其接口符合兼容要求。
2. 产生问题：在不同时间或者不同npm下载源之下，下载的各依赖包版本可能有所不同，因此其依赖库包行为特征也不同，有时候甚至完全不兼容。
3. npm5开始提供自动生成package-lock.json文件的功能，为的是让开发者知道只要你保存了源文件，到一个新的机器上、或者新的下载源，只要按照这个package-lock.json文件所标识的具体版本下载依赖库包，就能确保所有库包与上次的安装完全一样； 
4. npm的下载源改为私服地址，这样产生的package-lock.json文件的版本号是这个私服上设置好的版本号。

**两个文件之间的关系**

​	package-lock.json是当 node_modules 或 package.json 发生变化时自动生成的文件。

​	这个文件主要功能是确定当前安装的包的依赖，以便后续重新安装的时候生成相同的依赖，而忽略项目开发过程中有些依赖已经发生的更新。



### 简单配置

新建webpack.config.js

```js
//webpack.config.js
module.exports = {
    entry:  __dirname + "/src/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    }
}
```

*注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。*

#### 测试1

```bash
$ cat index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <script src="dist/bundle.js"></script>
</body>
</html>
```

```bash
$ cat src/main.js
document.write("webpack测试1")
```

```bash
$ webpack src/main.js //开始打包
Hash: 171f8e6b2a74e4e7fa9c
Version: webpack 4.32.0
Time: 86ms
Built at: 2019-05-22 11:43:43
    Asset       Size  Chunks             Chunk Names
bundle.js  958 bytes       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/main.js 58 bytes {0} [built]
```

成功运行；

这里只有打包了一个JS文件，好像没什么用。还不如直接把main.js直接引入html代码中呢；但是webpack的功能怎能仅限于此呢；

增加module.js文件;

```bash
$ cat src/module.js
module.exports.info = [
    {
        name:"沙雕",
        age:18,
        say:function(){
            return this.name + this.age
        }
    }

]
```

修改main.js

```bash
$ cat src/main.js
var {info} = require("./module");
document.write(info[0].say())
```

打包

```bash
$ webpack src/main.js
```

这一次把main.js和module.js两个文件打包在一起。

突然觉得命令好长，在实际开发中不便捷。那么修改一下相关配置即可。

#### 快捷打包

修改`package.json` 文件，以便确保我们安装包是`私有的(private)`，并且移除 `main` 入口。这可以防止意外发布你的代码。

> 如果你想要了解 `package.json` 内在机制的更多信息，我们推荐阅读 [npm 文档](https://docs.npmjs.com/files/package.json)。

```json
{
  "name": "webpack-dome",  //包名
  "version": "1.0.0",	//包的版本号
+ "private": true,
- "main": "./src/main.js", //程序的主入口文件,默认值是模块根目录下面的 index.js
  "scripts": {	//脚本
+   "start": "webpack"    
  },
  "author": "bigbrid", //作者
  "license": "ISC",
  "devDependencies": {  //生产/开发环境依赖包列表
    "webpack": "^4.32.0",
    "webpack-cli": "^3.3.2"
  },
  "dependencies": {}, 
  "description": ""	//包的描述
}

```

`package.json`中的`script`会安装一定顺序寻找命令对应位置，本地的`node_modules/.bin`路径就在这个寻找清单中，所以无论是全局还是局部安装的webpack，你都不需要写前面那指明详细的路径了。

后面我们就可以有`npm start `来快捷打包啦



## Loaders

**鼎鼎大名的Loaders登场了！**

`Loaders`是`webpack`提供的最激动人心的功能之一了。通过使用不同的`loader`，`webpack`有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。

**loader的配置**

1. `test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. `use` 属性，表示进行转换时，应该使用哪个 loader。

### css

webpack提供两个工具处理样式表，`css-loader` 和 `style-loader`。

二者处理的任务不同，

`css-loader`使你能够使用类似`@import` 和 `url(...)`的方法实现 `require()`的功能,

`style-loader`将所有的计算后的样式加入页面中

二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

```bash
npm install --save-dev style-loader css-loader
```

**增加配置**

```js
//webpack.config.js >module>rules
{
    test: /\.css$/,
    use: [
        {
        	loader: "style-loader"
        }, {
        	loader: "css-loader"
        }
    ]
}
```

**新增样式文件**

```bash
$ cat src/style.css
*{margin: 0;padding: 0}
body{background-color: #000;color: #fff;}
```

**新增代码**

```bash
$ cat src/main.js
import './style.css';
```

打包后，将style.css以标签的形式，插入html的head中

### less

了解更多less，请看[less官网](http://lesscss.cn/)或[个人less学习文档](md/less.md)。

```bash
npm install --save-dev less-loader less
```

**配置**

```js
//webpack.config.js >module>rules
{
test: /\.less$/,
    use: [
        {
            loader: "style-loader" 
        }, 
        {
            loader: "css-loader" 
        },
        {
            loader: "less-loader"
        }
    ]
}
```

### postcss

[postcss](https://www.webpackjs.com/loaders/postcss-loader/)可以自动增加样式的不同浏览器前缀。

需要配合[autoprefixer](https://github.com/postcss/autoprefixer)使用。

```
npm install --save-dev  postcss-loader autoprefixer postcss
```

**配置css**

```js
 //webpack.config.js >module>rules
 {
     test:/\.css$/,
     use: [
        { loader: 'style-loader'},
        { loader: 'css-loader'},
        { loader: 'postcss-loader',
             options:{
                plugins: [
                    require("autoprefixer") 
                 ]
             }
         }
     ]
 }
```

**配置less**

```js
 //webpack.config.js >module>rules 
 {
	test:/\.less$/,
	use: [
        {
        	loader: 'style-loader'
        },
        {
        	loader: 'css-loader'
        },
        {
        loader:'postcss-loader',
            options:{
                plugins: [
                	require("autoprefixer") 
                ]
            }
        },
        {
        	loader: 'less-loader'
        }
    ]
 }
```

可以看出只是多了less的加载器。当然也可以把less和css的配置合并成一个；

```
test:/\.less|\.css$/
```



**问题**

在css中使用背景图片时，使用上述方法，直接报错；

那么该如何处理呢？



### 加载图片

使用 [file-loader](https://www.webpackjs.com/loaders/file-loader)，我们可以轻松地将这些内容混合到 CSS 中：

```bash
npm install --save-dev file-loader
```

接上案例：由于增加了图片，需要整理src文件夹，要不然看起来很是凌乱；

```bash
Administrator@CHINA-20190307T MINGW64 /f/webpack-dome/src (master)
$ tree.com
文件夹 PATH 列表
F:.
├─css
├─img
└─js
```

**增加配置**

```js
$ cat webpack.config.js
module.exports = {
    entry:  __dirname + "/src/js/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:  {
                    loader:'file-loader',
                    options:{
                        outputPath:"/images/", //输出路径
                        publicPath:"dist/images/" //引用路径
                    }
                }
            }
        ]
    }
}
```

*合乎逻辑下一步是，压缩和优化你的图像。查看* [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) *和* [url-loader](https://www.webpackjs.com/loaders/url-loader)*，以了解更多关于如果增强加载处理图片功能。

























