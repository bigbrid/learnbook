# 指令

练习指令之前，先用npm把vue下载下来

```
npm install vue
```

## 初始化

```
 //构建实例 viewmodel
 var  vm = new Vue({  
     el:"#app",  //挂载元素   
     data:{     //数据对象 model
    	 message :"hello word"
     }
 })
```

这是vm实例就是viewmodel,data就是数据对象，然后通过`{{message}}`展示在视图层；

## 数据的双向绑定

### v-model

```

html：
<div id="app">
	{{message}}
	<input type="text" name="" id="" v-model="message">
</div>

script:
 var  vm = new Vue({  
     el:"#app",  //挂载元素   
     data:{     //数据对象 model
    	 message :"hello word"
     }
 })
```

### v-model的修饰符

#### .lazy 表单类发生change事件时绑定数据

```
 <div id="app">
     {{message}}
     <input type="text" name="" id="" v-model.lazy="message" @change="inputChange">
 </div>
```

#### .number

可以直接得到的是number类型的数字

```
 <div id="app">
     {{age}}
     <input type="number" name="" id="" v-model.number="age" @change="onChange">
 </div>
 <script>
 var  vm = new Vue({  
         el:"#app", 
         data:{     
        	 age :100
         },
         methods: {
        	 onChange:function(){
        	 	console.log(typeof this.age);  //number
        	 }
         }

	})	
</script>

```

#### .trim

过滤空白字符

```
<input type="text" name="" id="" v-model.trim="username">
```

## 渲染数据一次

### v-once

只渲染元素和组件**一次**，重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

```
 <div id="app">
	 {{message}}
     <p v-once="message">{{message}}</p>
     <input type="text" name="" id="" v-model="message">
 </div>
 <script>
 var  vm = new Vue({  
         el:"#app", 
         data:{     
            message :"你大爷 "
         }	

	})	
</script>
```

## 条件渲染

### v-if

根据表达式来添加或删除元素，其条件为boolen；

```
<div id="app">
    <p v-if="show">显示</p>
    <p v-if="!hide">显示</p>
    <p v-if="hide">不显示</p>
</div>
<script>
var  vm = new Vue({  
    el:"#app", 
    data:{     
    show:true,
    hide:false,
   		message :"你大爷 "
    }
})	
</script>

```

vue中进行数据绑定也完全支持JavaScript表达式支持，这些表达式会在Vue实例的数据作用域下作为JavaScript被解析。但是，每个绑定都只能包含单个表达式，否则不会生效。

### v-else和v-if-else

多层的条件渲染

```
<div id="app">
    <p v-if="age < 18">好好学习，天天向上</p>
    <p v-else-if="age == 18">这个是很好的年纪</p>
    <p v-else>可以随意挥霍了</p>    
</div>
<script>
    var  vm = new Vue({  
        el:"#app", 
        data:{     
            age:19
        }

    })	
</script>
```

## 显示隐藏

### v-show

控制元素的显示与隐藏，指通过css,display来控制元素的隐藏与显示；

```
<div id="app">
    <p v-show="age < 18">孩子，好好学习，天天向上</p>
    <p v-show="age===18">真好，花一样的年纪</p>
    <p v-show="age > 18">爱咋的咋的把</p>

</div>
<script>
    var  vm = new Vue({  
        el:"#app", 
        data:{     
            age:19
        }	
    })	
</script>
```

### v-show和v-if的区别：

v-if 是真实的条件渲染，因为它会确保条件块在切换当中适当地销毁与重建条件块内的事件监听器和子组件； v-show 则只是简单地基于 CSS 切换。

v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换使用 v-show 较好，如果在运行时条件不大可能改变则使用 v-if 较好。

## 数据渲染

### v-for

类似与遍历数据，然后渲染在视图层。

**特定语法：(item, index) in items**

**v-for的优先级别高于v-if之类的其他指令**

```
<style>
    *{margin: 0;padding: 0;}
    table{width: 1000px;height: 600px;margin: 0 auto;}
    table td{width: 100px;}
    table td:last-child{width: auto;}
</style>
<div id="app">
    <table>
        <tr v-for="(item, index) in books" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.title}}</td>
            <td>{{item.authour}}</td>
            <td>{{item.time}}</td>
            <td>{{item.kaipianci}}</td>
        </tr>
    </table>
</div>
<script>
var  vm = new Vue({  
    el:"#app", 
    data:{
        books:[
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
        ]
    }

})	
</script>
```

v-for 默认行为试着不改变整体，而是替换元素。迫使其重新排序的元素,您需要提供一个 key 的特殊属性，如上。

