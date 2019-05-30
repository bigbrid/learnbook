# 字符串的解构赋值

## 字符串

字符串也可以解构赋值。这是因为此时，**字符串被转换成了一个类似数组的对象**。

```js
let my_name = "wang";
let [a,b,c,d] = my_name;
console.log(a,b,c,d)//w a n g  给左侧每个变量赋了右侧字符串的一个字符
```



字符串有length属性，所以可以取到他的length.

```js
let {length:len} = o.name;  //这里o.name是一个字符串有一个length的属性
console.log(len== o.name.length)//true 
```

