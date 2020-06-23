export type Method = 'get' | "GET"
  | 'delete' | 'DELETE'
  | 'put' | "PUT"
  | 'head' | "HEAD"
  | 'options' | "OPTIONS"
  | "post" | "POST"
  | "path" | "path"

/**请求的状态 */
export const ReadyState = {
  UNSENT: 0,                //代理被创建，但尚未调用 open() 方法。
  OPENED: 1,                //open() 方法已经被调用。
  HEADERS_RECEIVED: 2,      //send() 方法已经被调用，并且头部和状态已经可获得。
  LOADING: 3,               //下载中； responseText 属性已经包含部分数据。
  DONE: 4                   //下载操作已完成。
}

export interface iAxiosRequestConfig {
  url: string;                                        //请求地址
  method?: Method;                                    //请求的方法
  data?: any;                                         //请求的参数   post
  params?: any;                                       //请求的参数   get
  headers?: any;
  responseType?: XMLHttpRequestResponseType;          //返回的类型
  timeout?: number;                                   //timeout

}

export interface iAxiosResponse {
  data: any;                              //返回的数据
  status: number;                         //状态码
  statusText: string;                     //状态描述
  headers: any;                           //返回的headers
  config: iAxiosRequestConfig;             //请求时的 request 配置
  request: any;
}

export interface iAxiosError extends Error {
  isAxiosError: boolean;                  //
  config: iAxiosRequestConfig;             //请求时的request配置
  code?: string | number | null;          //错误编码
  request?: any;                          //request 请求
  response?: iAxiosResponse;               //respone 响应
}


export interface AxiosPromise extends Promise<iAxiosResponse> { }