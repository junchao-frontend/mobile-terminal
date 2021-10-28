import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 自动设置REM基础值（html标签字体大小）
import Vant from 'vant' // 全局引入vant组件库
import 'vant/lib/index.css'
import './style/global.less'
Vue.config.productionTip = false

Vue.use(Vant) // 全局注册
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
