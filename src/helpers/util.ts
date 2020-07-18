
const toString = Object.prototype.toString;

export function isDate(date: any): date is Date {
  return toString.call(date) === '[object Date]';
}

export function isObject(val: any): val is Object {
  return toString.call(val) === '[object Object]';
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const k in from) {
    (to as T & U)[k] = from[k] as any;
  }
  return to as T & U;
}