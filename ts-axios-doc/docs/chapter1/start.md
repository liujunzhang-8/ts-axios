# 编写第一个 TypeScript 程序

在编辑器中，将下面的代码输入到 getter.ts 文件里：


```javascript
function greeter (person) {
  return 'Hello, ' + person
}

let user = 'Gorgio'

console.log(greeter(user))
```

## 编译代码

我们使用了 `.ts` 扩展名，但是这段代码仅仅是 JavaScript 而已。

在命令行上，运行 TypeScript 编译器：

```bash
tsc greeter.ts
```

输出结果为一个 `greeter.js` 文件，它包含了和输入文件中相同的 JavaScript 代码。

## 类型注解

## 接口

## 类

## 总结