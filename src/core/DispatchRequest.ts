import { iAxiosRequestConfig, AxiosPromise, iAxiosResponse } from '../types/types';
import { buildURL } from '../helpers/url';
import { transformRequest, transformResponseData, } from '../helpers/data';
import { processHeaders, flattenHeaders } from '../helpers/headers';
import xhr from '../core/xhr';
import transform from './transform';


export default function dispatchRequest(config: iAxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then((res: iAxiosResponse) => {
    return transformResponse(res);
  });
}

function axios(config: iAxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then((res: iAxiosResponse) => {
    return transformResponse(res);
  });
}

function processConfig(config: iAxiosRequestConfig) {
  config.url = transformURL(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
}

function transformURL(config: iAxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url!, params);
}


function transformResponse(data: iAxiosResponse): iAxiosResponse {
  data.data = transform(data.data, data.headers, data.config.transformResponse);
  return data;
}