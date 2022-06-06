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

在命令行上，通过 Node.js 运行这段代码：

```bash
node greeter.js
```

控制台输出：

```
Hello, Gorgio
```

## 类型注解

接下来让我们看看 TypeScript 工具带来的高级功能。给 `person` 函数的参数添加 `: string` 类型注解，如下：

```typescript
function greeter (person: string) {
  return 'Hello, ' + person
}

let user = 'Gorgio'

console.log(greeter(user))
```

TypeScript 里的类型注解是一种轻量级的为函数或变量添加约束的方式。在这个例子里，我们希望 `greeter` 函数接收一个字符串参数。然后尝试把 `greeter` 的调用改成传入一个数组：

```typescript
function greeter (person: string) {
  return 'Hello, ' + person
}

let user = [0, 1, 2]

console.log(greeter(user))
```

重新编译，你会看到产生了一个错误：

```
error TS2345: Argument of type 'number[]' is not assignable to prameter of type 'string'.
```

类似地，尝试删除 `greeter` 调用的所有参数。 TypeScript 会告诉你使用了非期望个数的参数调用了这个函数。在这两种情况中，TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

要注意的是尽管有错误，`greeter.js` 文件还是被创建了。就算你的代码里有错误，你仍然可以使用 TypeScript。但在这种情况下，TypeScript 会警告你代码可能不会按预期执行。

## 接口

## 类

## 总结