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

必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。在 JavaScript 里，你可以使用 `arguments` 来访问所有传入的参数。

在 TypeScript 里，你可以把所有参数收集到一个变量里：

```typescript
function buildName(firstName: string, ...restOfName: string[]): string {
  return firstName + ' ' + restOfName.join(' ')
}

let employeeName = buildName('Joseph', 'Samuel', 'Lucas', 'MacKinzie')
```

剩余参数会被当做个数不限的可选参数。可以一个都没有，同样也可以有任意个。编译器创建参数数组，名字是你在省略号 (`...`) 后面给定的名字，你可以在函数体内使用这个数组。

这个省略号也会在带有剩余参数的函数类型定义上使用到：

```typescript
function buildName(firstName: string, ...restOfName: string[]): string {
  return firstName + ' ' + restOfName.join(' ')
}

let buildNameFun (fname: string, ...rest: string[]) => string = buildName
```

## this

学习如何在 JavaScript 里正确使用 `this` 就好比一场成年礼。由于 TypeScript 是 JavaScript 的超集，TypeScript 程序员也需要弄清 `this` 工作机制并且当有 bug 的时候能够找出错误所在。幸运的是，TypeScript 能通知你错误地使用了 `this` 的地方。

### this 和箭头函数

JavaScript里，`this` 的值在函数被调用的时候才会指定。这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当作参数传递的时候。

下面看一个例子：

```typescript
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    return function() {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {suit: this.suits[pickedSuit], card: pickedCard % 13}
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit);
```

可以看到 `createCardPicker` 是个函数，并且它又返回了一个函数。如果我们尝试运行这个程序，会发现它并没有输出而是报错了。因为 `createCardPicker` 返回的函数里的 `this` 被设置成了 `global` 而不是 `deck` 对象。因为我们只是独立的调用了 `cardPicker()`。顶级的非方法式调用会将 `this` 视为 `global`。

为了解决这个问题，我们可以在函数被返回时就绑好正确的`this`。这样的话，无论之后怎么使用它，都会引用绑定的`deck`对象。我们需要改变函数表达式来使用 ECMAScript 6 箭头语法。箭头函数能保存函数创建时的 `this` 值，而不是调用时的值：

```typescript
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    // 注意：这里使用箭头函数
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {suit: this.suits[pickedSuit], card: pickedCard % 13}
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit);
```

### this 参数

在上述的例子中 `this.suits[pickedSuit]` 的类型为 `any`，这是因为 `this` 来自对象字面量里的函数表达式。修改的方法是，提供一个显式的 `this` 参数。`this` 参数是个假的参数，它出现在参数列表的最前面。

```typescript
function f(this: void) {
  // 确保 "this" 在此独立函数中不可用
}
```

让我们往例子里添加一些接口，`Card` 和 `Deck`，让类型重用能够变得清晰简单些：

```typescript
interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]

  createCardPicker (this: Deck): () => Card
}

let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    // NOTE: 函数现在显式指定其被调用方必须是 deck 类型
    createCardPicker: function (this: Deck) {
      return () => {
        let pickedCard = Math.floor(Math.random() * 52)
        let pickedSuit = Math.floor(pickedCard / 13)

        return {suit: this.suits[pickedSuit], card: pickedCard % 13}
      }
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit);
```

现在 TypeScript 知道 `createCardPicker` 期望在某个 `Deck` 对象上调用。也就是说 `this` 是 `Deck` 类型的，而非 `any`。

### this 参数在回调函数里

## 重载

