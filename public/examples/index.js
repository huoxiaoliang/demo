/*
 * @Author: hxl
 * @Date: 2021-08-16 14:58:53
 * @LastEditTime: 2022-03-28 17:13:43
 * @LastEditors: hxl
 * @Description:
 */
var map = undefined
var layer = undefined

function initViewer() {
  map = new Creatar3d.Viewer('viewer-container')
  map.setOptions({
    enableFxaa: true, // 抗锯齿
    globe: {
      depthTestAgainstTerrain: true // 开启深度检测
    },
    cameraController: {
      enableCollisionDetection: false // 相机可进入地下
    },
    widgetController: {
      enableCompass2: true, // 指北针可见
      enableStateBar: true, // 状态栏可见
      enableDistanceLegend: true // 比例尺可见
    }
  })
}

function getJSON(url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'json'
  xhr.open('get', url, true)
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(xhr.response)
    } else {
      throw new Error(xhr.statusText)
    }
  }
  xhr.send()
}

function generatePosition(num) {
  const list = []
  for (let i = 0; i < num; i++) {
    const lng = 117.38105869 + Math.random() * 0.1
    const lat = 31.10115627 + Math.random() * 0.1
    list.push(new Creatar3d.Position(lng, lat, 50))
  }
  return list
}
