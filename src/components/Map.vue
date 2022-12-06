<template>
  <div :id="`globe-container${mapKey}`" :class="['globe-container']">
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'globeViewer',

  props: {
    // 初始化配置参数
    url: String,

    // 地图唯一性标识
    mapKey: {
      type: String,
      default: '1'
    },

    // 自定义参数
    options: Object,

    // 是否分屏显示
    compare: {
      type: Boolean,
      default: false
    },

    // 是否插入到body元素上
    appendToBody: {
      type: Boolean,
      default: false
    },

    // 自定义css类名
    customClass: {
      type: String,
      default: ''
    }
  },

  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }

    this.initglobe(this.options)
  },

  destroy() {
    this[`map${this.mapKey}`].destroy()
    delete this[`map${this.mapKey}`]
  },

  methods: {
    initglobe(options) {
      if (this[`map${this.mapKey}`]) return
      // 创建三维地球场景
      const map = new Creatar3d.Viewer(`globe-container${this.mapKey}`, options) // divId 为一个div节点的Id属性值，如果不传入，会无法初始化3D场景
      this[`map${this.mapKey}`] = map
      this.$emit('onload', map)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.globe-container {
  height: 100%;
  overflow: hidden;
}

/* 重写Cesium的css */

/**cesium按钮背景色*/
.cesium-button {
  background-color: #3f4854;
  color: #e6e6e6;
  fill: #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  line-height: 32px;
}
</style>
