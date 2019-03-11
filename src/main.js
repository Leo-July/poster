import Vue from 'vue'
import App from './App.vue'
import VueHtml2Canvas from 'vue-html2canvas'
Vue.config.productionTip = false
Vue.use(VueHtml2Canvas)
new Vue({
  render: h => h(App),
}).$mount('#app')
