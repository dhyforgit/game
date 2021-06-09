import tools from "./tools";
import request from './axios'
export default {
  install(Vue) {
    Vue.prototype["$tools"] = tools;
    Vue.prototype["$request"] = request;
  }
};