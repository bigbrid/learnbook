# 默认值

如果没有这个自定义默认值，那么解构赋值的时候这个值先等与undefined，如果有值的情况下会被赋值，没有值是undefined。

```js
let [x,y,z] = [1,2]
console.log(z)  //undefined，右侧与z位置没有对应的值
```

## 自定义默认值

```js
let [x,y,z=100] = [1,2];
console.log(z) //自定义z的值是100，右侧没有对应的值情况下，会使用自定义的默认值；
```

### 默认值是函数

如果与之对应的有值那么这个函数则不执行；

```js
function f() {
	return "相对应的没有值";
};

let [n= f()] = []
console.log(n) //没有对应的值，输出默认值，默认值是一个函数的返回值；

let [n= f()] = [100]
console.log(n) //有对应的值，输出对应值
```

