# class语法糖

ES6的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```js
  class F{
      constructor(x,y){
          this.x = x;
          this.y = y;
      }
      run(){
        return this.x+this.y
      }
  }
  let f = new F(5,8);
  console.log(f.run());
```

**注意**

定义“类”的方法的时候，前面不需要加上`function`这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

使用的时候，也是直接对类使用`new`命令，跟构造函数的用法完全一致。

### constructor方法

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。

一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

## Class的继承

Class之间可以通过`extends`关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

```js
class ColorPoint extends Point {}
```

上面代码定义了一个`ColorPoint`类，该类通过`extends`关键字，继承了`Point`类的所有属性和方法。

但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个`Point`类。