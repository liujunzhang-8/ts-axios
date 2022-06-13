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

## 只读属性

## readonly vs const

## 额外的属性检查

## 函数类型

## 可索引的类型

## 类类型

### 实现接口

### 类静态部分与实例部分的区别

## 继承接口

## 混合类型

## 接口继承类

