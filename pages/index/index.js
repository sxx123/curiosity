const api = require('../../api/api.js')
const app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../api/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    pageHeight:0,
    latitude:'',//纬度
    longitude:'',//经度
    city:'',
    inforList:[],
    name:''//手动选择地址返回的位置名称
  },
  // 定位跳转
  currAddress:function(){
    var that=this
    wx.chooseLocation({
      success:function(res){
        // console.log(res.address)
        // console.log(res.latitude)
        // console.log(res.longitude)
        // console.log(res.name)
        that.setData({
          name: res.name
        })
        console.log(that.data.name)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key:app.globalData.MAP_KEY
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
         pageHeight: res.windowHeight
        }) 
      }
    })
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        qqmapsdk.reverseGeocoder({
          success: function (res) {//成功后的回调
            console.log(res);
            that.setData({
              city: res.result.ad_info.city
            })
            var city = that.data.city
            var arr = []
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
              for (let i = 0; i <arr.length; i++) {
                inforList.push(res.result.future[arr[i]])
                inforList[i]['weatherIcon'] ='http://pics.jiuziran.com/FrjF5Ds3VSmkT68vLcMs3wZHx4JY'
                for (let j in inforList ) {
                  if (inforList[j].weather == "晴") {
                    inforList[j].weatherIcon = 'http://pics.jiuziran.com/FrjF5Ds3VSmkT68vLcMs3wZHx4JY'
                  } else if (inforList[j].weather == "晴转阴" || inforList[j].weather == "晴转多云") {
                    inforList[j].weatherIcon = 'http://pics.jiuziran.com/Fnd67r2q8qP6pE7knb3uFmEbOquc'
                  } else if (inforList[j].weather == "阴") {
                    inforList[j].weatherIcon = '/img/y.png'
                  } else if (inforList[j].weather == "小雨") {
                    inforList[j].weatherIcon = '/img/xy.png'
                  } else if (inforList[j].weather=='多云'){
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
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {
          }
        })
      },
      fail(res){
        console.log(res)
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