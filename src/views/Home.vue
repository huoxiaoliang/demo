<template>
  <Map :options="opt" @onload="onload" />
</template>

<script>
import Map from '../components/Map'

export default {
  name: 'Home',
  data() {
    return {
      opt: {}
    }
  },
  components: {
    Map
  },
  created() {
    this.opt = {}
  },
  methods: {
    onload(map) {
      console.log('>>>>> 地图创建成功 >>>>', map)
      console.log(map)
      map.setOptions({
        globe: {
          depthTestAgainstTerrain: true
        },
        cameraController: {
          enableCollisionDetection: false
        },
        widgetController: {
          enableCompass: true,
          enableStateBar: true,
          enableDistanceLegend: true
        }
      })
      window.map = map
      // const layer = new CWC.GraphicLayer('test')

      // map.addLayer(layer)
      // const polyline = new CWC.Polyline({ positions: '116, 31; 117, 31' })
      // polyline.setLabel('qweqw')
      // polyline.setStyle({
      //   width: 10,
      //   material: CWC.Userspace.Cesium.Color.RED,
      //   clampToGround: true
      // })
      // layer.addGraphic(polyline)
      // map.flyTo(layer)
      // layer.layerEvent.on(CWC.LayerEventType.CLICK, res => {
      //   console.log(res)
      // })

      const layerd = new CWC.CompositeLayer()
      map.addLayer(layerd)
      const drill = new CWC.Drill({
        radius: 1000,
        radialSegments: 64,
        position: '116.5, 31',
        layers: [
          { maxz: 10000, minz: 5000, render: '#ff0000' },
          { maxz: 5000, minz: 1, render: '#ffffff' }
        ]
      })
      layerd.addGraphic(drill)
      const drill2 = new CWC.Drill({
        radius: 1000,
        radialSegments: 64,
        position: '116.6, 31',
        layers: [
          { maxz: 10000, minz: 5000, render: '#ff0000' },
          { maxz: 5000, minz: 1, render: '#ffffff' }
        ]
      })
      layerd.addGraphic(drill2)
      layerd.layerEvent.on(CWC.LayerEventType.CLICK, res => {
        console.log(res)
      })
      map.flyTo(layerd)
    }
  },
  destroy() {
    window.map.destroy()
  }
}
</script>


