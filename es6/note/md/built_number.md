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

判断这个数值是否在最打值和最小值之间（不含最大最小值，没碰到实际应用中）

**最小值：-2的53次方**  Number.MIN_SAFE_INTEGER

**最大值：2的53次方**  Number.MAX_SAFE_INTEGER

```
const minNum = Number.MIN_SAFE_INTEGER -1;

console.log(Number.isSafeInteger(minNum)) //false

const maxNum = Number.MAX_SAFE_INTEGER + 1;

console.log(Number.isSafeInteger(maxNum)) //false

console.log(minNum + maxNum); //0
```

