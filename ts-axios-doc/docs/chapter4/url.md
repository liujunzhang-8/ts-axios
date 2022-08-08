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

根据我们之前的需求分析，我们要实现一个工具函数，把 `params` 拼接到 `url` 上。我们希望把项目中的一些工具函数、辅助方法独立管理，于是我们创建一个 `helpers` 目录，在这个目录下创建 `url.ts` 文件，未来会把处理 `url` 相关的工具函数都放在该文件中。

`helpers/url.ts`：

```typescript
import { isDate, isObject  } from "./util";

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL (url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach((key) => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values: string[]
    if(Array.isArray(val)) {
      values = val
      key += '[]' 
    } else {
      values = [val]
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)} = ${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if(serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
```

`helpers/util.ts`

```typescript
const toString = Object.prototype.toString

export function isDate (val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject (val: any): val is Object {
  return val !== null && typeof val === 'object'
}
```

## 实现 url 参数处理逻辑


