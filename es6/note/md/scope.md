# 块级作用域

ES5只有只有全局作用域和函数作用域；

## 回顾

```
var str = "我的作用域是全局，我还是window的属性";
console.log(str)
console.log(window.str)
function f1(){
    str = "全局作用域";
    console.log(str)
    var str = "函数作用域";
    console.log(str)
}
```

## 为什么需要块级作用域

### 内层变量可能会覆盖外层变量

```
var tmp = new Date;
function  fn1(){
    console.log(tmp)
    if (true) {
   		var tmp = "变量提升"

    };
    console.log(tmp)//undefind
}
```

tmp会覆盖全局变量，并提升到当前函数作用域的开始初始化，但是没有赋值，所以在当前作用域内会是undefind

### 一些变量会泄露为全局变量

```
 for (var i = 0; i < 10; i++) {}
 console.log(i)  //这里i就会泄露为全局变量;
```

## 块级作用域

ES6中的块级作用域可以简单的理解称一对大括号之间的地方。

```
 {
 	var n = 0;  
 	let sum = 10;
	console.log(n) ;  //正常输出
 	console.log(sum) ; //正常输出10
 }
 console.log(n)  //正常输出
 console.log(sum)  //报错，因为sum只能在块级作用域内使用
```

## 嵌套

ES6允许块级作用域嵌套。

```
			{let n = 0;
			  {
				  let n =1;
				  {
					   let n =2;
					  {
						   let n =3;
						  {
							   let n =4;
							  {
								   let n =5;
								   console.log(n) //5
								  
							  }
							   console.log(n) //4
						  }
						   console.log(n) //3
					  }
					   console.log(n) //2
				  }
				   console.log(n) //1
			  }
			  console.log(n) //0
			}
```

JS执行顺序，这里会依次打印5,4,3,2,1,0；这里的let之会在块级作用域内使用；

所以，完全可以用这种方法代替之前的立即调用的函数表达式(IIFE)；

**IIFE**

```
(function(){   //闭包内是一个作用域
    var n = 10;
    console.log(n)
})()
console.log(n) //这里打印会报错
```

**块级作用域**

```
{
	let n = 10;
	console.log(n)
}
console.log(n) //这里打印会报错
```

<font color="red">**这样就合理的解释了为什么在使用框架遍历数据的时候，只能在当前作用域得到数据;如果按照ES5的版本，应该这个页面或者全局都可以得到遍历的数据；**<font>

