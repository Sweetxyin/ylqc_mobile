import App from './App'
import store from './store'
// #ifndef VUE3
import Vue from 'vue'

import './uni.promisify.adaptor'
import api from './api/index.js'

Vue.prototype.$api = api


Vue.config.productionTip = false

Vue.prototype.$store = store


App.mpType = 'app'

// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
const app = new Vue({
	store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3

import { createSSRApp } from 'vue'
// 引入全局uviewPlus
import uviewPlus from '@/uni_modules/uview-plus'
import api from './api/index'
import tabbar from '@/components/tabbar/tabbar.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$api = api
  app.config.globalProperties.productionTip = false
  app.use(uviewPlus)
  app.use(store)
  app.component("tabbar", tabbar); // 2.调用app.component方法全局注册组件
  return {
    app
  }
}
// #endif