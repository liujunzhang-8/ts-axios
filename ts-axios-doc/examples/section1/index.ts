function isFunction (val: any): boolean {
  return toString.call(val === '[object Function]')
}

// function extend<T, U>(to: T & U, from: U, context?: object): T & U {
//   for (const key in from) {
//     const val = fromp[key] as key;
//     if (context && isFunction(val)) {
//       to[key] = val.bind(context);
//     } else {
//       to[key] = from[key] as key;
//     }
//   }
//   return to;
// }

function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    result[id] = first[id] as any
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      result[id] = second[id] as any
    }
  }
  return result;
}