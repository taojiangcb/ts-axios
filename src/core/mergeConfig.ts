/**
 * 合并 config 
 */

import { iAxiosRequestConfig } from '../types/types';
import { isObject, deepMerge } from '../helpers/util';

const strats = Object.create(null);

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1;
}

function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 != 'undefined') {
    return val2;
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isObject(val2)) {
    return deepMerge(val1, val2);
  }
  else if (typeof val2 != 'undefined') {
    return val2;
  }
  else if (isObject(val1)) {
    return deepMerge(val1);
  }
  else if (typeof val1 != 'undefined') {
    return val1;
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data'];
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat;
})

export default function mergeConfig(config1: iAxiosRequestConfig, config2?: iAxiosRequestConfig): iAxiosRequestConfig {

  config2 = config2 || {};
  const config = Object.create(null);
  for (let key in config2) {
    mergeField(key);
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key);
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config[key], config2![key]);
  }

  return config;
}