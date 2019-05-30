# 基础

## 注释

好的注释可以让我们和别人更加快速的读懂代码

- /**/使用css原生的注释，会被编译在css文件中；
- //使用less提供的注释，不会编译在css文件中；（和js中的单行注释一样）

```less
/*会被编译在css文件中 */
//这一行注释不会被编译在css中
```



## 变量

通常情况下，在css里重复相同的值是很常见的了；

```css
.a{display: block}
.b{display: block}
```

当然也可以固定一个专属这个属性的类，但是难免有些冗杂繁琐。使用less，在less中没，我们可以定义变量，减少重复，冗杂的值，甚至更多；

### 值变量

```less
@width:100%;
@fontsize:12px;
@bgColor-red:red;
@bgColor-green:blue;
@color:#fff;
html,body{width: @width;}
header,section{width: @width;height:300px;color:@color;}
header{background-color: @bgColor-red;}
section:nth-child(odd){background-color: @bgColor-red;}
section:nth-child(even){background-color: @bgColor-green;}
```

### 选择器变量

让选择器变成动态

```less
@myfullwrap:.wrap;
@{myfullwrap}{
    width: @width;
}
```

也可以先声明，调用的是时候使用合适的选择器类型

```less
@myfullwrap:wrap;
.@{myfullwrap}{
    width: @width;
    color: #ccc;
}
#@{myfullwrap}{
    color: #222222;
}
```

### 定义路径

```less
@ImgUrl:"../img/";
background: url("@{ImgUrl}bz1.jpg") fixed;height: @width;
```



### 属性变量

可减少代码书写量

```less
@bg:background;
@myfullwrap:wrap;
.@{myfullwrap}{
    width: @width;
    height: @width;
    color: #ccc;
    @{bg}: url("@{ImgUrl}bz1.jpg");
    @{bg}-repeat:no-repeat;
    @{bg}-attachment: fixed;
    @{bg}-position:50% 0;
    
}
```

*<u>变量名 必须使用大括号包裹</u>*



### 声明变量

- 结构: @name: { 属性: 值 ;};
- 使用：@name();

```less
@pa:{position: absolute;};
@pr:{position: relative;};
@myfullwrap:wrap;
.@{myfullwrap}{
    width: @width;
    height: @width;
    color: #ccc;
    @{bg}: url("@{ImgUrl}bz1.jpg");
    @{bg}-repeat:no-repeat;
    @{bg}-attachment: fixed;
    @{bg}-position:50% 0;
    @pr();
}
```

<u>*定义的变量结尾一定要有逗号*</u>



### 变量的运算

less 的变量还可以运算，并且十分强大。

算术运算`+`，`-`，`*`，`/`可以在任意数量，颜色等可变操作上操作；

```less
@fontsize:100px;
header{background-color: @bgColor-red;font-size: @fontsize/10;padding-top: @fontsize/5;}
```



### 变量的作用域

一句话理解就是：**就近原则**

```less
@fontsize:100px;
header{background-color: @bgColor-red;font-size: @fontsize/10;padding-top: @fontsize/5;@fontsize:50px;}
```

这里先定义`fontsize`为`100px`,在`.header`类里又定义一个`fontsize`的值为50；

那么这里会使用值为50的`fontsize`;忽略闭包，这里只**就近取值**；



### 用变量区定义变量

```less
@ImgUrl:"../img/";
@imgName:"bz1.jpg";
@content:{
    @{bg}: url("@{ImgUrl}@{imgName}");
    @{bg}-repeat:no-repeat;
    @{bg}-attachment: fixed;
    @{bg}-position:50% 0;
    @pr();
};
@myfullwrap:wrap;
#@{myfullwrap}{
    color: #222222;
}
@imgName:"bz2.jpg";
.@{myfullwrap}{
    width: @width;
    height: @width;
    color: #ccc;
    @content();
}
```



## 嵌套

在less中，也可以使用像HTML里，结构清晰的嵌套的写法；

我们把上面的less做个修改；

```less
@width:100%;
@fontsize:100px;
@bgColor:red;
@bg:background;
@pa:{position: absolute;};
@pr:{position: relative;};
@ImgUrl:"../img/";
@imgName:"bz1.jpg";
@content:{
    @{bg}: url("@{ImgUrl}@{imgName}");
    @{bg}-repeat:no-repeat;
    @{bg}-attachment: fixed;
    @{bg}-size:100%;
    @{bg}-position:50% 0;
    @pr();
};
html,body{width: @width;}
@myfullwrap:wrap;
@imgName:"bz2.jpg";
.@{myfullwrap}{
    width: @width;
    height: @width;
    color: #ccc;
    @content();
    header,section{width: @width;height:@fontsize*5;}
    header{ @{bg}-color: @bgColor;font-size: @fontsize/10;padding-top: @fontsize/5;}
    section:nth-child(odd){@{bg}-color: @bgColor;}
}

```

### &的妙用

& ：代表的上一层选择器的名字

```less
.@{myfullwrap}{
    width: @width;
    height: @width;
    color: #ccc;
    @content();
    header,section{width: @width;height:@fontsize*5;@pr();color: #fff;}
    header{ @{bg}-color: @bgColor;font-size: @fontsize/10;padding-top: @fontsize/5;}
    section:nth-child(odd){@{bg}-color: @bgColor;}
    &::before{content: "";@pa();width: @width;height: @width;top: 0;left: 0;@{bg}:rgba(255,255,0,0.4);}
    &-tit{width: @width;text-align: center;font-size: @fontsize*0.6;}//带有父级前缀的css,这里为.wrap-tit类；
}

```

### 媒体查询

```less
.@{myfullwrap}{
    width: @width;
    height: @width;
    color: #ccc;
    @content();
    header,section{width: @width;height:@fontsize*5;@pr();color: #fff;}
    header{ @{bg}-color: @bgColor;font-size: @fontsize/10;padding-top: @fontsize/5;}
    section:nth-child(odd){@{bg}-color: @bgColor;}
    &::before{content: "";@pa();width: @width;height: @width;top: 0;left: 0;@{bg}:rgba(255,255,0,0.4);}
    &-tit{width: @width;text-align: center;font-size: @fontsize*0.6;}
    @media screen and(max-width:750px){
        &-tit{font-size: @fontsize*0.4;}
        &::before{@{bg}:rgba(255,255,0,0)}
        @bgColor:rgba(255,0,255,0.5);
        header,section:nth-child(odd){@{bg}-color: @bgColor;}
    }

}
```

唯一的缺点就是 每一个元素都会编译出自己 `@media` 声明，并不会合并。

