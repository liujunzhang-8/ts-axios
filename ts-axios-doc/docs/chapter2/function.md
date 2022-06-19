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

```javascript
let z = 100

function addToZ(x, y) {
  return x + y + z
}
```

## 函数类型

### 为函数定义类型

让我们为上面那个函数添加类型：

```typescript
function add(x: number, y: number): number {
  return x + y
}

let myAdd = function(x: number, y: number): number {
  return x + y
}
```

我们可以给每个参数添加类型之后再为函数本身添加返回值类型。Typescript 能够根据返回语句自动推断出返回值类型。

### 书写完整函数类型

现在我们已经为函数指定了类型，下面让我们写出函数的完整类型。

```typescript
let myAdd: (x: number, y: number) => number = 
function(x: number, y: number): number {
  return x + y
}
```

函数类型包含两部分：参数类型和返回值类型。当写出完整函数类型的时候，这两部分都是需要的。我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。这个名字只是为了增加可读性。我们也可以这么写：

```typescript
let myAdd: (baseValue: number, increment: number) => number =
function(x: number, y: number): number {
  return x + y
}
```

只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。

第二部分是返回值类型。对于返回值，我们在函数和返回值类型之前使用(`=>`)符号，使之清晰明了。如之前提到的，返回值类型是函数类型的必要部分，如果函数没有返回任何值，你也必须指定返回值类型为 `void` 而不能留空。

函数的类型只是由参数类型和返回值组成的。函数中使用的捕获变量不会体现在类型里。实际上，这些变量是函数的隐藏状态并不是组成 API 的一部分。

### 推断类型

尝试这个例子的时候，你会发现如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript 编译器会自动识别出类型：

```typescript
let myAdd = function(x: number, y: number): number {
  return x + y
}

let myAdd: (baseValue: number, increment: number) => number =
function(x, y) {
  return x + y
}
```

这叫做"按上下文归类"，是类型推论的一种。它帮助我们更好地为程序指定类型。

## 可选参数和默认参数

TypeScript 里的每个函数参数都是必须的。这不是指不能传递 `null` 或 `undefined` 作为参数，而是说编译器检查用户是否为每个参数都传入了值。编译器还会假设只有这些参数会被传递进函数。简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。

```typescript
function buildName(firstName: string, lastName: string) {
  return firstName + ' ' + lastName;
}

let result1 = buildName('Bob')  // Error, 参数过少
let result2 = buildName('Bob', 'Adams', 'Sr.'); // Error, 参数过多
let result3 = buildName('Bob', 'Adams'); // OK
```

JavaScript 里，每个参数都是可选的，可传可不传。没传参的时候，它的值就是 `undefined`。在 TypeScript 里我们可以在参数名旁使用 `?` 实现可选参数的功能。比如，我们想让 `lastName` 是可选的：

```typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName
  }
}

let result1 = buildName('Bob')  // 现在正常了
let result2 = buildName('Bob', 'Adams', 'Sr.'); // Error, 参数过多
let result3 = buildName('Bob', 'Adams'); // OK
```

可选参数必须跟在必须参数后面。如果上例我们想让 `firstName` 是可选的，那么就必须调整它们的位置，把 `firstName` 放在后面。

在 TypeScript 里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是`undefined` 时。它们叫做有默认初始化值的参数。让我们修改上例，把 `lastName` 的默认值设置为 `"Smith"`。

```typescript
function buildName(firstName: string, lastName = 'Smith'): string {
  return firstName + ' ' + lastName;
}

let result1 = buildName('Bob')  // 返回 "Bob Smith"
let result2 = buildName('Bob', undefined); // 正常，同样 "Bob Smith"
let result3 = buildName('Bob', 'Adams', 'Sr.'); // 错误，参数过多
let result4 = buildName('Bob', 'Adams'); // OK
```

与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。如果带默认值的参数出现在必须参数前面，用户必须明确的传入`undefined` 值来获得默认值。例如，我们重写最后一个例子，让 `firstName` 是带默认值的参数：

```typescript
function buildName(firstName = 'Will', lastName: string): string {
  return firstName + ' ' + lastName;
}

let result1 = buildName('Bob')  // Error，参数过少
let result3 = buildName('Bob', 'Adams', 'Sr.'); // Error, 参数过多
let result3 = buildName('Bob', 'Adams'); // OK，返回 "Bob Adams"
let result4 = buildName(undefined, 'Adams'); // OK，返回 "Will Adams"
```

### 剩余参数

## this

### this 和箭头函数

### this 参数

### this 参数在回调函数里

## 重载

