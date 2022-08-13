const toString = Object.prototype.toString

export function isDate(val: any): boolean {
  return toString.call(val) === '[object Date]'
}

export function () {
  
}