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
    this.opt = { imageryProvider: null, showlogo: { show: true } }
  },
  methods: {
    onload(map) {
      console.log('>>>>> 地图创建成功 >>>>', map)
      // map.destroy()
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
