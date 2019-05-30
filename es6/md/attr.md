# 顶层对象的属性

顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。ES5之中，顶层对象的属性与全局变量是等价的。
**ES5中的关系**

```js
var s = "w";  //s是一个全局变量
console.log(s)  
console.log(window.s)  //同时也是顶层对象的属性
console.log(s === window.s) //这两个是相等的
```

**ES5中的关系**

```js
  let s = "w";
  const c = "c";
  console.log(s)        //w
  console.log(c)  //c
  console.log(window.s) //undefined,那么肯定不相等啦
  console.log(window.c)
```

所以看得出，由let或const声明的变量不属于顶级对象的属性。

