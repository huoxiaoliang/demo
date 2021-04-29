import Token from '../const/Token'
// 导入修改版导航盘插件
import CesiumNavigation from '../widget/navigation'
import ViewerCesiumInformationBarMixin from '../widget/informationBar'
/**
 * @typedef {Object}Map.ConstructorOptions
 *
 * 地图配置项
 *
 * @property {Boolean} [navigation=true] 显示导航盘
 * @property {Object} [showlogo={show:true,logoHref,logoSrc}] 显示logo
 * @property {Object} [mapRange={minx:100.0,miny:-20.0,maxx:130.0,maxy:90.0}] 地图默认范围
 *
 */
/**
 * 地图类
 * @constructor
 * @param {String } container 地图div容器的id
 * @param {Map.ConstructorOptions} [options] 参数对象
 */
export default class Map {
  constructor(container, options) {
    const { defined, DeveloperError } = Cesium
    if (!defined(container)) {
      throw new DeveloperError('container is required.')
    }
    creatar_init()
    const defaultOpt = {
      navigation: true,
      infoBar: true,
      animation: false,
      timeline: false,
      homeButton: false,
      navigationHelpButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      infoBox: false,
      geocoder: false,
      fullscreenButton: false,
      selectionIndicator: false,
      contextOptions: {
        //cesium状态下允许canvas转图片convertToImage
        webgl: {
          alpha: true,
          depth: false,
          stencil: true,
          antialias: true,
          premultipliedAlpha: true,
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: true
        },
        allowTextureFilterAnisotropic: true
      }
    }
    options = Object.assign(defaultOpt, options)
    this.options = options
    this._viewer = new Cesium.Viewer(container, defaultOpt)
    this._initControls()
  }
  /**
   * 初始化基础插件
   */
  _initControls() {
    const { defined } = Cesium

    // 初始化地图默认位置
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = this.options.mapRange
      ? Cesium.Rectangle.fromDegrees(this.options.mapRange.minx, this.options.mapRange.miny, this.options.mapRange.maxx, this.options.mapRange.maxy)
      : Cesium.Rectangle.fromDegrees(100.0, -20.0, 130.0, 90.0)
    this.camera.flyHome(1)

    // 加载导航盘
    if (defined(this.options.navigation) && defined(this._viewer)) {
      CesiumNavigation(this._viewer)
    }
    //状态栏
    if (defined(this.options.infoBar)) this._viewer.extend(ViewerCesiumInformationBarMixin, {})

    //设置logo
    this._setLogo()
  }
  /**
   * 设置logo
   */
  _setLogo() {
    if (this.options.showlogo?.show) {
      const logoHref = this.options.showlogo.logoHref || 'http://creatar.com'
      const logoSrc = this.options.showlogo.logoSrc || 'http://creatar.com/data/logo/logo.png'
      // 实例化默认logo
      const defaultCredit = new Cesium.Credit(`<a href="${logoHref}" target="_blank"><img src="${logoSrc}" title="Cesium ion"/></a>`, true)
      Cesium.CreditDisplay.cesiumCredit = defaultCredit
      this.viewer.scene.frameState.creditDisplay._defaultCredit = defaultCredit
      this.viewer.scene.frameState.creditDisplay.container.style.display = 'block'
    } else {
      this.viewer.scene.frameState.creditDisplay.container.style.display = 'none'
    }
  }

  addLayer() {}

  destroy() {
    if (this._viewer._cesiumWidget.cesiumNavigation) {
      this._viewer._cesiumWidget.cesiumNavigation.destroy()
    }

    if (this._viewer._cesiumWidget.cesiumInformationBar) {
      this._viewer._cesiumWidget.cesiumInformationBar.destroy()
    }
    this._viewer.destroy()
  }
}
Object.defineProperties(Map.prototype, {
  /**
   * 获取Map对应的Cesium原生的Viewer对象.
   * @memberof Map.prototype
   * @type {Cesium.Viewer}
   * @readonly
   */
  viewer: {
    get: function() {
      return this._viewer
    }
  },
  /**
   * 获取相机
   * @memberof Map.prototype
   * @type {Cesium.Camera}
   * @readonly
   */
  camera: {
    get: function() {
      return this.viewer.camera
    }
  }
})

function creatar_init(_) {
  Cesium.Ion.defaultAccessToken = Token.ion
}
