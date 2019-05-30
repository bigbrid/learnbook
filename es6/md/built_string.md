# 字符串扩展

## 遍历字符串

```js
for(let ket of "javascript"){
	console.log(ket)//字符串的每一个字符
}
```

## 新增方法

### 检测字符串

传统上，JavaScript只有`indexOf`方法，可以用来确定一个字符串是否包含在另一个字符串中。

ES6又提供了三种新方法,均返回布尔值。

- **includes(searchString,startIndex)**	

  是否找到了参数字符串,startIndexde的默认值是0；

- **startsWith(searchString,startIndex)**   

  符串是否在源字符串的头部，startIndexde的默认值是0；

- **endswith(searchString,startIndex)**   

  字符串是否在源字符串的尾部，startIndex默认值是源字符串的长度，startIndex存在时，指startIndex往前。

```js
let str = "javascript";

console.log(str.includes("java")) //true  
console.log(str.includes("java",0)) //true
console.log(str.includes("java",1)) //false

console.log(str.startsWith("java"))//true
console.log(str.startsWith("java",0))//true
console.log(str.startsWith("java",0))//false


console.log(str.endsWith("script")) //true
console.log(str.endsWith("script",str.length)) //true
console.log(str.endsWith("script",str.length-1)) //false
```

### 返回新字符串

#### repeat(n)

repeat方法返回一个新字符串，表示将原字符串重复`n`次。n的默认值为0，返回空的字符串，该字符串的长度为0;

n的类型：

- 浮点数会被取整
- 负数或者无穷大，无穷小会报错Infinity
- NAN等同与0
- 其他类型数据会被先转换为数字；

```js
console.log("你好".repeat())  //""
console.log("你好".repeat(2))  //你好你好
console.log("你好".repeat(3.6)) //你好你好你好
console.log("你好".repeat(0))   //""
console.log("你好".repeat(-6))  //报错
console.log("你好".repeat(Infinity))  //报错
console.log("你好".repeat(NaN))  //""
console.log("你好".repeat("3"))  //你好你好你好
console.log("你好".repeat("p")) //""
```

### 字符串补全

ES7推出了字符串补全长度的功能。

**头部补全   padStart(length,string)** 

**尾部补全   padEnd(length,string)** 

length：指定长度，补全之后字符串的总长度

string：指补全的字符  如省略此参数会用空格补全

```js
console.log("x".padStart(3,"h")) //hhx
console.log("x".padStart(3)) //  3
```

字符串源长度大于指定长度就返回源字符串

```js
console.log("javascript".padStart(2)) //javascript
```

字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。

```js
console.log("x".padStart(2,"javascript")) //jx
```

padEnd于padStart同理。

**常见用途**

1. 数字指定补全位数

   ```js
   "1".padStart(10,'0') //0000000001
   ```

2. 提示字符串格式

   ```js
   '03-14'.padStart(10, 'YYYY-MM-DD')
   ```

3. 其他用途

## 模板字符串

### 传统字符串与模板字符串的比较

传统字符串

```js
let elInnerhtml = "<h4 class=\"tit\">"+article.title+"</h4>"+"<p>"+article.author+"</p>"+"<p>"+article.text.join("<br/>")+"</p>";
```

模板字符串

```js
let elInnerhtml =
`
    <h4 class="tit">${article.title}</h4>
    <p>${article.author}</p>
    <p>${article.text.join("<br/>")}<p/>

`;
```

相比较，模传统字符串繁琐不方便，阅读性差；

### 模板字符串的使用

模板字符串是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量，例子见上。

- **模板字符串中的变量可以用${}来包裹嵌入；**
- **模板字符串中{}中可以写任意表达式；**

- **模板字符串中有反引号需转义**

```js
document.write(`\`字符中需要使用反引号\``)
```

- **模板字符串的空格**

模板字符串的空格和换行都会被保留，如果需要去除空格，则使用trim()方法。

```js
let elInnerhtml =
`
    <h4 class="tit">${article.title}</h4>
    <p>${article.author}</p>
    <p>${article.text.join("<br/>")}<p/>

`trim();

```

- 模板字符串可以嵌套

  [例子](https://ulvoe.com/learn/example/es6/07string.html)：

  ```js
  let books = [
      {
          title:"西游记",
          authour:"吴承恩",
          time:"明",
          kaipianci:"混沌未分天地乱，茫茫渺渺无人见。自从盘古破鸿蒙，开辟从兹清浊辨。覆载群生仰至仁，发明万物皆成善。欲知造化会元功，须看西游释厄传。"
      },
      {
          title:"三国演义",
          authour:"罗贯中",
          time:"明",
          kaipianci:"滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。"
      },
      {
          title:"红楼梦",
          authour:"曹雪芹",
          time:"清",
          kaipianci:"满纸荒唐言，一把辛酸泪！都云作者痴，谁解其中味？"
      },
      {
          title:"水浒传",
          authour:"施耐庵",
          time:"明",
          kaipianci:"试看书林隐处，几多俊逸儒流。虚名薄利不关愁，裁冰及剪雪，谈笑看吴钩。七雄绕绕乱春秋。见成名无数，图形无数，更有那逃名无数。刹时新月下长川，江湖桑田变古路。讶求鱼橼木，拟穷猿择木，恐伤，弓远之曲木，不如且覆掌中杯，再听取新声曲度。"
      }
  ];
  
  let tabHtml = 
  `<table>
      <tr>
          <th>编号</th>
          <th>作品</th>
          <th>作者</th>
          <th>年代</td>
          <th>开篇词</th>
      </tr>
      ${books.map(function(item,index){
          let {title,authour,time,kaipianci} = item;
          return`
          <tr>
              <td>${(index+1+"").padStart(3,"000")}</td>
              <td>${title}</td>
              <td>${authour}</td>
              <td>${time}</td>
              <td>${kaipianci}</td>
          </tr>
      `}).join("")}
  </table>`;
  document.write(tabHtml)
  
  ```

**<font color="red">模板字符串大括里的返回值不是字符串的时候，要转成字符串，踩过的坑啊</font>**

### 引用模板字符串本身

方法一：

```js
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name',  str);
console.log(func('Jack'))
```

解读：

Function类语法

```js
var function_name = new function(arg1, arg2, ..., argN, function_body)
```

最后一个参数是函数，但是这些参数必须是字符串类型，所以`str`就是一个函数的主题，这里函数的返回值是模板字符串`Hello ${name}`,这里的`name`是这个类的一个参数，所以调用

方法二：

```js
	let str = '(name) => `Hello ${name}!`';
    let func = eval.call(null, str);
    func('Jack') // "Hello Jack!"
```

