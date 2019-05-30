# symbol类型

Symbol值通过`Symbol`函数生成。

```js
let s = Symbol();
console.log(s);
```

注意，`Symbol`函数前不能使用`new`命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象。也就是说，由于Symbol值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

`Symbol`函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```js
 Symbol("这个symbol的描述");
```

如果 Symbol 的参数是一个对象，就会调用该对象的`toString`方法，将其转为字符串，然后才生成一个 Symbol 值。



## 作为属性名的Symbol

由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

写法

```js
// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
```

**注意，Symbol值作为对象属性名时，不能用点运算符。**

```js
 let mySymbol = Symbol();
 let o = {};
 o[mySymbol] = 10;
 console.log(o[mySymbol]); // 10
 console.log(o.mySymbol); //undefined
```

## 属性名的遍历

Symbol 作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。

但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols`方法，可以获取指定对象的所有 Symbol 属性名。

```js
 let s1 = Symbol("s1");
 let s2 = Symbol("s2");
 let o = {x:"xx"};
 o[s1]="wang";
 o[s2]="wang";
 for (const key in o) {
     console.log(o[key]); //无法找到symbol
  }
  
  Object.getOwnPropertySymbols(o)  //[Symbol(s1), Symbol(s2)]
  
```

另一个新的API，`Reflect.ownKeys`方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

```js
Reflect.ownKeys(Object)
```

## `Symbol.for(),Symbol.keyFor()`

有时，我们希望重新使用同一个Symbol值，`Symbol.for`方法可以做到这一点。

```js

let s1 = Symbol.for("x");
let s2 = Symbol.for("x");
console.log(s1===s2);

```

`Symbol.keyFor`方法返回一个已登记的 Symbol 类型值的`key`。

```js
 
  let s1 = Symbol.for("x");
 console.log(Symbol.keyFor(s1)); //x
 
```

