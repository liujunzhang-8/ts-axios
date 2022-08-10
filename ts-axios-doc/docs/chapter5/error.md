# 错误处理

## 需求分析

在上一章节中，我们实现了 `ts-axios` 的基础功能，但目前为止我们都是处理了正常接收请求的逻辑，并没有考虑到任何错误情况的处理，这对于一个程序的健壮性而言是远不够的，因此我们这一章需要对 AJAX 各种错误情况做处理。

并且我们希望程序也能捕获到这些错误，做进一步的处理：

```typescript
axios({
  method: 'get',
  url: '/error/get'
}).then(res => {
  console.log(res);
}).catch(e => {
  console.log(e);
})
```

如果在请求的过程中发生任何错误，我们都可以在 `reject` 回调函数中捕获到。

我们把错误分成了几类，接下来我们就来分别处理这些错误情况。

## 处理网络异常错误

当网络出现异常（比如不通）的时候发送请求会触发 `XMLHttpRequest` 对象实例的 `error` 事件，于是我们可以在 [`onerror`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onerror) 的事件回调函数中捕获此类错误。

我们在 `xhr` 函数中添加如下代码：

```typescript
request.onerror = function handleError() {
  reject(new Error('Network Error'))
}
```

## 处理超时错误

我们可以设置某个请求的超时时间 [`timeout`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout)，也就是当请求发送后超过某个时间后仍然没收到响应，则请求自动终止，并触发 [`timeout`] 事件。

请求默认的超时时间是 0，即永不超时。所以我们首先需要允许程序可以配置超时时间：

```typescript
export interface AxiosRequestConfig {
  // ...
  timeout?: number
}
```

接着在 `xhr` 函数中添加如下代码：

```typescript
const { /* ... */ timeout } = config

if (timeout) {
  request.timeout = timeout
}

request.ontimeout = function handleTimeout () {
  reject(new Error(`Timeout of ${timeout}ms exceeded`))
}
```

## 处理非 200 状态码

对于一个正常的请求，往往会返回 200-300 之间的 HTTP 状态码，对于不在这个区间的状态码，我们也把它们认为是一种错误的情况做处理。

```typescript
request.onreadystatechange = function handleLoad () {
  if (request.readyState !== 4) {
    return
  }

  if (request.status === 0) {
    return
  }

  const responseHeaders = parseHeaders(request.getAllResponseHeaders())
  const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
  const response: AxiosResponse = {
    data: responseData,
    status: request.status,
    statusText: request.statusText,
    headers: responseHeaders,
    config,
    request
  }
  handleResponse(response)
}

function handleResponse(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    resolve(response)
  } else {
    reject(new Error(`Request failed with status code ${response.status}`))
  }
}
```

我们在 `onreadystatechange` 的回调函数中，添加了对 [`request.status`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status) 的判断，因为当出现网络错误或者超时错误的时候，该值都为 0。

接着我们在 `handleResponse` 函数中对 `request.status` 的值再次判断，如果是 `2xx` 的状态码，则认为是一个正常的请求，否则抛错。

## demo 编写


