import Vue from 'vue'
import vueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import routes from './routes.config.js'
import store from './store/index.js'


import './assets/js/fontSize.js'
import './assets/js/swiper.js'
import './assets/js/jquery.js'
Vue.prototype.$http=axios
Vue.use(vueRouter)
var router =new vueRouter({
	routes,
	scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
