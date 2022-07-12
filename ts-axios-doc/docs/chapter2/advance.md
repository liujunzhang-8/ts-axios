# 高级类型

## 交叉类型

交叉类型是将多个类型合并为一个类型。这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。例如，`Person & Loggable` 同时是 `Person` 和 `Loggable`。就是说这个类型的对象同时拥有了这两种类型的成员。

我们大多是在混入（mixins）或其它不合适典型面向对象模型的地方看到交叉类型的使用。（在 JavaScript 里发生这种情况的场合很多！）下面是如何创建混入的一个简单例子：

```typescript
function extend<T, U> (first: T, second: U): T & U {
  let result = {} as T & U
  for (let id in first) {
    result[id] = first[id] as any
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      result[id] = second[id] as any
    }
  }
  return result
}

class Person {
  constructor (public name: string) {

  }
}

interface Loggable {
  log(): void
}

class ConsoleLogger implements Loggable {
  log() {
    // ...
  }
}

var jim = extend(new Person('Jim'), new ConsoleLogger())
var n = jim.name
jim.log()
```

## 联合类型

联合类型与交叉类型很有关联，但是使用上却完全不同。偶尔你会遇到这种情况，一个代码库希望传入 `number` 或 `string` 类型的参数。例如下面的函数：

```typescript
function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if(typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}

padLeft('Hello world', 4) // return " Hello world"
```

`padLeft` 存在一个问题，`padding` 参数的类型指定成了 `any`。这就是说我们可以传入一个既不是 `number` 也不是 `string` 类型的参数，但是 TypeScript 却不报错。

```typescript
let indentedString = padLeft('Hello world', true) // 编译阶段通过，运行时报错
```

为了解决这个问题，我们可以使用 联合类型做为 `padding` 的参数：

```typescript
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft('Hello world', true) // 编译阶段报错
```

联合类型表示一个值可以是几种类型之一。我们用竖线（`|`）分隔每个类型，所以 `number | string` 表示一个值可以是 `number` 或 `string` 。如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。

```typescript
interface Bird {
  fly()
  layEggs()
}

interface Fish {
  swim()
  layEggs()
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet()
pet.layEggs() // okay
pet.swim()  // error
```

这里的联合类型可能有点复杂：如果一个值的类型是 `A | B`，我们能够确定的是它包含了 `A` 和 `B` 中共有的成员。这个例子里，`Fish` 具有一个 `swim` 方法，我们不能确定一个 `Bird | Fish` 类型的变量是否有 `swim` 方法。如果变量在运行时是 `Bird` 类型，那么调用 `pet.swim()` 就出错了。

## 类型保护

联合类型适合那些值可以为不同类型的情况。但当我们想确切地了解是否为 `Fish` 或者是 `Bird` 时怎么办？JavaScript 里常用来区分这 2 个可能值得方法是检查成员是否存在。如之前提及的，我们只能访问联合类型中共同拥有的成员。

```typescript
let pet = getSmallPet()

// 每一个成员访问都会报错
if(pet.swim) {
  pet.swim()
} else if (pet.fly) {
  pet.fly()
}
```

为了让这段代码工作，我们要使用类型断言：

```typescript
let pet = getSmallPet()

if((pet as Fish).swim) {
  (pet as Fish).swim()
} else {
  (pet as Bird).fly()
}
```

### 用户自定义的类型保护



### typeof 类型保护

### instanceof 类型保护

## 可以为 null 的类型

### 可选参数和可选属性

### 类型保护和类型断言

## 字符串和字面量类型

## 总结
