# 数组的解构赋值

等号的左右两边都是数组

```js
[a,b,c] = [1,2,3]
```

例子：昨天今天明天

```js
const getDateStr = function(date){
    let o = new Date(date);
    let years = o.getFullYear();
    let mouth = o.getMonth()+1;
    let day = o.getDate();
    let hour = o.getHours();
    let minu = o.getMinutes();
    let second = o.getSeconds()
    let weel ="日一二三四五六".charAt(o.getDay());
    const doTonw = function(s){
    let n = Number(s);
        return  n < 10?"0"+ n:n;
    };
	return years+"/"+doTonw(mouth)+"/"+doTonw(day)+" "+doTonw(hour)+
	":"+doTonw(minu)+":"+doTonw(second)+" 星期"+weel
}

var time = new Date().getTime();
const oneday = 60*60*24*1000; //一天的时间
let [yesterday,today,tromorrow] = [getDateStr(time-oneday),getDateStr(time),getDateStr(time+oneday)];

console.log(yesterday);  //昨天
console.log(today);		//今天
console.log(tromorrow);//明天
			
```

**不完全结构**

没有赋值就为undefined

```js
let [yesterday,today,tromorrow] = [getDateStr(time-oneday),getDateStr(time)];
console.log(tromorrow);//undefined
```

**变参解构**

这里的future是一个对象

```js
let [today,...future] = [getDateStr(time),getDateStr(time+oneday),getDateStr(time+oneday*2)];
console.log(today);		//今天
console.log(future);//未来两天
console.log(typeof future);//object
```

