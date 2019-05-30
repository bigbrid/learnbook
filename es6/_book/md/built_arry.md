# 数组的扩展

## 扩展运算符

扩展运算符（spread）是三个点（...）。

**扩展运算符常与函数参数结合；**

```js
function add(x,y){
	return x + y 
}
console.log(add(...[2,3]));
```

**扩展运算符后面还可以放置表达式**

```js
let arr = [
    1111,
    true,
    ...(5>1?"大于1":"小于五"),
    "000"
];
console.log(arr[2]) //大
console.log(arr[3]) //于
console.log(arr[4])  //1
```

**如果扩展运算符后面是一个空数组，则不产生任何效果**

```js
let a = [1,...[],2]
console.log(a); //[1,2]
```



### 替代函数apply方法

**apply方法**

```js
let　a1 = ["0","1","8"];
let a2 = ["a","b","k"];
let r = Math.min.apply(null,a1)
Array.prototype.push.apply(a1, a2);
console.log(r,a1); //0 ["0","1","8","a","b","k"];
```

**扩展运算符方法**

```js
 let　a1 = ["0","1","8"];
 let a2 = ["a","b","k"];
 console.log(Math.min(...a1)); //0
 a1.push(...a2) 
 console.log(a1); // ["0","1","8","a","b","k"];
```



## Array.from()

将类数组和可遍历的对象转换成真数组；

```js
let obj = {
    0:"0",
    1:"zhangsan",
    2:100,
    3:true,
    length:4
}; 
console.log(Array.from(obj));  // ["0", "zhangsan", 100, true]
```

实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的`arguments`对象。`Array.from`都可以将它们转为真正的数组。

**不支持Array.from()兼容写法**

```js
 const toArray = (() =>
 	Array.from ? Array.from : obj => [].slice.call(obj)
 )();
 	或//
  var toArry = function(obj){
  	return (!Array.from)? [].slice.call(obj): Array.from(obj);
  };
```



## Array.of()

把参数转换称数组，与new Array比较不会产生歧义；



## copyWithin()

在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。

使用这个方法，会修改当前数组。

```js
copyWithin(target, start = 0, end = this.length)
```

- target（必需）：从该位置开始替换数据。
- start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

```js
let str = "bigbrid";
console.log(str.split("").copyWithin(2).join("")); //bibigbr

console.log(str.split("").copyWithin(0,2).join("")); //gbridid

console.log(str.split("").copyWithin(0,4,6).join("")); //rigbrid
```



## find()和findIndex()

数组实例的`find`方法，用于找出第一个符合条件的数组成员。

它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。

如果没有符合条件的成员，则返回`undefined`。

数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`。



## fill()

`fill`方法使用给定值，填充一个数组。

用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。

接受第二个和第三个参数，用于指定填充的起始位置和结束位置。



## entries()，keys()和values()

`for...of`循环进行遍历

**区别:**

`keys()`是对键名的遍历、

`values()`是对键值的遍历，

`entries()`是对键值对的遍历。

```js
var a = "bigbrid".split("");
for (const item of a.keys()) {
// console.log(item);

}

for (const item of a.values()) {
	console.log(item);
}

for (const item of a.entries()) {
	console.log(item);
}
```



## includes()

该方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似。

该方法属于ES7，但Babel转码器已经支持。

**参数说明**

- 第一个参数要检索的值
- 第二个参数开始检索的位置

```js
var a = "bigbrid".split("");
console.log(a.includes("e"));  //false
console.log(a.includes("big")); //false
console.log(a.includes("b"));   //true
```

## 数组的空位

**由于空位的处理规则非常不统一，所以建议避免出现空位。**

数组的空位指，数组的某一个位置没有任何值。比如，`Array`构造函数返回的数组都是空位。

注意，空位不是`undefined`，一个位置的值等于`undefined`，依然是有值的。

空位是没有任何值，`in`运算符可以说明这一点。

ES5对空位的处理，已经很不一致了，大多数情况下会忽略空位。

- `forEach()`, `filter()`, `every()` 和`some()`都会跳过空位。
- `map()`会跳过空位，但会保留这个值
- `join()`和`toString()`会将空位视为`undefined`，而`undefined`和`null`会被处理成空字符串。

