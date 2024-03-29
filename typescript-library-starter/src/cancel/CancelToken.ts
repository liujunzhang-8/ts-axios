import { CancelExecutor } from '../types'

interface ResolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })

    executor(cancel: message => {
      if (this.reason) {
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(executor: c => {
      cancel = c
    })
  }
}