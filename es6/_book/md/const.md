# const命令

## 声明一个常量，且不能改变

```js
const PI  = 3.14;
console.log(PI)	  //正常输出
PI = 3;			//重新赋值	
console.log(PI)  //报错
```

## 立即初始化赋值

因为不能重新赋值，所以必须立即初始化赋值

```js
const n;   //直接报错，必须要赋给一个定值
console.log(n) 
```

## const和let

const和let 一样，不存在变量提升，有暂时性死区，不可重复，只能在声明之后用

```js
function f1(){
    console.log(n)  //报错暂时性死区
    const n = 10;      //变量没有提升
    const n = 0;   //不能重复声明
    console.log(n)  
｝
```

## 复合型数据

对于复合型数据const不指向数据，而是指向这个地址，比如数组的[],对象的[]，就是一个地址；或者是function 的返回值

**数组**

```js
function fn1(){
    const a = [];
    a.push("可以被添加") //可以被添加
    //添加之后让这个数组变成空或是变成对象或其他，不能改变地址；
    //a = [] //报错
    //a = {} //报错
    //可以给地址内的数据赋值
    a[0]="重新赋值了"
    console.log(a)

}
```

**对象**

```js
function fn1(){
    const o = {};
    o.str = "我是字符串" //可以被添加
    //添加之后让这个数组变成空或是变成对象或其他，不能改变地址；
    //o = [] //报错
    //o = undefined //报错
    //可以给地址内的数据赋值
    o.str="重新赋值了"
    console.log(o)

}
```



**所以const命令适合常量或不变的量，比如，正则，函数返回值**

ES5只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，还有import命令和class命令。所以，ES6一共有6种声明变量的方法。