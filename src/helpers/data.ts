import { isObject } from "./util";

export function transformRequest(data:any):any {
  if(isObject(data)) {
    return JSON.stringify(data);
  }
}

export function transformResponseData(data:any):any {
  if(typeof data === 'string') {
    try {
      data = JSON.parse(data);
    }
    catch(e) {

    }
  }
  return data;
}