# 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```
 console.log(Number.prototype)  
 console.log(Boolean.prototype) 
```

上面代码可以看见，Number和Boolean在原型上有一个toString方法，那么来测试下

```
var {toString:fn_n } = 10;
var {toString:fn_b } = true;
console.log(fn_n===Number.prototype.toString) //这里是fn是其原型上的toString方法
console.log(fn_b===Boolean.prototype.toString)	
```

可以看见，赋值解构的时候，都会把右边的数据类型转换为object类型。然后在进行赋值结构。

