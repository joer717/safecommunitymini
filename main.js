import App from './App'
import request from '@/api/request.js'
import tools from '@/utils/tools.js'
import common from "@/api/common.js"
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$tools = tools
Vue.prototype.common = common


const app = new Vue({
    ...App
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif