import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/reset.scss'

import AV from 'leancloud-storage'

var APP_ID = 'TwANvsxCggNKwGykjrmCk8lD-gzGzoHsz';
var APP_KEY = '3BRJ6zaoDUTq9b19yEiL41nh';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  data: {
    AV,
  },
  components: { 
    App,
  },
  template: '<App/>',
  created() {
  },
  methods: {
  }
})

