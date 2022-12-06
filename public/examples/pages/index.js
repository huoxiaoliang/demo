/*
 * @Author: hxl
 * @Date: 2021-08-16 14:58:53
 * @LastEditTime: 2022-04-27 16:00:58
 * @LastEditors: hxl
 * @Description:
 */
var map = undefined
var layer = undefined
const baseMap = [
  {
    groupId: 10,
    id: 2000,
    name: '天地图影像',
    show: true,
    iconUrl: 'sdk/images/icon/天地图.png',
    layer: [
      {
        name: '底图',
        type: 'tdt',
        style: 'img_w'
      },
      {
        name: '注记',
        type: 'tdt',
        style: 'cia_w'
      }
    ]
  },
  {
    groupId: 10,
    id: 2001,
    name: '天地图电子',
    iconUrl: 'sdk/images/icon/天地图电子.png',
    layer: [
      {
        name: '底图',
        type: 'tdt',
        style: 'vec_w'
      },
      {
        name: '注记',
        type: 'tdt',
        style: 'cva_w'
      }
    ]
  },
  {
    groupId: 10,
    id: 2002,
    name: '百度影像',
    iconUrl: 'sdk/images/icon/百度.png',
    layer: [
      {
        name: '底图',
        type: 'baidu',
        style: 'img'
      },
      {
        name: '注记',
        type: 'baidu',
        style: 'vec'
      }
    ]
  },
  {
    groupId: 10,
    id: 2003,
    name: 'arcgis影像',
    iconUrl: 'sdk/images/icon/arcgis.png',
    layer: [
      {
        name: '底图',
        type: 'arcgis',
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
      }
    ]
  },
  {
    groupId: 10,
    id: 2004,
    name: 'mapbox',
    iconUrl: 'sdk/images/icon/mapbox.png',

    layer: [
      {
        type: 'mapbox_style',
        url: 'https://api.mapbox.com/styles/v1',
        username: 'huoxiaoliang',
        styleId: 'ckfdljnsa0d9y19sciu9cr4zb',
        accessToken: 'pk.eyJ1IjoiaHVveGlhb2xpYW5nIiwiYSI6ImNrZmRld290NjA1dmIycnQ3cjdsZGJ0ZzUifQ.Tj-V7Lr23YZSduFkdKS8nA',
        scaleFactor: true,
        credit: 'mapbox'
      }
    ]
  },
  {
    groupId: 10,
    id: 2005,
    name: '蓝色底图',
    iconUrl: 'sdk/images/icon/蓝色底图.png',

    layer: [
      {
        type: 'xyz',
        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
      }
    ]
  }
]
function initViewer(options = {}) {
  map = new Creatar3d.Viewer('viewer-container', { baseMap, ...options })
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
