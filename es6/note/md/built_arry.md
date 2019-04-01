# 数组的扩展

## 扩展运算符

扩展运算符（spread）是三个点（...）。

**扩展运算符常与函数参数结合；**

```
function add(x,y){
	return x + y 
}
console.log(add(...[2,3]));
```

**扩展运算符后面还可以放置表达式**

```
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

```
let a = [1,...[],2]
console.log(a); //[1,2]
```



### 替代函数apply方法

**apply方法**

```
let　a1 = ["0","1","8"];
let a2 = ["a","b","k"];
let r = Math.min.apply(null,a1)
Array.prototype.push.apply(a1, a2);
console.log(r,a1); //0 ["0","1","8","a","b","k"];
```

**扩展运算符方法**

```
 let　a1 = ["0","1","8"];
 let a2 = ["a","b","k"];
 console.log(Math.min(...a1)); //0
 a1.push(...a2) 
 console.log(a1); // ["0","1","8","a","b","k"];
```

## Array.from()

将类数组和可遍历的对象转换成真数组；

```
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

```
 const toArray = (() =>
 	Array.from ? Array.from : obj => [].slice.call(obj)
 )();
 	或//
  var toArry = function(obj){
  	return (!Array.from)? [].slice.call(obj): Array.from(obj);
  };
```





