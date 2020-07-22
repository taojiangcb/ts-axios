import { isObject, deepMerge } from "./util";
import { Method } from "../types/types";

/**规范化 */
function normalizeHadnerName(headers: any, normalizedName: string): void {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach((name) => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHadnerName(headers, 'Content-Type');
  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers["Content-Type"] = 'application/json;charset=UTF-8';
    }
  }
  return headers;
}

export function parseHandlers(headers: string): any {
  let parse = Object.create(null);
  if (!headers) return parse;
  
  headers.split('\r\n').forEach(line => {
    let [k, v] = line.split(':');
    k = k.trim().toLowerCase();
    if(!k) return;
    if(v) v = v.trim();
    parse[k] = v;
  })
  return parse;
}

export function flattenHeaders(headers:any,mehtod:Method) : any {
  if(!headers) return headers;
  headers = deepMerge(headers.common,headers[mehtod],headers);
  const methodsToDelete = ['delete','get','head','options','post','put','path','common'];

  methodsToDelete.forEach(method=>{
    delete headers[mehtod];
  })

  return headers;
}