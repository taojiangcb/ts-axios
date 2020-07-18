import {
  iAxiosRequestConfig,
  AxiosPromise,
  iAxiosResponse,
  ReadyState,
  iAxiosError
} from '../types/types';
import { parseHandlers } from '../helpers/headers';
import { createAxiosError } from '../helpers/AxiosError';

export default function (config: iAxiosRequestConfig): AxiosPromise {
  
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType } = config;
    const request = new XMLHttpRequest();

    if (responseType) request.responseType = responseType;
    request.open(method?.toUpperCase(), url!, true);

    request.onreadystatechange = function (e) {
      if (request.readyState !== ReadyState.DONE) {
        return;
      }

      //网络错误或者超时错误
      if (request.readyState === ReadyState.UNSENT) {
        return;
      }
      
      const responseHeander = parseHandlers(request.getAllResponseHeaders());
      const responseData = responseType === "text" ? request.responseText : request.response;
      const response: iAxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeander,
        config,
        request
      }
      responseHandler(response);
    }

    request.onerror = function (ev) {
      reject(createAxiosError('Net Work Error', null, config, request));
    }

    /**请求超时 默认 30000 毫秒 */
    config.timeout && config.timeout >= 0
      ? request.timeout = config.timeout
      : request.timeout = 30000;

    request.ontimeout = function () {
      reject(createAxiosError(`the network timeout ${request.timeout}`,'ECONNABORTED',config,request));
    }

    /**请求时header 的处理 */
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      }
      else {
        request.setRequestHeader(name, headers[name])
      }
    });
    request.send(data);
    
    function responseHandler(response: iAxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      }
      else {
        reject(createAxiosError(`request fail whith status code is ${response.status}`,null,config,request,response));
      }
    }
  })
}