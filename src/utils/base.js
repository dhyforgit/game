import tools from "./tools";

export default {
  install(Vue) {
    Vue.prototype["$tools"] = tools;
  }
};