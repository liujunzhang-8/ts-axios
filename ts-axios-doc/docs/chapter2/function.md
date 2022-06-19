# 函数

函数是 JavaScript 应用程序的基础，它帮助你实现抽象层，模拟类，信息隐藏和模块。在 TypeScript 里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义行为的地方。Typescript 为 JavaScript 函数添加了额外的功能，让我们可以更容易地使用。

## 基本示例

和 JavaScript 一样，TypeScript 函数可以创建有名字的函数和匿名函数。你可以随意选择适合应用程序的方式，不论是定义一系列 API 函数还是只使用一次的函数。

通过下面的例子可以迅速回想起这两种 JavaScript 中的函数：

```JavaScript
// 命名函数
function  add(x, y) {
  return x + y
}

// 匿名函数
let myAdd = function(x, y) {
  return x + y;
}
```

在 JavaScript 里，函数可以使用函数体外部的变量。当函数这么做时，我们说它'捕获'了这些变量。至于为什么可以这样做以及其中的利弊超出了本文的范围，但是深刻理解这个机制对学习 JavaScript 和 TypeScript 会很有帮助。

```javaScript
let z = 100

function addToZ(x, y) {
  return x + y + z
}
```

## 函数类型

### 为函数定义类型

### 书写完整函数类型

### 推断类型

## 可选参数和默认参数

### 剩余参数

## this

### this 和箭头函数

### this 参数

### this 参数在回调函数里

## 重载

