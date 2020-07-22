
import Axios from './core/Axios';
import { iAxiosRequestConfig, AxiosStatic } from './types/types';
import { extend } from './helpers/util';
import defaults from './defaults';
import mergeConfig from './core/mergeConfig';

function createInstance(config: iAxiosRequestConfig): AxiosStatic {
  const ctx = new Axios(config);
  let instance = Axios.prototype.request.bind(ctx);
  extend(instance, ctx);
  return instance as AxiosStatic;
}

const axios = createInstance(defaults);
axios.create = function (config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios;