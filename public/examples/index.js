/*
 * @Author: hxl
 * @Date: 2021-08-16 14:58:53
 * @LastEditTime: 2021-08-16 15:28:16
 * @LastEditors: hxl
 * @Description: 
 */

function getJSON(url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'json'
  xhr.open('get', url, true)
  xhr.onload = function() {
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
    list.push(new Creatar3d.Position(lng, lat))
  }
  return list
}
