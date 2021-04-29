export default class LatLngPoint {
  constructor(lng, lat, alt) {
    this.lng = lng
    this.lat = lat
    this.alt = alt
  }

  static fromCartesian(cartesian) {
    const cartgrahpicPos = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian, new Cesium.Cartesian3())
    return new LatLngPoint(Cesium.Math.toDegrees(cartgrahpicPos.longitude), Cesium.Math.toDegrees(cartgrahpicPos.latitude), cartgrahpicPos.height)
  }
}
