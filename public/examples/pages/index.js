/*
 * @Author: hxl
 * @Date: 2021-08-16 14:58:53
 * @LastEditTime: 2022-04-06 17:38:52
 * @LastEditors: hxl
 * @Description:
 */
var map = undefined
var layer = undefined

function initViewer() {
  map = new Creatar3d.Viewer('viewer-container')
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
    const lng = 117.38105869 + Math.random() * 0.05
    const lat = 31.10115627 + Math.random() * 0.05
    list.push(new Creatar3d.Position(lng, lat, 200))
  }
  return list
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
