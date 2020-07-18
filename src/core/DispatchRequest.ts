import { iAxiosRequestConfig, AxiosPromise, iAxiosResponse } from '../types/types';
import { buildURL } from '../helpers/url';
import { transformRequest,transformResponseData } from '../helpers/data';
import { processHeaders } from '../helpers/headers';
import xhr from '../core/xhr';


export default function dispatchRequest(config:iAxiosRequestConfig):AxiosPromise {
  processConfig(config);
  return xhr(config).then((res:iAxiosResponse)=>{
    return transformResponse(res);
  });
}

function axios(config: iAxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then((res:iAxiosResponse)=>{
    return transformResponse(res);
  });
}

function processConfig(config: iAxiosRequestConfig) {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

function transformURL(config: iAxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url!, params);
}

function transformRequestData(config: iAxiosRequestConfig): any {
  return transformRequest(config.data);
}

function transformHeaders(config: iAxiosRequestConfig) {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

function transformResponse(data:iAxiosResponse):iAxiosResponse {
  data.data = transformResponseData(data.data);
  return data;
}

