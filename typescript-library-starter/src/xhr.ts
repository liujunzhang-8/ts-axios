import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { data, url, method } = config
  
  const request = new XMLHttpRequest()

  request.open(method?.toUpperCase(), url, async: true)
  
  request.send(data)
}