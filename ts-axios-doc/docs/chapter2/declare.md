# 变量声明

`let` 和 `const` 是 JavaScript 里相对较新的变量声明方式。`let` 在很多方面与 `var` 是相似的，但是可以帮助大家避免在 JavaScript 里常见一些问题。`const` 是对 `let` 的一个增强，它能阻止对一个变量再次赋值。

因为 TypeScript 是 JavaScript 的超集，所以它本身就支持 `let` 和 `const` 。下面我们会详细说明这些新的声明方式以及为什么推荐使用它们来代替 `var`。

如果你已经对 `var` 声明的怪异之处了如指掌，那么你可以轻松地略过这节。

## var 声明

在 ES5 的时代，我们都是通过 `var` 关键字定义JavaScript 变量：

```javascript
var a = 10
```

大家都能理解，这里定义了一个名为 `a` 值为 `10` 的变量。

我们也可以在函数内部定义变量：

```javascript
function f() {
  var message = 'Hello World!'

  return message
}
```

并且我们也可以在其它函数内部访问相同的变量：

```javascript
function f() {
  var a = 10
  return function g() {
    var b = a + 1
    return b
  }
}

var g = f()
g() // return 11
```

上面的例子是一个典型的闭包场景，`g` 可以获取到 `f` 函数里定义的 `a` 变量。每当 `g` 被调用时，它都可以访问到 `f` 里的 `a` 变量。即使当 `g` 在 `f` 已经执行完后才被调用，它仍然可以访问 `a`。

### 作用域规则

### 捕获变量怪异之处

## let 声明

### 块作用域

### 重定义及屏蔽

### 块级作用域变量的获取

## const 声明

## let vs const

## 解构

### 解构数组

### 对象解构

### 属性重命名

### 默认值

### 函数声明

## 展开
