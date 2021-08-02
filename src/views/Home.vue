<template>
  <Map :options="opt" @onload="onload" />
</template>

<script>
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
          enableCompass2: true,
          enableStateBar: true,
          enableDistanceLegend: true
        }
      })
      window.map = map
      // const layer = new Creatar3d.GraphicLayer('test')

      // map.addLayer(layer)
      // const polyline = new Creatar3d.Polyline({ positions: '116, 31; 117, 31' })
      // polyline.setLabel('qweqw')
      // polyline.setStyle({
      //   width: 10,
      //   material: Creatar3d.Userspace.Cesium.Color.RED,
      //   clampToGround: true
      // })
      // layer.addGraphic(polyline)
      // map.flyTo(layer)
      // layer.layerEvent.on(Creatar3d.LayerEventType.CLICK, res => {
      //   console.log(res)
      // })

      const layerd = new Creatar3d.PrimitiveLayer()
      map.addLayer(layerd)
      const drill = new Creatar3d.Drill({
        radius: 1000,
        radialSegments: 64,
        position: '116.5, 31',
        layers: [
          { maxz: 10000, minz: 5000, render: '#ff0000' },
          { maxz: 5000, minz: 1, render: '#ffffff' }
        ]
      })
      layerd.addGraphic(drill)
      const drill2 = new Creatar3d.Drill({
        radius: 1000,
        radialSegments: 64,
        position: '116.6, 31',
        layers: [
          { maxz: 10000, minz: 5000, render: '#ff0000' },
          { maxz: 5000, minz: 1, render: '#ffffff' }
        ]
      })
      layerd.addGraphic(drill2)
      layerd.layerEvent.on(Creatar3d.LayerEventType.CLICK, res => {
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


