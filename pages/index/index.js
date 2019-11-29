const api = require('../../api/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:'',
    pageHeight:0,
  },
  // 查询
  tapSearch:function(e){
    var that = this
    var val = val
    api.searchAddress(val).then(res=>{
      console.log(res)
      if (res.resultcode=='200'){
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
        })
        that.setData({
          val:val
        })
        console.log(that.data.val)
      }else{
        wx.showToast({
          title: '查询不到该城市的信息',
        })
      }
     
    })
  },
  goSeven:function(){
    var that=this
    var city = that.data.val
    wx.navigateTo({
      url: '../seven/seven?city=' + city,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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