const des=('des.js')
const app = getApp()
function apiRequest(url,data){
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
  searchAddress: function (city){
    var data={
      cityname: city,
      key: app.globalData.MY_KEY,
    }
    console.log(data)
    return apiRequest(app.globalData.API_URI,data)
    .then(res=>res.data)
  }
}