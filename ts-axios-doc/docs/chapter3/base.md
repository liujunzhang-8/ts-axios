# 编写基础请求代码

我们这节开始编写 `ts-axios` 库，我们的目标是实现简单的发送请求功能，即客户端通过 `XMLHttpRequest` 对象把请求发送到 server 端，server 端能收到请求并响应即可。

我们实现 `axios` 最基本的操作，通过传入一个对象发送请求，如下：

```typescript
axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
```

## 创建入口文件

我们删除 `src` 目录下的文件，先创建一个 `index.ts` 文件，作为整个库的入口文件，然后我们先定义一个 `axios` 方法，并把它导出，如下：

```typescript
function axios(config) {
  
}

export default axios
```

这里 TypeScript 编译器会检查到错误，分别是 `config` 的声明上有隐含的 `any` 报错，以及代码块为空。代码块为空我们比较好理解，第一个错误的原因是因为我们给 TypesScript 编译配置的 `strict` 设置为 `true` 导致。

### 编译配置文件 tsconfig.json

`tsconfig.json` 文件中指定了用来编译这个项目的根文件和编译选项，关于它的具体学习，我希望同学们去[官网](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)系统学习一下

我们在之前讲 TypeScript 的基础时，会运行 `tsc` 命令去编译 TypeScript 文件，编译器会从当前目录开始去查找 `tsconfig.json` 文件，作为编译时的一些编译选项。

我们来看一下 tsconfig.json 文件，它包含了很多编译时的配置，其中我们把 `strict` 设置为 `true`，它相当于启用所有严格类型的检查选项，启用 `--strict` 相当于启用 `--noImplicitAny`，`--noImplicitThis`，`--strictNullChecks` 和 `--strictFunctionTypes` 和 `--strictPropertyInitialization`。

我们讲 TypeScript 的基础时提到了 `--strictNullChecks`，其它的编译配置去查看它的[官网文档](https://www.typescriptlang.org/docs/handbook/compiler-options.html)，把它当做手册

### 定义 AxiosRequestConfig 接口类型

接下来我们需要给 `config` 参数定义一种接口类型。我们创建一个 `types` 目录，在下面创建一个 `index.ts` 文件，作为我们项目中公用的类型定义文件。

接下来我们来定义 `AxiosRequestConfig` 接口类型：

```typescript
export interface AxiosRequestConfig {
  url: string
  method?: string
  data?: any
  params?: any
}
```

其中, `url` 为请求的地址，必选属性；而其余属性都是可选属性。`method` 是请求的 HTTP 方法；`data` 是 `post`、`patch` 等类型请求的数据，放到 `request body`中的；`params` 是 `get`、`head` 等类型请求的数据，拼接到 `url` 的 `query string` 中的。

为了让 `method` 只能传入合法的字符串，我们定义一种字符串字面量类型 `Method`：

```typescript
export type Method = 'get' | 'GET'
  | 'delete' | 'Delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
```

接着我们把 `AxiosRequestConfig` 中的 `method` 属性类型改成这种字符串字面量类型：

```typescript
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
```

然后回到 `index.ts`，我们引入 `AxiosRequestConfig` 类型，作为 `config` 的参数类型，如下：

```typescript
import { AxiosRequestConfig } from "./types";

function axios(config: AxiosRequestConfig) {

}

export default axios
```

那么接下来，我们就来实现这个函数体内部的逻辑——发送请求

## 利用 XMLHttpRequest 发送请求
