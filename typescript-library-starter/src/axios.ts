import { AxiosIntance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'


function createInstance(): AxiosIntance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosIntance
}

const axios = createInstance()

export default axios