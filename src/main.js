import Vue from 'vue'
import App from './App.vue'

// 基础配置
import base from './utils/base'
Vue.use(base)
// 设置html标签字体，自适应，添加viewport
import './utils/rem'
import router from './router/index.js'
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title == undefined ? '默认标题' : to.meta.title
  next();
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
