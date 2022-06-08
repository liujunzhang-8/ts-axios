 # 基础类型

 TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

 ## 布尔值

 最基本的数据类型就是简单的 true/false 值，在JavaScript 和 TypeScript 里叫做 `boolean` (其它语言中也一样)。

 ```typescript
 let isDone: boolean = false
 ```

 ## 数字

 和 JavaScript 一样，TypeScript 里的所有数字都是浮点数。这些浮点数的类型是 number。除了支持十进制和十六进制字面量，TypeScript 还支持 ECMAScript 2015 中引入的二进制和八进制字面量。

 ```typescript
 let decLiteral: number = 20
 let hexLiteral: number = 0x14
 let binaryLiteral: number = 0b10100
 let octalLiteral: number = 0o24
 ```

 ## 字符串

 JavaScript 程序的另一项基本操作是处理网页或服务器端的文本数据。像其它语言里一样，我们使用 `string` 表示文本数据类型。和 JavaScript 一样，可以使用双引号 (`"`) 或单引号 (`'`) 表示字符串。

 ```typescript
 let name: string = 'bob'
 name = 'smith'
 ```

 你还可以使用模板字符串，它可以定义多行文本和内嵌表达式。这种字符串是被反引号包围 (``` ` ```) ，并且以 `${ expr }` 这种形式嵌入表达式。

 ```typescript
 let name: string = `Yee`
 let age: number = 37
 let sentence: string = `Hello, my name is ${ name }.  
 I'll be ${ age + 1 } years old next month.`
 ```

 这与下面定义 `sentence` 的方式效果相同：

 ```typescript
 let sentence: string = 'Hello, my name is ' + name + '.\n\n' + 
      'I\'ll be ' + (age + 1) + ' years old next month.'
 ```

 ## 数组

 ## 元组 Tuple

 ## 枚举

 ## any

 ## void

 ## null 和 undefined

 ## never

 ## object

 ## 类型断言

