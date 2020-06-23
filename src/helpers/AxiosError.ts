import { iAxiosError, iAxiosRequestConfig, iAxiosResponse } from '../types/types';
class AxiosError extends Error implements iAxiosError {
  isAxiosError: boolean = true;                   //
  config: iAxiosRequestConfig;                    //请求时的request配置
  code?: string | number | null;                  //错误编码
  request?: any;                                  //request 请求
  response?: iAxiosResponse;                      //respone 响应

  constructor(
    message: string,
    code: string | number | null,
    config: iAxiosRequestConfig,
    request?: any,
    response?: iAxiosResponse
  ) {
    super(message);
    this.code = code;
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;

    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export function createAxiosError(
  message: string,
  code: string | number | null,
  config: iAxiosRequestConfig,
  request?: any,
  response?: iAxiosResponse
): AxiosError {
  return new AxiosError(message, code, config, request, response);
}