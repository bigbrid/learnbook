# 相关扩展

## Node.js Path 模块

导入node.js的path模块，path模块用于处理文件路径的小工具；

- [文档-中文](http://www.runoob.com/nodejs/nodejs-path-module.html)
- [文档-英文](https://nodejs.org/docs/latest/api/path.html)

```
const path = require('path')
```

## 入口文件

之前的例子是一直是单入口，单出口形式。这种在实际开发中应用的很少。

### 多入口单出口

向 `entry` 属性传入「文件路径(file path)数组」将创建“多个主入口(multi-main entry)”。

然而，使用此语法在扩展配置时有失灵活性。

```js
 entry: [
        path.join(__dirname,"/src/js/index.js"),
        path.join(__dirname,"/src/js/main.js")
    ]
```

### 多入口多出口

对象语法会比较繁琐。然而，这是最可扩展的方式。

```js
//入口
entry: {
     main:path.join(__dirname,"/src/js/main.js"),
     index:path.join(__dirname,"/src/js/index.js")
 }
 
 //出口
 output: {
     path: path.join(__dirname,"/dist"), //打包后的文件存放的地方
     publicPath:"", //引用路径
     filename: "[name].bundle-[hash].js" //打包后输出文件的文件名
 }
 
 //分别引用
 new HtmlWebpackPlugin({
     title:"main",
     filename: "main.html",
     hash: true, 
     chunks:['main'],  
     template: path.join(__dirname,"/src/tmp/index.tmp.html")

}), 
new HtmlWebpackPlugin({
    title:"index",
    filename: "index.html",
    hash: true, 
    chunks:['index'],  
    template: path.join(__dirname,"/src/tmp/index.tmp.html")

}),
```



# 打包第三方类库

虽然目前angular/react/vue这些现代化的框架使前端开发模式发生了极大的变化，但是有些东西还是需要依靠我们的老朋友jquery来实现。

### CDN

如果项目**足够小**得到话，也可以直接在页面引入第三方库；

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
```



### npm下载

安装：这里不要使用-dev，因为要在本地使用。

```bash
npm install --save jquery 
```

#### 手动引入

被打包文件中手动require/import引入

```js
const $ = require("jQuery")
//或者
import $ from  "jQuery"
```

#### 自动引入

使用ProvidePlugin插件自动引入

```js
 const webpack = require("webpack")
 
 //plugins>
 new webpack.ProvidePlugin({
     $: 'jquery'
     jQuery: 'jquery'
 })
```

配置好后，就可以在你的入口文件中使用了，而不用再次引入了。这是一种全局的引入！

**区别**

- import $...，引入之后，无论你在代码中是否使用jquery，打包后，都会打进去，这样其实产生大量的冗余js
- Provideplugin, 只有你在使用到此库，才会打包

### 抽离第三方类库

提取第三方库(或者想单独提出来的)js库。

在webpack3.x版本之前：使用[CommonsChunkPlugin](https://www.webpackjs.com/plugins/commons-chunk-plugin/)现在已经不支持。

从webpack v4开始，使用[SplitChunksPlugin](https://www.webpackjs.com/plugins/split-chunks-plugin/)。

[这个文档说的也比较清楚了](https://imweb.io/topic/5b66dd601402769b60847149)

#### 全局jquery

```js
 //plugins>
 //全局jquery
 new webpack.ProvidePlugin({
     $: 'jquery'
     jQuery: 'jquery'
 })
 
 //module>
 //分离jquery
 optimization: {
     splitChunks: {
         cacheGroups: { //缓存组
             name: 'jquery', 
             test: (module) => { //匹配绝对模块资源路径或块名称
             	return /jquery/.test(module.context);
             },
             chunks: 'initial', //类型
             enforce: true,
             priority: 10 //权重
         }
     }
 }
 
 	//输出两个页面
 	//index的入口文件有使用jquery
 	new HtmlWebpackPlugin({
            title:"index",
            filename: "index.html",
            hash: true, 
            chunks:['index',"jquery"],  
            template: path.join(__dirname,"/src/temp/index.temp.html"),
            files:{
                css:[
                    "//fonts.googleapis.com/css?family=Montserrat+Alternates:700|Volkhov:700|Hammersmith+One|Arbutus+Slab|Poppins:800|Questrial|Bungee+Outline|Josefin+Sans:700|Josefin+Sans:400,700|Josefin+Sans:400,700|Playfair+Display"
                ]

            }
        }),
        //test入口文件没有使用jquery
        new HtmlWebpackPlugin({
            title:"test",
            filename: "test.html",
            hash: true, 
            chunks:['test',"jquery"],  
            template: path.join(__dirname,"/src/temp/index.temp.html"),
            files:{
                css:[
                  
                ]

            }
        })
 
```

打包结果是按照我们设想的一样；

- 入口文件有使用jquey,打包后自动引入打包jquery的文件
- 没有使用则没有引用，按需加载；

**这样的抽离方法可以让我们在使用jquery插件时，避免依赖问题；**

#### 非全局

下面是一个依赖多方库的动画；

安装库或者下载库到本地，这里是安装

```bash
npm i three-js three.js gsap
```

直接导入库？

```js
import "three.js";
import {TweenMax} from "gsap/TweenMax";
import "../assets/plugin/three.canvasbg";
```

这样肯定是会报错的；因为还缺少加载器。

##### expose-loader

[expose-loader](https://www.webpackjs.com/loaders/expose-loader/)将模块添加到全局对象;

虽说是暴露在全局对象下，因为我们使用import手动导入，也可以看作非全局；同时也可以使用其他loader,如[imports-loader](https://www.webpackjs.com/loaders/imports-loader/)等；

```bash
npm i expose-loader --save
```

使用loader导入模块

```js
import "expose-loader?THREE!three.js";
import {TweenMax} from "gsap/TweenMax";
import "../assets/plugin/three.canvasbg";
```

使用SplitChunksPlugin分块打包压缩后发现文件好大，还不如直接CDN引入；

可以在HtmlWebpackPlugin以路径的形式写入本地CDN地址，可以参考HtmlWebpackPlugin，这个时候静态的资源没有被打包进dist目录下，我们可以使用CopyWebpackPlugin来赋值静态文件，一切即便OK；



## externals

`externals` 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。此功能通常对 **library 开发人员**来说是最有用的，然而也会有各种各样的应用程序用到它。

[externals](https://webpack.docschina.org/configuration/externals/#string)

```
externals: {
   jquery: 'jQuery'//不打包jquery
}
```



# 粗暴的搭建环境

如果真要最简单的构建项目，更简单的方法是，直接从别的项目拷贝package.json这个配置文件，然后执行

```bash
npm install
```

附上json及配置：

package.json

```json
{
  "name": "webpack-dome",
  "version": "1.0.0",
  "main": "./src/main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "watch": "webpack --watch",
    "start": "webpack-dev-server",
    "build": "webpack"
  },
  "author": "bigbrid",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer": "^9.5.1",
    "babel-core": "^6.26.3",
    "babel-loader": "^8.0.0-beta.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-stage-0": "^6.24.1",
    "bootstrap": "^4.3.1",
    "clean-webpack-plugin": "^2.0.2",
    "copy-webpack-plugin": "^5.0.3",
    "css-loader": "^2.1.1",
    "expose-loader": "^0.7.5",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "file-loader": "^3.0.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^4.0.0-beta.5",
    "json-loader": "^0.5.7",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "lodash": "^4.17.11",
    "mini-css-extract-plugin": "^0.7.0",
    "postcss": "^7.0.16",
    "postcss-loader": "^3.0.0",
    "style-loader": "^0.23.1",
    "url-loader": "^1.1.2",
    "webpack": "^4.32.2",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.4.1"
  },
  "dependencies": {
    "@babel/core": "^7.4.5",
    "@babel/preset-env": "^7.4.5",
    "exports-loader": "^0.7.0",
    "gsap": "^2.1.3",
    "imports-loader": "^0.8.0",
    "jquery": "^3.4.1",
    "three-js": "^79.0.0",
    "three.js": "^0.77.1"
  },
  "directories": {
    "lib": "lib"
  },
  "description": ""
}

