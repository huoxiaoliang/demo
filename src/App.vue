<template>
  <div id="app">
    <Map :options="opt" @onload="onload" />
  </div>
</template>

<script>

import Map from './components/Map.vue'

export default {
  name: 'App',
  data() {
    return {
      opt: {}
    }
  },
  components: {
    Map
  },
  created() {
    this.opt = {
      widgetController: {
        enableCompass: true,
        enableStateBar: true,
        enableDistanceLegend: true
      },
      showlogo: { show: true }
    }
  },
  methods: {
    onload(map) {
      console.log('>>>>> 地图创建成功 >>>>', map)
      console.log(map)
      window.map = map
      const layer = new CWC.GraphicLayer('test')
      map.addLayer(layer)
      const polyline = new CWC.Polyline('175, 35; 55, 35')
      polyline.setStyle({
        width: 10,
        material: CWC.Userspace.Cesium.Color.RED,
        clampToGround: true
      })
      layer.addGraphic(polyline)
      map.flyTo(layer)
      layer.layerEvent.on(CWC.LayerEventType.CLICK, res => {
        console.log(res)
      })
      // console.log('>>>>> 地图销废 >>>>', map)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
