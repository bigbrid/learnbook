# 内置对象扩展

先回顾下JavaScript中的的几大对象：

1. 原生对象。 也叫内部对象，本地对象。
2. 内置对象。
3. 宿主对象。

## 定义

### 原生对象

 独立于宿主环境的ECMAScript实现提供的对象。简单来说，本地对象就是定义的类（引用类型）。在运行过程中动态创建的对象，需要new；可以理解成亲生的。

### 内置对象

独立于宿主环境的所有对象，在引擎初始化阶段就被创建好，不必明确实例化吗，也就是不使用new来实例化； 同样是“独立于宿主环境”我们似乎很难分清“内置对象”与“本地对象”的区别，而ECMA-262 只定义了两个内置对象，即 Global 和 Math （它们也是本地对象，根据定义，每个内置对象都是本地对象）。如此就可以理解了。**<font color="red">内置对象是本地对象的一种。</font>**可以理解成亲生的。

### 宿主对象

就是javascr寄生的运行环境。比如操作系统，浏览器，BOM和DOM对象就是宿主对象；说白了就是，ECMAScript官方未定义的对象都属于宿主对象，因为其未定义的对象大多数是自己通过ECMAScript程序创建的对象。可以理解成收养的。

## 内容

### 原生对象

Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、Global

### 内置对象

Global（全局对象）、Math 

### 宿主对象

自定义对象，或是BOM，DOM对象

比如：

```js
Document
Windown
let o = {}
```

这些都是宿主对象。

### 私自扩展内置对象

私自扩展内置对象，即使能解决问题，但不可以保证长久的运行完好，因为万一哪天，浏览器或javascript本身就会实现这个方法，线上的代码就出现了大面积问题。

```js
String.prototype.doTow=function(){
    if(!isNaN(parseInt(this))){
   	 	return str = (this.length>1)?  this: "0"+this;
    }else{
   	 	return false
    }
}
```

## ES5内置对象

### 内置对象

- String对象：字符串对象，提供了对字符串进行操作的属性和方法。
- Array对象：数组对象，提供了数组操作方面的属性和方法。
- Date对象：日期时间对象，可以获取系统的日期时间信息。
- Boolean对象：布尔对象，一个布尔变量就是一个布尔对象。
- Number对象：数值对象。一个数值变量就是一个数值对象。
- Math对象：数学对象，提供了数学运算方面的属性和方法。
- RegExp:正则。

**<font color="red">所以ES6内置对象的扩展就是在这些上做扩展，增加方法</font>**

[ES5更多内置对象的属性和方法或宿主对象的属性和方法参考](http://www.w3school.com.cn/js/index.asp)



