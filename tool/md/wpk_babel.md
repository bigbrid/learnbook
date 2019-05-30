# 编译环境，插件

## Babel

Babel 本质就是一个 JavaScript 编译器，它可以：

1. 将 JavaScript 源代码解析成抽象语法树（AST）；
2. 将源代码的 AST 结果一系列转换生成目标代码的 AST；
3. 将目标代码的 AST 转换成 JavaScript 代码。

那么就可以完成 ES6 代码到 ES5 代码的转换，当然转换的过程会很复杂，我们在这里先了解一下基本的原理。

想深入了解的同学可以通过开发自己的 [Babel Plugin](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)，熟悉 AST 的操作流程。

#### Babel的安装与配置

Babel其实是几个模块化的包，其核心功能位于称为`babel-core`的npm包中，webpack可以把其不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要安装单独的包。

```bash
//安装
npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env

```

```bash
npm install --save-dev babel-preset-stage-0
```

- [babel-core](http://babeljs.io/docs/usage/api/) 核心

- babel-preset-env 是一个主流的 Babel 插件数组

- Stage-X 是实验阶段的 Presets

  Stage 0 - 稻草人: 只是一个想法，可能是 babel 插件。
  Stage 1 - 提案: 初步尝试。
  Stage 2 - 初稿: 完成初步规范。
  Stage 3 - 候选: 完成规范和浏览器初步实现。
  Stage 4 - 完成: 将被添加到下一年度发布。

**增加babel配置**：

```js
//webpack.config.js >module>rules
{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/, //不处理
    include: /src/, // 只处理
    use: {
        loader: 'babel-loader',
        options: {
        	presets:["@babel/preset-env"]//也可以使用外部.babelrc文件
        }
    }
}
```

执行 `npm start`命令并查看生成的bulide.js 文件，可以发现已经被转换成 ES5 代码了

**ES6**

```js
$ cat src/js/module.js
module.exports.info = [
    {
        name:"沙雕",
        age:18,
        say(){
            return ` ${this.name}${this.age} 啦,它好开心`
        }
    }

]
```

**ES5**

```js
$ cat dist/bundle.js
...
    t.exports.info = [{
        name: "沙雕",
        age: 18,
        say: function () {
            return " ".concat(this.name).concat(this.age, " 啦,它好开心")
        }
    }]
...
```



## 缓存

缓存无处不在，使用缓存的最好方法是保证你的文件名和文件内容是匹配的（内容改变，名称相应改变）

webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前

```js
 //webpack.config.js >output
 output: {
      path: __dirname + "/dist", //打包后的文件存放的地方
      filename: "bundle-[hash].js" //打包后输出文件的文件名
  },
```



## 插件（Plugins）

[插件（Plugins）](https://www.webpackjs.com/plugins/)是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。

Webpack有很多内置插件，同时也有很多[第三方插件](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins)，可以让我们完成更加丰富的功能。



### 使用插件的方法

要使用某个插件，我们需要通过`npm`安装它，然后在webpack配置中的plugins关键字部分添加该插件的一个实例。接`new Plugins()`



### 常用插件

#### CleanWebpackPlugin

每次打包前清理输出目录内容

```bash
npm install --save-dev clean-webpack-plugin
```

引入

```js
const CleanWebpackPlugin = require("clean-webpack-plugin")
```

引用

```js
//webpack.config.js >plugins
plugins: [
    new CleanWebpackPlugin() 
]
```

[查看配置](https://github.com/johnagan/clean-webpack-plugin)



#### HtmlWebpackPlugin

github：[HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)

webpack：[HtmlWebpackPlugin](https://www.webpackjs.com/plugins/html-webpack-plugin/)

这个插件的作用是依据一个简单的`index.html`模板，生成一个自动引用你打包后的JS文件的新`index.html`。这在每次生成的js文件名称不同时非常有用（比如添加了`hash`值）。

```bash
npm install -save-dev html-webpack-plugin
```

在src下新建tmp目录，用于存放模板

在tmp下新建文件index.tmp.html作为模板

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

配置输出路径

```
//基本配置
//webpack.config.js >plugins
plugins: [
    new HtmlWebpackPlugin({
        title:"webpackHtmlWebpackPlugin", //输出文件标题
        filename: "index.html",  //输出文件路径
        template: __dirname + "/src/tmp/index.tmp.html" //引用模板
    })
]
```

再次执行`npm start`你会发现，新的.html和.js文件已经生成。

**配置其他数据**

模板里循环渲染

```
//html
<% for (var css in htmlWebpackPlugin.options.files.css) { %>
    <link href="<%=htmlWebpackPlugin.options.files.css[css] %>" rel="stylesheet">
<% } %>
```



```
//webpack.config.js >plugins
new HtmlWebpackPlugin({
    files:{
        css:[
            "//fonts.googleapis.com/css?family=Montserrat+Alternates:700|Volkhov:700|Hammersmith+One|Arbutus+Slab|Poppins:800|Questrial|Bungee+Outline|Josefin+Sans:700|Josefin+Sans:400,700|Josefin+Sans:400,700|Playfair+Display"
            ]，
        js:["js/xxx.js]

    }
})
```





#### ExtractTextWebpackPlugin

之前打包的css文件是通过js代码生成，以style标签的形式嵌入HTML代码里；

那么这个[ExtractTextWebpackPlugin](https://www.webpackjs.com/plugins/extract-text-webpack-plugin/)插件就可以抽取CSS,然后以link的形式在嵌入页面

- 如果当前项目是webpack3.x版本，使用extract-text-webpack-plugin；
- 如果当前项目是webpack4.x版本（但已有extract-text-webpack-plugin配置），可以继续用extract-text-webpack-plugin，但必须用对应的beta版本，且这个beta版本不支持生成hash；
- 如果当前项目是webpack4.x版本且是新项目，使用[mini-css-extract-plugin](https://github.com/jiang43605/multiple-mini-css-extract-plugin)

```bash
npm install --save-dev extract-text-webpack-plugin
```

```bash
npm install --save-dev extract-text-webpack-plugin@next
```

更改/增加配置

```js
const ExtractTextPlugin = require("extract-text-webpack-plugin")
//webpack.config.js >rules>
 {
     test:/\.less|\.css$/,
     use:ExtractTextPlugin.extract({ 
         fallback:'style-loader', 
         use: [
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
     })
 }
//webpack.config.js >plugins>
new ExtractTextPlugin({
	filename:"style.css" //路径名字
})
```

参数：fallback

extract默认行为先使用css-loader编译css，如果一切顺利的话，结束之后把css导出到规定的文件去。但是如果编译过程中出现了错误，则继续使用fallback配置项处理css。

#### MiniCssExtractPlugin

```
npm install --save-dev mini-css-extract-plugin
```

简单配置如下，高级配置请看[MiniCssExtractPlugin官方文档](https://webpack.js.org/plugins/mini-css-extract-plugin/)

```
//
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
 }

//
new MiniCssExtractPlugin({
    filename:'assets/[name].[hash].css',
    chunkFilename: 'assets/[name].[hash].css'
}),
```



### 更多常用插件

#### HotModuleReplacement

HotModuleReplacement允许你在修改组件代码后，自动刷新实时预览修改后的效果。

**永远不要***在生产环境(production)下启用 HMR*

[HotModuleReplacement](https://www.webpackjs.com/concepts/hot-module-replacement/)

<https://www.webpackjs.com/guides/hot-module-replacement/>

```javascript
new webpack.HotModuleReplacementPlugin({
  // Options...
})
```

#### copy-webpack-plugin

在webpack中拷贝单个文件或多个文件或整个目录, 可用于大型类库的拷贝
npmjs: [https://www.npmjs.com/package...](https://www.npmjs.com/package/copy-webpack-plugin)
github: [https://github.com/webpack-co...](https://github.com/webpack-contrib/copy-webpack-plugin)

```
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  new CopyWebpackPlugin([
    { from: '**/*', to: 'relative/path/to/dest/' }
    { from: '**/*', to: '/absolute/path/to/dest/' }
  ], options)
```

#### purifycss-webpack

打包编译时，可剔除页面和js中未被使用的css，这样使用第三方的类库时，只加载被使用的类，大大减小css体积
npmjs: [https://www.npmjs.com/package...](https://www.npmjs.com/package/purifycss-webpack)
github: [https://github.com/webpack-co...](https://github.com/webpack-contrib/purifycss-webpack)

```
let purifyCssPaths = glob.sync(path.join(rootPath, '/src/server/view/**/*.html'));
purifyCssPaths = purifyCssPaths.concat(glob.sync(path.join(rootPath, '/src/client/js/**/*.js')));

new PurifyCSSPlugin({
  paths: purifyCssPaths,
})
```

#### optimize-css-assets-webpack-plugin

压缩css，优化css结构，利于网页加载和渲染
npmjs: [https://www.npmjs.com/package...](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)

```js
new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.optimize\.css$/g,
  cssProcessor: require('cssnano'),
  cssProcessorOptions: { discardComments: { removeAll: true } },
  canPrint: true
})
```

#### progress-bar-webpack-plugin

打包编译时，显示进度条
npmjs：[https://www.npmjs.com/package...](https://www.npmjs.com/package/progress-bar-webpack-plugin)

```js
new ProgressBarPlugin();
```

#### stylelint-webpack-plugin

规范scss, less，css书写规则
npmjs：[https://www.npmjs.com/package...](https://www.npmjs.com/package/stylelint-webpack-plugin)
roles：[https://stylelint.io/user-gui...](https://stylelint.io/user-guide/rules/)

```js
 new StyleLintPlugin({
      context: path,
      files: '**/*.(less|css|sass)',
  })
```

#### webpack-parallel-uglify-plugin

可以并行运行UglifyJS插件，这可以有效减少构建时间
npmjs：[https://www.npmjs.com/package...](https://www.npmjs.com/package/webpack-parallel-uglify-plugin)

```js
new ParallelUglifyPlugin({
    cacheDir: path.join(config.rootPath,'webpack-cache'),
    workerCount: 5,
    uglifyJS:{
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }
  })
```

#### happypack

多线程执行任务，加快编译速度
npmjs：[https://www.npmjs.com/package...

```js
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

//plugin
  new HappyPack({
    id: 'less',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'less-loader',
    }]
  }),

//loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
{
    test: /\.less$/,
    use: [
      'css-hot-loader',
      MiniCssExtractPlugin.loader,
      'happypack/loader?id=css',
      'happypack/loader?id=less',   
    ]
  },
```

#### assets-webpack-plugin

生成资源路径和文件名对应关系，可利用该插件生成输出带有hash值的文件名。摒弃了利用版本号来更新缓存。利用文件内容生成hash值时，用户只需要更新被改动过的文件。
npmjs：[https://www.npmjs.com/package...](https://www.npmjs.com/package/assets-webpack-plugin)

```js
new AssetsPlugin({
  path: '/var/www/',
  filename: 'webpack.assets.json',
};);
```















