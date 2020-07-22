import {
  AxiosInstance,
  iAxiosRequestConfig,
  iAxios,
  AxiosPromise,
  Method,
  iAxiosResponse,
  ResolvedFn,
  RejectedFn
} from '../types/types';
import dispatchRequest from '../axios';
import InterceptorManager from './InterceptorManager';
import mergeConfig from './mergeConfig';


interface Interceptors {
  request: InterceptorManager<iAxiosRequestConfig>;
  response: InterceptorManager<iAxiosResponse>;
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: iAxiosRequestConfig) => AxiosPromise);
  rejected?: RejectedFn;
}

export default class Axios implements iAxios {

  defaults: iAxiosRequestConfig;
  interceptors: Interceptors;

  constructor(initConfig: iAxiosRequestConfig) {

    this.defaults = initConfig;

    this.interceptors = {
      request: new InterceptorManager<iAxiosRequestConfig>(),
      response: new InterceptorManager<iAxiosResponse>()
    }
  }

  request(url?: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) config = {};
      config.url = url;
    }
    else {
      config = url;
    }

    config = mergeConfig(this.defaults, config);

    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    this.interceptors?.request.forEach(interceptor => {
      chain.unshift(interceptor);
    });

    this.interceptors?.response.forEach(interceptor => {
      chain.push(interceptor);
    })

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }

    return promise;

    // return dispatchRequest(config);
  }

  get(url: string, config?: iAxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, { method: 'get', url }));
  }

  delete(url: string, config?: iAxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config);
  }

  options(url: string, config?: iAxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config);
  }

  head(url: string, config?: iAxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config);
  }

  put(url: string, config?: iAxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('put', url, config);
  }

  patch(url: string, config?: iAxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('patch', url, config);
  }

  post(url: string, data?: any, config?: iAxiosRequestConfig) {
    return this._requestMethodWithData('post', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: iAxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { method, url }));
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: iAxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }));
  }
}