```

webpack.config.js

```js

 const  webpack = require("webpack"),
        path = require('path'),
        CleanWebpackPlugin = require("clean-webpack-plugin"),
        HtmlWebpackPlugin = require("html-webpack-plugin"),
        MiniCssExtractPlugin= require('mini-css-extract-plugin'),
        CopyWebpackPlugin= require("copy-webpack-plugin");

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}
const config =  {
    entry: {
        index:path.join(__dirname,"/src/entry/index.js"),
        test:path.join(__dirname,"/src/entry/test.js")
    },
    output: {
        path: path.join(__dirname,"/dist"), //打包后的文件存放的地方
        publicPath:"", //引用路径
        filename: "assets/js/[name].bundle-[hash].js" //打包后输出文件的文件名
    },
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname,"/dist"),
        historyApiFallback: true,//不跳转
        hot:true,
        hotOnly:true,
        // open:true,
        index: 'index.html',
        inline: true,//实时刷新
        publicPath:"",
        port: 9000
    },
    module:{
        rules: [
            {
                test:/\.less|\.css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          hmr: process.env.NODE_ENV === 'development',
                        },
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
                        loader:'less-loader'
                    }


                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:  [
                    {
                        loader:'file-loader',
                        options:{
                            outputPath: "assets/image/", //输出路径
                            publicPath:"../image" //引用路径
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/, //不处理
                include: /src/, // 只处理
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets:["@babel/preset-env"]
                  }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), 
        new HtmlWebpackPlugin({
            title:"index",
            filename: "index.html",
            hash: true, 
            chunks:['index','jquery'],  
            template: path.join(__dirname,"/src/temp/index.temp.html"),
            files:{
                css:[],
                js:[]
            }
        }),
        new CopyWebpackPlugin([
            { from: './src/static/', to: 'static/' }
        ]),
        new HtmlWebpackPlugin({
            title:"test",
            filename: "test.html",
            hash: true, 
            chunks:['test','jquery'],  
            template: path.join(__dirname,"/src/temp/index.temp.html"),
            files:{
                css:[]

            }
        }),
        new MiniCssExtractPlugin({
            filename:'assets/css/[name].[hash].css',
            chunkFilename: 'assets/css/[id].[hash].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    optimization: {
        splitChunks: {
            minSize:1,
            cacheGroups: {
                jquery: {
                    name: 'jquery',
                    test: (module) => {
                        return /jquery/.test(module.context);
                    },
                    chunks: 'initial',
                    enforce: true,
                    priority: 10
                },
                indexStyle: {
                    name: 'index',
                    test: (m, c, entry = 'index') =>
                      m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true,
                    priority: 100
                }
            }
        },
       
    },
    externals:{
        // jquery: 'jQuery'
        
    }
}
module.exports = config;
  
```

- [demo](https://github.com/bigbrid/webpack-demo)

- [spread](https://github.com/bigbrid/webpack-spread)

**关于webpack的使用就到这里，如需了解更多，[官网地址](https://www.webpackjs.com/)**















