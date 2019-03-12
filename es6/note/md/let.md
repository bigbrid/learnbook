# let命令

ES6新增了`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效。

## 对比var

### 	作用域不同

 var 有变量提升,也就是不管var 在当前作用域的第几行,都会别提升至首行并初始化为undefined;

**var**变量被提升至当前作用域首行;

 *fn1 实际执行过程中会变成 fn2*

```
function fn1(){
	console.log(n)
	var n = 9;
}
function fn2(){
	var n; //var变量被提升至当前作用域首行
	console.log(n);
	n = 9;
}
```

**let**let变量不会被提升至当前作用域首行初始化为undefined；

```
 function f1(){
 	let n;
 	console.log(n)    //声明但是没有赋值的，输出undefined
 }
```

ES6明确规定 在块级作用域内，let声明变量之前不能使用变量，语法上称之为"暂时性死区（TDZ）

```
function fn2(){
 	console.log(n)   报错，
	let n = 9;		
}
```

### 不允许重复声明变量

**var**相同作用域内可以重复声明相同变量，后赋值的会覆盖之前赋值的；

```
function fn1(){
	var n = 2;
	var n = 9;   
	console.log(n)  //9
}
```

### 例子选项卡

**ES5中实现**

```

function swichTabES5(){

    var btns = document.getElementsByTagName("button");

    var el_box = document.getElementsByTagName("div")[0];

    var el_p = el_box.getElementsByTagName("p");
    console.log(i,"变量提升 i被提升至作用域首行，初始化为undefined") 
    for (var i = 0; i < btns.length; i++) {   
        if(i!== 0){
        	el_p[i].style.display="none";
        };
        (function(n){ 					
            btns[i].onclick = function(){
                for (var j = 0; j < btns.length; j++) {
                    el_p[j].style.display="none";
                }
                el_p[n].style.display="block";
            }
        })(i)
    }
    console.log(i,"for同步函数")   //for循环是同步执行函数，会循环至最后一个才打印
}
```

**ES6中实现**

```
function swichTabES6(){
				
    var btns = document.getElementsByTagName("button");

    var el_box = document.getElementsByTagName("div")[0];

    var el_p = el_box.getElementsByTagName("p");
    console.log("不可以打印i","变量没有提升,此时执行会报错，即暂时性死区")  
    for (let i = 0; i < btns.length; i++) {  
        console.log(i,"块级作用域内打印i")
        if(i!== 0){
        	el_p[i].style.display="none";
        };
        btns[i].onclick = function(){
            for (var j = 0; j < btns.length; j++) {
            	el_p[j].style.display="none";
            }
            el_p[i].style.display="block";
        }
    }  
    console.log("不可以直接打印i","块级作用域外没有i，此时打印报错")
}
```

