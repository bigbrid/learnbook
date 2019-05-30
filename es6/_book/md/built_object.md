# 对象的扩展

## 属性的简洁表示法

ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

**属性简写**

```js
let  name = "wang";
let  userName = {name};
console.log(userName); //{name: "wang"}
```

**返回值简写**

```js
 function fn1(x,y){
	 return {x,y}
 }
 console.log(fn1(1,2));
 //{x: 1, y: 2}
```

**方法简写**

```js
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

```js
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

```js
Obiect.is(everthing,everthing)
```

```js
console.log(Object.is(+0,-0)); //false
console.log(Object.is(NaN,NaN)); //true
let o1 = {x:1};
let o2 = o1;
console.log(Object.is(o1,o2)); //true
console.log(Object.is(o1,{x:1})); //false
```

## Object.assign()

**`Object.assign(target,source1,source2)`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。**

目标对象与源对象有同名属性，后面的属性会覆盖前面得到属性；

```js
let o = Object.assign({a:1},{a:2});
console.log(o); /{a:2}
```



如果只有目标对象，没有源对象，直接返回源对象

```js
let o1 = {a:"x"};
let o = Object.assign(o1)
console.log(Object.is(o,o1)); //true
```



如果参数不是对象，会先自动转化称对象，然后返回；

<u>由于`undefined`和`null`无法转成对象，所以如果它们作为参数，就会报错。</u>

```js
 console.log(typeof Object.assign("x")); //object
```



如果非对象参数出现在源对象的位置（非第一个参数），那么这些参数会转换成对象，转换失败就会跳过；除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。

```js
console.log(Object.assign({},"x",null,undefined,{a:1}));//{0: "x", a: 1}
```

**注意点**

- `Object.assign`方法实行的是浅拷贝，而不是深拷贝。
- `Object.assign`的处理方法是替换，而不是添加。



**用途**

1. 为对象添加属性

   ```js
    let o = {};
    Object.assign(o,{id:"1"})
    console.log(o); //{id: "1"}
   ```

   

2. 为对象添加方法

   ```js
   let o = {};
   Object.assign(o,{
       f(){
   
       },
       f1(){
   
       }
   })
   console.log(o); //{f: ƒ, f1: ƒ}
   ```

   

3.克隆对象

```js
 let o = {id:1};
 let copeO = Object.assign({},o) 
 console.log(copeO);
```



4.合并对象

```js
 let o = {id:1};
 let o2 = {name:"xxx"}
 let newO = Object.assign({},o,o2) 
 console.log(newO);
```

