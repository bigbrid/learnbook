# 解构赋值的用途

解构赋值的用于很多，先列举一二。

## 变量的交换值

```
let x = 1;
let y = 9;
console.log(x)  //1
console.log(y)  //9
[x,y] = [y,x];
console.log(x)  //9
console.log(y)  //1
```

## 解构函数返回多个值

```
function fn(){
    let name ="wang",age = 18,job = "搬砖";
    return [name,age,job]  
}

console.log(typeof fn()) //查看这个函数的返回值是一个Object;
console.log(fn()[2]) //用数组下标也可以的得到值

let [iswho,isage] = fn();

console.log(iswho)  //wang
console.log(isjob)  //18
```

忽略函数的返回值

```
let [iswho,,isjob] = fn(); //忽略age的返回值
```

## 切割数组或对象

### 数组

```
let [,,,,,,...res] = [0,1,2,3,4,5,6,7,8,9,10]
console.log(res)  //[6, 7, 8, 9, 10]
```

### 对象

```
let {a,b,...res}={
    a:0,
    b:1,
    c:2,
    d:3,
    e:4
};
console.log(res) //{c: 2, d: 3, e: 4}
```



## 动态解构对象字符段

```
let key = 'x';
// key是变量
let {[key]: value} = {x: 'X', y: 'Y', z: 'Z'};
console.log(value); // "X"
```

## 输入模块的指定方法

```
const { pModule1, pModule2 } = require("p");
```



## 循环迭代取值

**实例：**[四大名著](https://www.ulvoe.com//Learning/example/es6/06dec_use.html)

css

```
*{margin: 0;padding: 0;}
ul,li{list-style: none;}
h1{font-size: 40px;text-align: center;padding: 50px 0;color: #373B4E;}
.content{width: 1000px;margin: 0 auto;padding-bottom: 100px;}
#tab{width: 100%;display: flex;border:1px solid #C0C0C0;border-left: none;border-right: none;}
#tab li{display: block;flex: 1;text-align: center;border-right: 1px solid #C0C0C0;cursor: pointer;box-sizing: border-box;padding: 5px;}
#tab li:last-of-type{border:none}
#tab li:hover{color: #2AA198;}
#container{margin-top: 30px;padding-bottom: 30px;border-bottom: 1px solid #C1C6D7;}
#container .tit{font-size: 28px;text-align: center;}
#container .des{display: flex;justify-content: flex-end;color: #1C1F2B;}
#container .des span{margin-left: 20px;}
#container .cont_text{margin-top: 50px;line-height: 2;}
#container li{display: none;}
#container li:first-child{display: block;}
```

html

```
<div class="content">
    <ul id="tab"></ul>
    <ul id="container"></ul>
</div>
```

javascript

book.js是一个模拟的数据；

```
<script src="book.js"></script>  
<script>
//定义获取ID和新建el的方法
const gId = function(el){
   return document.getElementById(el)
};
const creaEl = function(el){
	return document.createElement(el)
};
{
	//取值
	let container = gId("container");
    let tab = gId("tab");
    //定义块级作用域的全局变量，为默认添加文章个数
    let index = 0;
    //遍历对象
    for (let key in books) {
    
    	//对象解构取值
        let {title,authour,upTime,arctile} = books[key];
        
		//数组解构赋值
        let [oli,des,dbauthor,dbuptime] = [creaEl("li"),creaEl("p"),creaEl("span"),creaEl("span")];
        
		//数组解构赋值
        [des.className, dbauthor.className,dbuptime.className] = ["des","author","uptime"];
        
		//数组解构赋值
        [oli.innerHTML,dbauthor.innerHTML,dbuptime.innerHTML,arctile] = [title,"作者：" + authour,"上传时间：" + upTime,arctile];
        
        //设置导航
        tab.appendChild(oli);
        des.appendChild(dbauthor)
        des.appendChild(dbuptime)

		//循环迭代取值
        for (let {id,title,context} of arctile) {
        
        	//数组解构
            let [bdli,h2,cont_text] = [creaEl("li"),creaEl("h2"),creaEl("p")];
            
            //数组解构
            [h2.className,cont_text.className] = ["tit","cont_text"];
            
            //这里用正则把单换行赋换成双换行符，起到美化
            [h2.innerHTML,cont_text.innerHTML] = [title,context.replace(/<br\/>/g,"<br/><br/>")];
            //添加内容
            bdli.appendChild(h2);
            bdli.appendChild(des);
            bdli.appendChild(cont_text);
            
            //默认添加的数据索引
            if(index == 0){
                container.appendChild(bdli)	
            };
            
            //导航的点击事件
            oli.addEventListener("click",function(even){
                container.innerHTML="";
                container.appendChild(bdli)
            })
            
        }		
		index++;
	}
};
				
</script>
```