另外v-for也可以为数组索引指定别名（或者用于对象的键）：

```
<div v-for="(item, index) in items"></div>

<div v-for="(val, key) in object"></div>

<div v-for="(val, key, index) in object"></div>

```

## 绑定

### v-bind

动态地绑定一个或多个特性，或一个组件 prop 到表达式。v-bind指令可以在其名称后面带一个参数，中间用一个冒号隔开。这个参数通常是HTML元素的特性（attribute）；

缩写： `:`

```
<div id="app">
 	 <img :src="imgsrc" :alt="alt" :id="id" :class="classname" :style="style"/>
</div>
<script>
    var  vm = new Vue({  
            el:"#app",   
            data:{
                id:"img",  //绑定id
                alt:"图片呀",  //绑定说明
                imgsrc:"https://cn.vuejs.org/images/logo.png",  //绑定url
            	classname:[".class1",".class2"],  //多项绑定 数组
            	style:{                          //多项绑定 对象
                    "display":"block",
                    "zIndex":"1"
                }
        	}
    	})
</script>
```

例子：给列表添加选中色

```
   <style>
       ul,li{list-style: none;}
       ul{width: 400px;display: flex;justify-content: space-between;}
       li{float: left;padding: 5px 20px;border: 1px solid #ccc;cursor: pointer}
       li.cur{background: red;color: #fff;}
   </style>
   <div id="app">
        <ul>
            <li v-for="(item, index) in books" :key="index" :class="index==0?'cur':''">
                {{item}}
            </li>
        </ul>

   </div>
   <script>
          var  vm = new Vue({  
                el:"#app", 
                data:{
                    books:["红楼梦","西游记","三国演义","水浒传"]
                }
            })
   </script>
```

## 插入字符串

### v-text

同`{{}}`用法

## 插入html

### v-html

插入HTML字符串

```
 <div id="app" v-html="message"></div>
 <script>
 var  vm = new Vue({  
     el:"#app", 
     data:{
     	message:"<p>HTML</p>"
     }
 })
 </script>
 //查看元素div中一个内容为HTML的P标签
```

注意：在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。只在可信内容上使用 `v-html`，**永不**用在用户提交的内容上。；



## 事件处理器

### methods 

在vue实例中，方法中的this指向该实例。

**注意，不能用箭头函数来定义methods中的函数**

```
var  vm = new Vue({  
    el:"#app", 
    data:{},
    methods: {
        fn:function(){
        	console.log(this) //这里的this指向的是vm这个实例
        }
    }
})
```



## 绑定事件监听

### v-on

缩写：@ 

动态地绑定一个或多个特性（方法），或一个组件 prop 到表达式；其作用和v-bind类似。

注意：如果用在普通元素上时，只能监听 原生 DOM 事件；但是如果用在自定义元素组件上时，也可以监听子组件触发的自定义事件。

### 修饰符

- `.stop` - 调用 `event.stopPropagation()`。
- `.prevent` - 调用 `event.preventDefault()`。
- `.capture` - 添加事件侦听器时使用 capture 模式。
- `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
- `.native` - 监听组件根元素的原生事件。
- `.once` - 只触发一次回调。
- `.left` - (2.2.0) 只当点击鼠标左键时触发。
- `.right` - (2.2.0) 只当点击鼠标右键时触发。
- `.middle` - (2.2.0) 只当点击鼠标中键时触发。
- `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器

```
	<div id="app">
        <button v-on:click="handle">基本绑定</button>
        <button @click="handle">缩写绑定</button>
        <button @click="function(){alert(0)}">内联语句</button>
        <button @[ev]="handle">动态事件绑定</button> 
        <button @click.stop="handle">停止冒泡</button>
        <button @click.prevent="handle">阻止默认行为</button>
        <button @click.prevent.stop="handle">串联</button>
        <button @click.once="handle">只能触发一次</button>
        <input @keyup.enter="handle" type="text" placeholder="输入完毕敲回车触发事件">
        <input @keyup.13="handle" type="text" placeholder="输入完毕敲回车触发事件" >
        <p>还有其他不一一测试饿了，大概也就这样子</p>
    </div>
    <script>
        var  vm = new Vue({  
            el:"#app", 
            data:{
              ev:"mouseover",
              message:"一些数据"  
            },
            methods: {
                handle:function(event){
                    console.log(event);
                    alert(this.message)
                }
            }
        })
    </script>
```

**案例**

1. [四大名著](https://ulvoe.com/Learning/example/vue/books1.html)
2. [中国古典文学管理](https://ulvoe.com/Learning/example/vue/books2.html)

