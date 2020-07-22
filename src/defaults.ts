import { iAxiosRequestConfig } from './types/types';
import { transformRequest, transformResponseData } from './helpers/data';
import { processHeaders } from './helpers/headers';

const defaults: iAxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    function (data: any, headers: any): any {
      processHeaders(data, headers);
      return transformRequest(data);
    }
  ],
  transformResponse: [
    function (data: any): any {
      return transformResponseData(data);
    }
  ],
}
const methodsNoData = ['delete', 'get', 'head', 'options'];

methodsNoData.forEach(method => {
  defaults.headers ? [method] : {}
});

const methodsWithData = ['post', 'put', 'patch'];

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults;