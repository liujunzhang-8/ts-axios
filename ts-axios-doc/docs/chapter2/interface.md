# 接口

Typescript 的核心原则之一是对值所具有的结构进行类型检查。它有时被称做"鸭式辨型法"或"结构性子类型化"。在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

## 接口初探

下面通过一个简单示例来观察接口是如何工作的：

```typescript
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)
```

类型检查器会查看 `printLabel` 的调用。`printLabel` 有一个参数，并要求这个对象参数有一个名为 `label` 类型为 `string` 的属性。需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，以及其类型是否匹配。然而，有些时候 TypeScript 却并不会这么宽松，我们下面稍作讲解。

下面我们重写上面的例子，这次使用接口来描述：必须包含一个`label` 属性且类型为 `string`:

```typescript
interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)
```

`LabelledValue` 接口就好比一个名字，用来描述上面例子里的结构。它代表了有一个 `label` 属性且类型为 `string` 的对象。需要注意的是，我们在这里并不能像在其它语言里一样，说传给 `printLabel` 的对象实现了这个接口。我们只会去关注值的外形。只要传入的对象满足上面提到的必要条件，那么它就是被允许的。

还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

## 可选属性

接口里的属性不全都是必需的。有些是只在某些条件下存在，或者根本不存在。例如给函数传入的参数对象中只有部分属性赋值了。

```typescript
interface Square {
  color: string,
  area: number
}

interface SquareConfig {
  color?: string
  width?: number
}

function createSquare (config: SquareConfig): Square {
  let newSquare = {color: 'white', area: 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({color: 'black'})
```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。比如，我们故意将 `createSquare` 里的 `color` 属性名拼错，就会得到一个错误提示：

```typescript
interface Square {
  color: string,
  area: number
}

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare (config: SquareConfig): Square {
  let newSquare = {color: 'white', area: 100}
  if (config.clor) {
    // Error: 属性 'clor' 不存在于类型 'SquareConfig' 中
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({color: 'black'})
```

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。你可以在属性名前用 `readonly` 来指定只读属性：

```typescript
interface Point {
  readonly x: number
  readonly y: number
}
```

你可以通过赋值一个对象字面量来构造一个 `Point`。赋值后，`x` 和 `y` 再也不能被改变了。

```typescript
let p1: Point = { x: 10, y: 20 }
p1.x = 5 // error
```

TypeScript 具有 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```typescript
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // error!
ro.push(5) // error!
ro.length = 100 // error!
a = ro // error!
```

上面代码的最后一行，可以看到就算把整个 `ReadonlyArray` 赋值到一个普通数组也是不可以的。但是你可以用类型断言重写：

```typescript
a = ro as number[]
```

## readonly vs const

最简单判断该用 `readonly` 还是 `const` 的方法是看要把它作为变量使用还是作为一个属性。作为变量使用的话用 `const`，若作为属性则使用 `readonly`。

## 额外的属性检查

## 函数类型

## 可索引的类型

## 类类型

### 实现接口

### 类静态部分与实例部分的区别

## 继承接口

## 混合类型

## 接口继承类

