const api = require('../../api/api.js')
const app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../api/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: 0,
    latitude: '',//纬度
    longitude: '',//经度
    inforList: [],
    name: ''//手动选择地址返回的位置名称
  },
  a:function(){
    wx.navigateTo({
      url: '../map/map',
    })
  },
  // 进入页面，检测是否授权地理位置
  authorize:function(){
    var that=this
    wx.getSetting({
      success(res){
        if (res.authSetting['scope.userLocation'] == undefined) { //表示 初始化进入该页面
            wx.getLocation({
              success: function(res) {
                that.goAddress()
              },
              fail:function(){
                wx.showModal({
                  title: '您已取消授权',
                  content: '为了给您带来更好的体验，请确认授权',
                  success: function(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success(res) {
                          console.log(res.authSetting)
                          if (res.authSetting['scope.userLocation'] == true) {
                            wx.showToast({
                              title: '授权成功',
                              icon: 'success',
                              duration: 1000
                            })
                            that.goAddress()
                          }
                        }
                      })
                    } else if (res.cancel) {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  },
                })
              }
            })
        } else if (res.authSetting['scope.userLocation'] == false) {//表示 非初始化进入该页面,且未授权
          wx.showModal({
            title: '请求授权当前位置',
            content: '为了给您带来更好的体验,请确认授权',
            success:function(res){
              if (res.confirm){
                wx.openSetting({
                  success(res) {
                    console.log(res.authSetting)
                    if (res.authSetting['scope.userLocation'] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                      })
                      that.goAddress()
                    }
                  }
                })
              } else if(res.cancel){
                wx.showToast({
                  title: '授权失败',
                  icon: 'none',
                  duration: 1000
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == true) { //表示 地理位置授权
          that.goAddress()
        }
      }
    })
  },
  // 获取地理位置
  goAddress:function(){
    var that=this
    wx.getLocation({
      success: function(res) {
        type: 'wgs84',
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        console.log(that.data.latitude, that.data.longitude)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: that.data.latitude,
            longitude: that.data.longitude
          },
          success: function (res) {//成功后的回调
            console.log(res);
            var currcity = res.result.address_component.city
            wx.setStorageSync('cityKey', currcity)
            that.mapAdress()
          },
        })
      },
    })
  },
  // 调用腾讯地图转化为地址
  mapAdress:function(){
     var that=this
     var arr = []
     wx.getStorage({
      key: 'cityKey',
      success(res) {
      var city=res.data
      api.searchAddress(city).then(res => {
        console.log(res)
        if (res.resultcode == '200') {
          that.setData({
            city: res.result.today.city,
            ymd: res.result.today.date_y,
            week: res.result.today.week,
            weather: res.result.today.weather,
            dressing_index: res.result.today.dressing_index,
            dressing_advice: res.result.today.dressing_advice,
            uv_index: res.result.today.uv_index,
            wash_index: res.result.today.wash_index,
            travel_index: res.result.today.travel_index,
            exercise_index: res.result.today.exercise_index,
            temperature: res.result.today.temperature,
            temp: res.result.sk.temp,
            wind_direction: res.result.sk.wind_direction,
            wind_strength: res.result.sk.wind_strength,
            time: res.result.sk.time
          })
        } else {
          wx.showToast({
            title: '查询不到该城市的信息',
          })
        }
        for (let item in res.result.future) {
          arr.push(item)
        }
        var inforList = []
        for (let i = 0; i < arr.length; i++) {
          inforList.push(res.result.future[arr[i]])
          inforList[i]['weatherIcon'] = 'http://pics.jiuziran.com/FrjF5Ds3VSmkT68vLcMs3wZHx4JY'
          for (let j in inforList) {
            if (inforList[j].weather == "晴") {
              inforList[j].weatherIcon = 'http://pics.jiuziran.com/FrjF5Ds3VSmkT68vLcMs3wZHx4JY'
            } else if (inforList[j].weather == "晴转阴" || inforList[j].weather == "晴转多云") {
              inforList[j].weatherIcon = 'http://pics.jiuziran.com/Fnd67r2q8qP6pE7knb3uFmEbOquc'
            } else if (inforList[j].weather == "阴") {
              inforList[j].weatherIcon = '/img/y.png'
            } else if (inforList[j].weather == "小雨") {
              inforList[j].weatherIcon = '/img/xy.png'
            } else if (inforList[j].weather == '多云') {
              inforList[j].weatherIcon = '/img/yunone.png'
            } else if (inforList[j].weather == '多云转阴') {
              inforList[j].weatherIcon = '/img/dzy.png'
            } else if (inforList[j].weather == "多云转晴") {
              inforList[j].weatherIcon = '/img/dzq.png'
            }
          }
        }
        that.setData({
          inforList: inforList
        })
      })
      console.log(city)    
    }
  })
  },
  // 手动定位
  currAddress: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        var str = res.name
        var name = str.substring(0, 2)
        wx.setStorageSync('cityKey', name)
        that.mapAdress()
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: app.globalData.MAP_KEY
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取页面高度
    var that = this
    that.authorize()
    // that.goAddress()
    wx.getSystemInfo({
      success(res) {
        that.setData({
          pageHeight: res.windowHeight
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})