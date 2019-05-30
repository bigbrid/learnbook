# 进阶

## 混合方法

### 无参数方法

方法犹如 声明的集合，使用时 直接键入名称即可。

```less
.content{  // 等价于 .content()
    @{bg}: url("@{ImgUrl}@{imgName}");
    @{bg}-repeat:no-repeat;
    @{bg}-attachment: fixed;
    @{bg}-size:100% 100%;
    @{bg}-position:50% 0;
    @pr();
};
.@{myfullwrap}{
    .content   //等价于.content()
}
```

个人建议，为了避免 代码混淆，应写成 :

```less
.content(){
    
}
{
    .content()
}
```

**要点**：

-  `.` 与 `#` 皆可作为 方法前缀。
- 方法后建议写 `()` 。 



### 参数方法

Less 可以使用默认参数，如果 没有传参数，那么将使用默认参数。

```less
//定义一个阴影类
.boxShadow(@h:5px,@v:5px,@b:10px,@s:10px,@color:rgba(0,0,0,0.5)){
    box-shadow: @arguments//arguments代指所有参数
}
//调用这个方法
header,section{.boxShadow(0px,12px,22px,10px,rgba(255,0,255,0.5))}
```

```less
//定义一个flex的类；
.displayflex(@row:flex-start,@cow:flex-start,@wrap:nowrap){
    display: flex;
    justify-content: @row;
    align-items: @cow;
    flex-wrap: @wrap;
}
//调用这个类
header {
    @{bg}-color: @bgColor;
    font-size: @fontsize/10;
    padding: @fontsize/5 0;

	//实例参数也可以不必要按照定义顺序，通过参数明也可以实例
    .displayflex(space-around,@wrap:wrap);
    .box {
        width: @width*0.4;
        height: @width*0.4;
        @{bg}: rgba(255,255,255,1);
    }
}
```



### 匹配模式

有些类似JS中的面向对象

```less
//定义需要实例化的类
.Boxborder(@_,@width:2px,@style:solid,@color:rgb(0, 255, 64)){
    border-@{_}-width:@width;
    border-@{_}-style: @style;
    border-@{_}-color:@color;
}
//实例这个类
header{
    & .box:nth-of-type(1){.Boxborder(top);.Boxborder(left);}
    & .box:nth-of-type(2){.Boxborder(top);.Boxborder(right);}
    & .box:nth-of-type(3){.Boxborder(bottom);.Boxborder(left);}
    & .box:nth-of-type(4){.Boxborder(bottom);.Boxborder(right);}
}
```

