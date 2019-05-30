# global对象

ES5的顶层对象，本身也是一个问题，因为它在各种实现里面是不统一的。

- 浏览器里面，顶层对象是`window`，但 Node 和 Web Worker 没有`window`。
- 浏览器和 Web Worker 里面，`self`也指向顶层对象，但是Node没有`self`。
- Node 里面，顶层对象是`global`，但其他环境都不支持。



同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用`this`变量，但是有局限性。

- 全局环境中，`this`会返回顶层对象。但是，Node模块和ES6模块中，`this`返回的是当前模块。
- 函数里面的`this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this`会指向顶层对象。但是，严格模式下，这时`this`会返回`undefined`。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了CSP（Content Security Policy，内容安全政策），那么`eval`、`new Function`这些方法都可能无法使用。



综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。

```js
/ 方法一
(typeof window !== 'undefined'
? window
    : (typeof process === 'object' &&
    typeof require === 'function' &&
    typeof global === 'object')
    ? global
: this);

// 方法二
var getGlobal = function () {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
};
```

现在有一个[提案](https://github.com/tc39/proposal-global)，在语言标准的层面，引入`global`作为顶层对象。也就是说，在所有环境下，`global`都是存在的，都可以从它拿到顶层对象。

垫片库[`system.global`](https://github.com/ljharb/System.global)模拟了这个提案，可以在所有环境拿到`global`。

```javascript
// CommonJS的写法
require('system.global/shim')();

// ES6模块的写法
import shim from 'system.global/shim'; shim();
```

上面代码可以保证各种环境里面，`global`对象都是存在的。

```javascript
// CommonJS的写法
var global = require('system.global')();

// ES6模块的写法
import getGlobal from 'system.global';
const global = getGlobal();
```

上面代码将顶层对象放入变量`global`。
[本节引用](http://caibaojian.com/es6/let.html)









​	浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
​	浏览器和 Web Worker 里面，self也指向顶层对象，但是Node没有self。
​	Node 里面，顶层对象是global，但其他环境都不支持。