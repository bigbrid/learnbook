# <font color=#0099ff><center>动态样式语言-Less</center></font>

​	作为前端学习者的我们 或多或少都要学些 CSS ，它作为前端开发的三大基石之一，时刻引领着 Web 的发展潮向。 而 CSS 作为一门标记性语言，可能 给初学者第一印象 就是简单易懂，毫无逻辑，不像编程该有的样子。在语法更新时，每当新属性提出，浏览器的兼容又会马上变成绊脚石，不方便维护及扩展，不利于复用，可以说 CSS 短板不容忽视。

​    问题的诞生往往伴随着技术的兴起， 在 Web 发展的这几年， 为了让 CSS 富有逻辑性，短板不那么严重，涌现出了 一些神奇的预处理语言。 它们让 CSS 彻底变成一门 可以使用 变量 、循环 、继承 、自定义方法等多种特性的标记语言，逻辑性得以大大增强。

## 预处理语言的诞生

其中 就我所知的有三门语言：Sass、Less 、Stylus 。

1. Sass 诞生于 2007 年，Ruby 编写，其语法功能都十分全面，可以说 它完全把 CSS 变成了一门编程语言。另外 在国内外都很受欢迎，并且它的项目团队很是强大 ，是一款十分优秀的预处理语言。
2. Stylus 诞生于 2010 年，来自 Node.js 社区，语法功能也和 Sass 不相伯仲，是一门十分独特的创新型语言。
3. Less 诞生于 2009 年，受Sass的影响创建的一个开源项目。 它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充（*引用于官网*）。

## 选择预处理语言

这是一个十分纠结的问题。

在我看来，这就好比 找女朋友，有人喜欢 贤惠安静的，就有人喜欢 活泼爱闹的，各有各的爱好，可晚上闭灯后 其实都差不多，所以你不用太过纠结。当然了 ，首先 你要有女朋友。

在网上讨论看来，Sass 与 Stylus 相比于 Less 功能更为丰富，但对于学习成本以及适应时间 ，Less 稍胜一筹，这也是我选择 Less 的原因。

Less 没有去掉任何 CSS 的功能，而是在现有的语法上，增添了许多额外的功能特性，所以学习 Less 是一件非常舒服的事情。

## 概述

[Less](http://lesscss.org/) （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言。

总结一下为：Less = 变量 + 混合 + 函数。

如果你对 js 和 css 有所了解，那么就可以很快的掌握并在你的项目中使用 Less。

## 安装

### CDN引入

Less.js是最简单的入门方式，便于使用Less进行开发，但在生产中，当性能和可靠性很重要时，*建议使用Node.js或许多第三方工具之一进行预编译。*

首先，将`.less`样式表链接到`rel`设置为“ `stylesheet/less`” 的属性

直接使用[官网CDN](http://lesscss.org/)或者下载到本地引入页面；

```html
<link rel="stylesheet/less" href="style.less">
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js" ></script>
```

### NPM安装

全局安装

```bash
npm install -g less
```

查看版本

```bash
$ lessc -v
lessc 3.9.0 (Less Compiler) [JavaScript]//版本
```

#### 输出编译的css

可以加上要输出的路径和名字。

```bash
$ lessc style.less (...path&name)
```

官网推荐了一款[less输出压缩css的插件](https://github.com/less/less-plugin-clean-css)



## VS code插件

这段时间一直在用vscode这个款编辑器，安装[Easy less](https://marketplace.visualstudio.com/items?itemName=mrcrowl.easy-less)插件之后会将less文件自动编译成css文件。

**配置**

使用settings.json全局配置；

或者：

单文件自定义

在less的开始用注释的形式标注相关配置

**单文件自定义输出路径**

```less
// out: css/style.css  
// out: ./css/style.css 
```

[其他配置查看说明文档](https://marketplace.visualstudio.com/items?itemName=mrcrowl.easy-less)

[官网给我们提供更多关于less的工具](https://less.bootcss.com/tools/#guis-for-less)

