
import Axios from './core/Axios';
import { AxiosInstance } from './types/types';
import { extend } from './helpers/util';

function createInstance(): AxiosInstance {
  const ctx = new Axios();
  let instance = Axios.prototype.request.bind(ctx);
  extend(instance, ctx);
  return instance as AxiosInstance;
}

const axios = createInstance();
export default axios;