# 对象的解构赋值

解构不仅可以用于数组，还可以用于对象。

## 堆栈

先回顾一下堆栈。

数据存放的地方就是在堆栈里存放；

普通类型的数据直接存放在栈中，如：

```js
let n = 10;
let s = "wang";
let b =true;
let timer = null;
```

上面这些数据的都是存放在栈内存中。

**引用类型**

引用类型的地址才能放在栈内存中，但是其数据存放在堆中，就是Object类型；
当查询引用类型的变量时候先从栈中读取内存地址，然后再通过地址找到堆中的值。 

```js
let o = {
    name:"wang",
    age:"18"
};
//这里o指向的是一个地址
let isname = o.name;
//isname指向的是这个地址中KEY交是name的value，这个值是保存在堆中的；
```

## 对象解构赋值

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；**而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。**

```js
let o = {
    name:"wang",
    age:"18"
};
let {name,age,job} = o; //在右侧找到与左侧相同的Key,然后复制key的value给左侧
console.log(name)  //wang
console.log(job)// undefined，因为o里没有名叫job的key;
```

**多次解构**

```js
let o = {
    name:"wang",
    age:"18"
};
let {name:a,age:b} = o; //左侧的name匹配右侧name,然后把值赋给a;
console.log(a)
```

如果对声明的变量，进行变量结构，那本必须小心，会把赋值结构看成是代码块，会报错，这样那我们用圆括号括起来;

```js
let name,age,job;
let o ={
    name:"wang",
    age:18,
    job:"搬砖"
};
{name,age,job} = o; //报错浏览器会把这个看成代码块
({name,age,job} = o) //这样即可
```

