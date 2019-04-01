# 数值的扩展
## Number的扩展

### Number.isFinite(n)

检测数值是否有限，返回值为布尔值

**与传统isFinite(any)的对比:**

传统方法会先any转化为数值，如果转化为非数字返回false；

此方法不进行转化，n为非数字是直接返回false.

```
//传统方法
console.log(isFinite("10"));//true 
console.log(isFinite("10岁")); //false
console.log(isFinite(10)); //true

//新增方法
console.log(Number.isFinite("10")); //false
console.log(Number.isFinite("10岁")); //false
console.log(Number.isFinite(10));//true
```

### Number.isNAN(n)

检测数值是否为NAN，返回值为布尔值

**与传统isNAN(any)的对比:**

传统方法会先any是否是NAN，如果转化为NAN后返回true；

此方法不进行转化，不是NAN是直接返回false.

```
// Number.isNAN()
console.log(isNaN(NaN));  //true
console.log(isNaN("NaN")); //true

//新增方法
console.log(Number.isNaN(NaN));  //true
console.log(Number.isNaN("NaN")); //false
```

### Number.parseInt()

与parselnt()一样

```
console.log(Number.parseInt===parseInt)  //true
```



### Number.parseFloat()

与parseFloat()一样

```
console.log(Number.parseFloat===parseFloat) //true
```

### Number.isInteger(n)

判断数字是否是整数

```
console.log(Number.isInteger(-1)) //true
console.log(Number.isInteger("0")) //false
console.log(Number.isInteger(0))//true
console.log(Number.isInteger(1))//true
```

### Number.isSafeInteger(n)

判断这个数值是否在最打值和最小值之间（不含最大最小值，在实际应用中没遇到）

**最小值：-2的53次方**  Number.MIN_SAFE_INTEGER

**最大值：2的53次方**  Number.MAX_SAFE_INTEGER

```
const minNum = Number.MIN_SAFE_INTEGER -1;

console.log(Number.isSafeInteger(minNum)) //false

const maxNum = Number.MAX_SAFE_INTEGER + 1;

console.log(Number.isSafeInteger(maxNum)) //false

console.log(minNum + maxNum); //0
```



### Number.EPSILON

表示一个常量，可以看作是javascript的最小精度





## Math的扩展

看文档的时候看到新增了17个新的静态方法，有点晕。。。。

### Math.trunc()

去除数字的小数部分。

1. 对于非数值，`Math.trunc`内部使用`Number`方法将其先转为数值。
2. 对于空值和无法截取整数的值，返回`NaN`。
3. 对于没有部署这个方法的环境，可以用下面的代码模拟，或使用其他方法；

```
console.log(Math.trunc()); //NAN 
console.log(Math.trunc(10.3));  //10
console.log(Math.trunc("10.3")); //10
console.log(Math.trunc("bigbrid")); //NAN
//模拟方法
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};
```

### Math.sign()

它会返回五种值。

- 参数为正数，返回`+1`；
- 参数为负数，返回`-1`；
- 参数为 0，返回`0`；
- 参数为-0，返回`-0`;
- 其他值，返回`NaN`。

### Math.cbrt()

计算一个数的立方根

```
console.log(Math.cbrt(8)); //2
```

### Math.clz32()

将参数转为32位无符号整数的形式

### Math.imul()

返回两个数以 32 位带符号整数形式相乘的结果

### Math.fround()

返回一个数的32位单精度浮点数形式

### Math.hypot()

方法返回所有参数的平方和的平方根。

参数不是数值，`Math.hypot`方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN。

```
 console.log(Math.hypot(3,4));  //5
 console.log(Math.hypot(3,8,6));  //10.44030650891055
 console.log(Math.hypot("sss")); //NAN
```

