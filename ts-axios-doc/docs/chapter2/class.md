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

在 TypeScript 里，我们可以使用常用的面向对象模式。基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

看下面的例子：

```typescript
class Animal {
  move(distance: number = 0) {
    console.log(`Animal moved ${distance}m.`)
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.bark()
dog.move(10)
```

这个例子展示了最基本的继承：类从基类中继承了属性和方法。这里，`Dog` 是一个 派生类，它派生自 `Animal` 基类，通过 `extends` 关键字。派生类通常被称作 *子类*，基类通常被称作 *超类*。

因为 `Dog` 继承了 `Animal` 的功能，因此我们可以创建一个 `Dog` 的实例，它能够 `bark()` 和 `move()`。

下面我们来看个更加复杂的例子。

```typescript
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distance: number = 5) {
    console.log('Slithering...')
    super.move(distance)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distance: number = 45) {
    console.log('Galloping...')
    super.move(distance)
  }
}

let sam = new Snake('Sammy')
let tom: Animal = new Horse('Tommy')

sam.move()
tom.move(34)
```

这个例子展示了一些上面没有提到的特性。这一次，我们使用 `extends` 关键字创建了 Animal 的两个子类: `Horse` 和 `Snake`。

与前一个例子的不同点是，派生类包含了一个构造函数，它必须调用 `super()`，它会执行基类的构造函数。而且，在构造函数里访问 `this` 的属性之前，我们一定要调用 `super()`。这个是 TypeScript 强制执行的一条重要规则。

这个例子演示了如何在子类里可以重写父类的方法。`Snake` 类和 `Horse` 类都创建了 `move` 方法，它们重写了从 `Animal` 继承来的 `move` 方法，使得 `move` 方法根据不同的类而具有不同的功能。注意，即使 `tom` 被声明为 `Animal` 类型，但因为它的值是 `Horse`,调用 `tom.move(34)` 时，它会调用 `Horse` 里重写的方法。

```
Slithering...
Sammy moved 5m
Galloping...
Tommy moved 34m.
```

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