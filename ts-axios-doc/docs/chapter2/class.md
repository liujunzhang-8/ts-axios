# 类

对于传统的 JavaScript 程序我们会使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员使用这些语法就有些棘手，因为他们使用的是基于类的继承并且对象是由类构建出来的。从 ECMAScript 2015，也就是 ES6 开始，JavaScript 程序员将能够使用基于类的面向对象的方式。使用 TypeScript，我们允许开发者现在就使用这些特性，并且编译后的 JavaScript 可以在所有主流浏览器和平台上运行，而不需要等到下个 JavaScript 版本。

## 基本示例

下面看一个使用类的例子:

```typescript
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter('world')
```

如果你使用过 C# 或 Java，你会对这种语法非常熟悉。我们声明一个 `Greeter` 类。这个类有 3 个成员：一个叫做 `greeting` 的属性，一个构造函数和一个 `greet` 方法。

你会注意到，我们引用任何一个类成员的时候都用了 `this`。它表示我们访问的是类的成员。

最后一行，我们使用 `new` 构造了 `Greeter` 类的一个实例。它会调用之前定义的构造函数，创建一个 `Greeter` 类型的新对象，并执行构造函数初始化它。

## 继承

## 公共，私有与受保护的修饰符

### 默认为 public

### 理解 private

### 理解 protected

## readonly 修饰符

### 参数属性

## 存取器

## 静态属性

## 抽象类

## 高级技巧

### 构造函数

### 把类当作接口使用