<template>
  <Map :options="opt" @onload="onload" />
</template>

<script>
import Vue from 'vue'
import Map from '../components/Map'
export default {
  name: 'Home',
  components: {
    Map
  },
  data() {
    return {
      opt: {}
    }
  },
  created() {
    this.opt = {}
    // 定义主视图组件异步回调
    this._createPromise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
    //绑定地图初始化事件到Vue实例，在其他组件通过异步可以获取到map对象
    Vue.prototype.$mainViewCreatePromise = this._createPromise
  },
  methods: {
    onload(map) {
      console.log('>>>>> 地图创建成功 >>>>', map)
      map.setOptions({
        globe: {
          depthTestAgainstTerrain: true
        },
        cameraController: {
          enableCollisionDetection: false
        },
        widgetController: {
          enableCompass2: true,
          enableStateBar: true,          
          enableDistanceLegend: true
        }
      })
      //移除鼠标事件
      // map.mouseEvent.removeEvent()
      window.map = map
      this.map = map
      this._resolve({ map })
      const layer = new Creatar3d.S3MLayer({ url: 'examples/data/CBD/cbd.scp' })
      map.addLayer(layer)
      layer.flyTo()
    }
  },
  destroy() {
    this.map.destroy()
  }
}
</script>
