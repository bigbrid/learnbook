# 函数参数的解构赋值

函数参数也可以赋值解构，这个参数看起来是个数组，但是在变成函数参数的时候，就被解构赋值；

```js
function fn([x,y]){
	return x+y
}
console.log(fn([1,3])) //注意：在调用的时候也要和参数的格式相同；
```

**函数参数也可以使用默认值**

例：定义函数参数的默认值为x=0,y = 0;函数内返回他们的和，也就是默认他们的和是0；

```js
function fn1 ([x=0,y=0]){
return x+y;
}
console.log(fn1([]));//输出默认和 0
console.log(fn1([5,5]))//输出10
```

**注意：函数参数的解构赋值时，实参必须和形参的格式一样；**

