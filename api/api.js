const des = require('des.js')
const app = getApp()
function apiRequest(url,data){
  console.log(data)
  return new Promise((resolve,reject) => {
    wx.request({
      url: url,
      data:data,
      header:{
        'content-type': 'json'
      },
      success: resolve,
      fail: reject
    })
  })
}
module.exports={
  // 查询天气
  searchAddress: function (city){
    var data={
      cityname: city,
      key: app.globalData.MY_KEY,
    }
    console.log(data)
    return apiRequest(app.globalData.API_URI,data)
    .then(res=>res.data)
  },
  //头条
  news: function () {
    var data = {
      key: app.globalData.NEWS,
      type: 'top'
    }
    console.log(data)
    return apiRequest(app.globalData.NEWS_API,data)
      .then(res => res.data)
  },
  //娱乐
  yule: function () {
    var data = {
      key: app.globalData.NEWS,
      type: 'yule'
    }
    console.log(data)
    return apiRequest(app.globalData.NEWS_API, data)
      .then(res => res.data)
  },
  //科技
  keji: function () {
    var data = {
      key: app.globalData.NEWS,
      type: 'keji'
    }
    console.log(data)
    return apiRequest(app.globalData.NEWS_API, data)
      .then(res => res.data)
  },
  // 体育
  tiyu: function () {
    var data = {
      key: app.globalData.NEWS,
      type: 'tiyu'
    }
    console.log(data)
    return apiRequest(app.globalData.NEWS_API, data)
      .then(res => res.data)
  },
  // 军事
  junshi: function () {
    var data = {
      key: app.globalData.NEWS,
      type: 'junshi'
    }
    console.log(data)
    return apiRequest(app.globalData.NEWS_API, data)
      .then(res => res.data)
  },
  // 财经
  caijing: function () {
    var data = {
      key: app.globalData.NEWS,
      type: 'caijing'
    }
    console.log(data)
    return apiRequest(app.globalData.NEWS_API, data)
      .then(res => res.data)
  },
  // 时尚
  shishang: function () {
    var data = {
      key: app.globalData.NEWS,
      type: 'shishang'
    }
    console.log(data)
    return apiRequest(app.globalData.NEWS_API, data)
      .then(res => res.data)
  },
  // 社会
  shehui: function () {
    var data = {
      key: app.globalData.NEWS,
      type: 'shehui'
    }
    console.log(data)
    return apiRequest(app.globalData.NEWS_API, data)
      .then(res => res.data)
  },
  // 国内
  guonei: function () {
    var data = {
      key: app.globalData.NEWS,
      type: 'guonei'
    }
    console.log(data)
    return apiRequest(app.globalData.NEWS_API, data)
      .then(res => res.data)
  },
  // 国际
  guoji: function () {
    var data = {
      key: app.globalData.NEWS,
      type: 'guoji'
    }
    console.log(data)
    return apiRequest(app.globalData.NEWS_API, data)
      .then(res => res.data)
  },
}


// const app = getApp()

// function everyRequest(url, data) {
//   return new Promise((r, j) => {
//     wx.showLoading({
//       title: '加载中',
//     })
//     wx.request({
//       url: url,
//       data: data,
//       header: {
//         'content-type': 'json'
//       },
//       success(r) {
//         wx.hideLoading()
//       },
//       fail(j) {
//         setTimeout(function () {
//           wx.showLoading({
//             title: '数据加载失败，请检查网络连接',
//           })
//         }, 2000)
//       }
//     })
//   })
// }

// module.exports = {
//   // 查询天气
//   searchAddress: function (city) {
//     var data = {
//       cityname: city,
//       key: app.globalData.MY_KEY,
//     }
//     console.log(data)
//     return everyRequest(app.globalData.API_URI, data)
//       .then(res => res.data)
//   },
//   // 娱乐新闻
//   news: function () {
//     var data = {
//       key: app.globalData.NEWS,
//       type: 'top'
//     }
//     console.log(data)
//     return everyRequest(app.globalData.NEWS_API, data)
//       .then(res => res.data)
//   }
// }
