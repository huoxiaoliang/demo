<template>
  <div :id="`globe-container${mapKey}`" :class="['globe-container']">
    <div></div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as creatar from '../../Source/creatar.js'
// import * as creatar from '../../Build/creatar.js'
import '../../Source/creatar.css'
// 为了方便使用,绑定到原型链，在其他vue文件，直接 this.globe 来使用
Vue.prototype.creatar = creatar
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

      const mapOptions = {
        ...options,
        ...this.options
      }

      // 创建三维地球场景
      console.log(creatar)
      var map = new creatar.Map(`globe-container${this.mapKey}`, mapOptions)
      this[`map${this.mapKey}`] = map

      // 挂载到全局对象下，所有组件通过 this.map 访问
      // Vue.prototype[`map${this.mapKey}`] = map

      // 抛出事件
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
