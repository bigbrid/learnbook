# 对象的扩展

## 属性的简洁表示法

ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

**属性简写**

```
let  name = "wang";
let  userName = {name};
console.log(userName); //{name: "wang"}
```

**返回值简写**

```
 function fn1(x,y){
	 return {x,y}
 }
 console.log(fn1(1,2));
 //{x: 1, y: 2}
```

**方法简写**

```
let  name = "wang";
let  userName = {name,getname(){
console.log(this.name)
}};
userName.getname()
```

**CommonJS模块输出变量**

```javascript
module.exports = { getItem, setItem, clear };
```

有些豁然开朗了！



## 属性名表达式

ES6 允许字面量定义对象时，用表达式作为对象的属性名，即把表达式放在方括号内。

```javascript
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
```



## 方法的 name 属性

函数的`name`属性，返回函数名。对象方法也是函数，因此也有`name`属性。

```
  let o = {
  	f(){ }
  }
  console.log(o.f.name); //f
```



## Object.is()

ES5比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。它们都有缺点，前者会自动转换数据类型，后者的`NaN`不等于自身，以及`+0`等于`-0`。JavaScript缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

ES6提出“Same-value equality”（同值相等）算法，用来解决这个问题。

`Object.is`就是部署这个算法的新方法。

**它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。**

```
Obiect.is(everthing,everthing)
```

```
console.log(Object.is(+0,-0)); //false
console.log(Object.is(NaN,NaN)); //true
let o1 = {x:1};
let o2 = o1;
console.log(Object.is(o1,o2)); //true
console.log(Object.is(o1,{x:1})); //false
```

