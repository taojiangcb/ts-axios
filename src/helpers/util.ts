
const toString = Object.prototype.toString;

export function isDate(date: any): date is Date {
  return toString.call(date) === '[object Date]';
}

export function isObject(val:any):val is Object {
  return toString.call(val) === '[object Object]';
}