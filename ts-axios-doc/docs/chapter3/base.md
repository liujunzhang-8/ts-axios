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
