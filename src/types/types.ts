export type Method = 'get' | "GET"
  | 'delete' | 'DELETE'
  | 'put' | "PUT"
  | 'head' | "HEAD"
  | 'options' | "OPTIONS"
  | "post" | "POST"
  | "path" | "path"

export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
}


