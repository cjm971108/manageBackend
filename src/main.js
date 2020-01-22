// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import ZkTable from 'vue-table-with-tree-grid'

Vue.prototype.$http = Axios
Axios.defaults.baseURL = 'http://api.xiaomadagege.cn:8800/api/private/v1/'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(ZkTable)

// 通过axios请求拦截器添加token，保证拥有获取数据的权限
Axios.interceptors.request.use(config => {
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
