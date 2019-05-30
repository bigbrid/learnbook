# set数据结构

ES6提供了新的数据结构Set。类似数组，但是成员都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成Set数据结构。

```js
 let a = [1,1,1,5,3,8,7,9,5,4,6,2,22,2,2,2,2,2,2,3,3,3,3,3,3,33,1,1,1,1,1,1,11,];
 let s = new Set(a);
 console.log(a);
 console.log(s);
```

### Set实例的属性和方法

**属性**

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数。

- `Set.prototype.size`：返回`Set`实例的成员总数。

  ```js
  console.log(s.constructor);
  console.log(s.size);
  ```

  

**方法**

- `add(value)`：添加某个值，返回Set结构本身。
- `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `clear()`：清除所有成员，没有返回值。

```js
let s = new Set();
s.add(1);
s.add(2)
s.add(1)
s.add("1")
console.log(s.delete("1")); //true  删除成功
console.log(s.has("s")); //false 没有这一项
console.log(s.has(1));  //true  包含这一项
s.clear() //清除
console.log(s);
```



**遍历方法**

- `keys()`：返回键名的遍历器

- `values()`：返回键值的遍历器

- `entries()`：返回键值对的遍历器

- `forEach()`：使用回调函数遍历每个成员

  **与数组方法类似**

