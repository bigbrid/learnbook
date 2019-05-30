# map数据结构

JavaScript的对象（Object），本质上是键值对的集合（Hash结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

它类似于对象，也是键值对的集合，**但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键**。也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。

```js
new Map()
```

### 实例的属性

**size属性**

返回map结构的成员总数

```js
let m = new Map();
console.log(m.size);
```

### 方法

**set(key, value)**

`set`方法设置`key`所对应的键值，然后返回整个Map结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。

```js
  let m = new Map();
  m.set("x","x"); //键是字符串
  m.set(1,"x"); //键是数字
  m.set(["x"],"x"); //键是数组
  m.set({},"x");  //键是对象
  console.log(m);
```

`set`方法返回的是Map本身，因此可以采用链式写法。

```js
 
 let m = new Map().set("x","x").set(1,"x").set(["x"],"x").set({},"x");  
 
```

**get(key)**

读取键所对应的值

没有则返回undefind

```js

console.log(m.get(1));
 
```

**has(key)**

返回布尔值，key是否在Map的数据结构中；



**delete(key)**

删除某个键，成功返回true。删除失败，返回false。

**clear()**

清除所有成员，没有返回值。

### 遍历方法

Map原生提供三个遍历器生成函数和一个遍历方法。

- `keys()`：返回键名的遍历器。
- `values()`：返回键值的遍历器。
- `entries()`：返回所有成员的遍历器。
- `forEach()`：遍历Map的所有成员。

需要特别注意的是，Map的遍历顺序就是插入顺序。

### 与其他数据结构的互相转换

**（1）Map转为数组**

前面已经提过，Map转为数组最方便的方法，就是使用扩展运算符（...）。

```javascript
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

**（2）数组转为Map**

将数组转入Map构造函数，就可以转为Map。

```javascript
new Map([[true, 7], [{foo: 3}, ['abc']]])
// Map {true => 7, Object {foo: 3} => ['abc']}
```

**（3）Map转为对象**

如果所有Map的键都是字符串，它可以转为对象。

```javascript
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

**（4）对象转为Map**

```javascript
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// [ [ 'yes', true ], [ 'no', false ] ]
```

**（5）Map转为JSON**

Map转为JSON要区分两种情况。一种情况是，Map的键名都是字符串，这时可以选择转为对象JSON。

```javascript
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```

另一种情况是，Map的键名有非字符串，这时可以选择转为数组JSON。

```javascript
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

**（6）JSON转为Map**

JSON转为Map，正常情况下，所有键名都是字符串。

```javascript
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes":true,"no":false}')
// Map {'yes' => true, 'no' => false}
```

但是，有一种特殊情况，整个JSON就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为Map。这往往是数组转为JSON的逆操作。

```javascript
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```