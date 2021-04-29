

import Vue from 'vue'

import * as Cesium from 'cesium/Build/Cesium/Cesium.js'
import 'cesium/Build/Cesium/Widgets/widgets.css'
window.Cesium = Cesium
import App from './App.vue'
// import  * as creatar from '../Build/creatar.js'
Vue.config.productionTip = false
// Vue.prototype.creatar = creatar
new Vue({
  render: h => h(App)
}).$mount('#app')
