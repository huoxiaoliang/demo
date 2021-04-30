import LatLngPoint from '../core/LatLngPoint'
/**
 * 状态栏
 * @param {Cesium.Viewer} viewer 视图
 * @param {Object} options
 */
class InformationBar {
  constructor(viewer, options) {
    if (!Cesium.defined(options) || !Cesium.defined(viewer)) {
      throw new Cesium.DeveloperError('viewer is required.')
    }
    this._lastLegendUpdate = undefined
    this._removeSubscription = undefined
    this.viewer = viewer
    this.lng = undefined
    this.lat = undefined
    this.alt = undefined
    this.heading = undefined
    this.pitch = undefined
    this.roll = undefined
    this.enableInformationBar = Cesium.defined(options.enableInformationBar) ? options.enableInformationBar : true

    this.container = document.createElement('div')
    this.container.className = 'crt-information-bar'
    const bottomContainer = Cesium.defined(this.viewer.bottomContainer) ? this.viewer.bottomContainer : this.viewer
    bottomContainer.appendChild(this.container)
    Cesium.knockout.track(this, ['lng', 'lat', 'alt', 'heading', 'pitch', 'roll'])
    if (Cesium.defined(this.viewer) && Cesium.defined(this.viewer.cesiumWidget) && Cesium.defined(this.viewer.cesiumWidget.screenSpaceEventHandler)) {
      this.updateBarinfo()
    }
  }
  /**
   * 添加绑定事件
   */
  updateBarinfo() {
    const that = this
    const viewer = this.viewer
    this.viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(function(event) {
      const now = Cesium.getTimestamp()
      if (now < that._lastLegendUpdate + 250) {
        return
      }

      that._lastLegendUpdate = now
      const pick1 = new Cesium.Cartesian2(event.endPosition.x, event.endPosition.y)
      const cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick1), viewer.scene)
      if (Cesium.defined(cartesian)) {
        const point = LatLngPoint.fromCartesian(cartesian)
        that.lng = `经度: ${point.lng.toFixed(2)}°`
        that.lat = `纬度: ${point.lat.toFixed(2)}°`
        // that.alt = `高度: ${point.alt.toFixed(2)}m`
      }
      that.alt = `高度: ${(viewer.camera.positionCartographic.height / 1000).toFixed(2)}m`
      that.heading = `航向角: ${Cesium.Math.toDegrees(that.viewer.camera.heading).toFixed(2)}°`
      that.pitch = `俯仰角: ${Cesium.Math.toDegrees(that.viewer.camera.pitch).toFixed(2)}°`
      if (that.viewer.camera.roll) that.roll = `滚转角: ${Cesium.Math.toDegrees(that.viewer.camera.roll).toFixed(2)}°`
      else that.roll = `滚转角: 0° `
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    this.viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(function(event) {
      that.alt = `高度: ${(viewer.camera.positionCartographic.height / 1000).toFixed(2)}米`
    }, Cesium.ScreenSpaceEventType.WHEEL)

    this._removeSubscription = viewer.camera.changed.addEventListener(function(percentage) {
      const now = Cesium.getTimestamp()
      if (now < that._lastLegendUpdate + 250) {
        return
      }

      that._lastLegendUpdate = now
      // 获取相机的heading,pitch,roll角
      that.heading = `航向角: ${Cesium.Math.toDegrees(that.viewer.camera.heading).toFixed(2)}°`
      that.pitch = `俯仰角: ${Cesium.Math.toDegrees(that.viewer.camera.pitch).toFixed(2)}°`
      if (that.viewer.camera.roll) that.roll = `滚转角: ${Cesium.Math.toDegrees(that.viewer.camera.roll).toFixed(2)}°`
      else that.roll = `滚转角: 0° `
    })
  }

  /**
   * 创建界面元素
   */
  create() {
    const createFragmentFromTemplate = function(htmlString) {
      var holder = document.createElement('div')
      holder.innerHTML = htmlString
      var fragment = document.createDocumentFragment()
      while (holder.firstChild) {
        fragment.appendChild(holder.firstChild)
      }

      return fragment
    }

    const loadView = function(htmlString, container, viewModel) {
      container = Cesium.getElement(container)

      var fragment = createFragmentFromTemplate(htmlString)

      // Sadly, fragment.childNodes doesn't have a slice function.
      // This code could be replaced with Array.prototype.slice.call(fragment.childNodes)
      // but that seems slightly error prone.
      var nodes = []

      var i
      for (i = 0; i < fragment.childNodes.length; ++i) {
        nodes.push(fragment.childNodes[i])
      }

      container.appendChild(fragment)

      for (i = 0; i < nodes.length; ++i) {
        var node = nodes[i]
        if (node.nodeType === 1 || node.nodeType === 8) {
          Cesium.knockout.applyBindings(viewModel, node)
        }
      }

      return nodes
    }
    var testing
    if (this.enableInformationBar) {
      testing =
        ' <div data-bind="text: lng"></div>' +
        ' <div  data-bind="text: lat">纬度{{ lat }}°</div>' +
        ' <div  data-bind="text: alt">视角高{{ alt }}km</div>' +
        ' <div  data-bind="text: heading">航向角 {{ heading }}°</div>' +
        ' <div  data-bind="text: pitch">俯仰角 {{ pitch }}°</div>' +
        ' <div  data-bind="text: roll">滚转角 {{ roll }}°</div>'
    } else {
      testing =
        ' <div data-bind="text: lng"></div>' +
        ' <div  data-bind="text: lat">纬度{{ lat }}°</div>' +
        ' <div  data-bind="text: alt">视角高{{ alt }}km</div>' +
        ' <div  data-bind="text: heading">航向角 {{ heading }}°</div>' +
        ' <div  data-bind="text: pitch">俯仰角 {{ pitch }}°</div>' +
        ' <div  data-bind="text: roll">滚转角 {{ roll }}°</div>'
    }
    loadView(testing, this.container, this)
  }

  /**
   * 释放对象
   */
  destroy() {
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.WHEEL)
    if (this._removeSubscription) this._removeSubscription()
    if (Cesium.defined(this.container)) {
      this.container.parentNode.removeChild(this.container)
    }
    delete this.container
  }
}
/**
 * 混合扩展状态栏组间，可使用Cesium.Viewer.extend进行扩展
 * @param {Cesium.Viewer} viewer 视图
 * @param {*} options
 */
export default function ViewerCesiumInformationBarMixin(viewer, options) {
  if (!Cesium.defined(viewer)) {
    throw new Cesium.DeveloperError('viewer is required.')
  }

  var cesiumInformationBar = new InformationBar(viewer, options)
  cesiumInformationBar.create()
  var cesiumWidget = Cesium.defined(viewer.cesiumWidget) ? viewer.cesiumWidget : viewer

  Object.defineProperties(cesiumWidget, {
    cesiumInformationBar: {
      configurable: true,
      get: function() {
        return cesiumInformationBar
      }
    }
  })
}
