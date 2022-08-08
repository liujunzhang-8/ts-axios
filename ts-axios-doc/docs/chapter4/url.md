# 处理请求 url 参数

## 需求分析

还记得我们上节课遗留了一个问题，再来看这个例子：

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: 1,
    b: 2
  }
})
```

我们希望最终请求的 `url` 是 `/base/get?a=1&b=2`，这样服务端就可以通过请求的 url 解析到我们传来的参数数据了。实际上就是把 `params` 对象的 key 和 value 拼接到 `url` 上。

再来看几个更复杂的例子。

### 参数值为数组

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
```

最终请求的 `url` 是 `/base/get?foo[]=bar&foo[]=baz`。

### 参数值为对象

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})
```

最终请求的 `url` 是 `/base/get?foo=%7B%22bar%22:%22baz%22%7D`，`foo` 后面拼接的是 `{"bar": "baz"}` encode 后的结果。

### 参数值为 Date 类型

```typescript
const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})
```

最终请求的 `url` 是 `/base/get?date=2019-04-01T05:55:39.030Z`，`date` 后面拼接的是 `date.toISOString()` 的结果。

### 特殊字符支持

对于字符 `@`、`:`、`$`、`,`、` `、`[`、`]`，我们是允许出现在 `url` 中的，不希望被 encode。

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})
```

最终请求的 `url` 是 `/base/get?foo=@:$+`，注意，我们会把空格 ` ` 转换为 `+`。

### 空值忽略

对于值为 `null` 或者 `undefined` 的属性，我们是不会添加到 url 参数中的。

```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})
```

最终请求的 `url` 是 `/base/get?foo=bar`。

### 丢弃 url 中的哈希标记

```typescript
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})
```
最终请求的 `url` 是 `/base/get?foo=bar`

### 保留 url 中已存在的参数

```typescript
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
```

最终请求的 `url` 是 `/base/get?foo=bar&bar=baz`

## buildURL 函数实现
