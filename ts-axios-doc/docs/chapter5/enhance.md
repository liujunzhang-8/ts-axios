# 错误信息增强

## 需求分析

上一节课我们已经捕获了几类 AJAX 的错误，但是对于错误信息提供的非常有限，我们希望对外提供的信息不仅仅包含错误文本信息，还包括了请求对象配置 `config`，错误代码 `code`，`XMLHttpRequest` 对象实例 `request` 以及自定义响应对象 `response`。

```typescript
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log(res);
}).catch(e: AxiosError => {
  console.log(e.message);
  console.log(e.request);
  console.log(e.code);
})
```

这样对于应用方来说，他们就可以捕获到这些错误的详细信息，做进一步的处理。

那么接下来，我们就来对错误信息做增强。

## 创建 AxiosError 类

我们先来定义 `AxiosError` 类型接口，用于外部使用。

`types/index.ts`：

```typescript
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
```

## createError 方法应用

## 导出类型定义

