import App from './App'

// #ifndef VUE3
import Vue from 'vue'

import './uni.promisify.adaptor'
import store from './store'
import api from './api/api.js'
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

export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  return {
    app
  }
}
// #endif