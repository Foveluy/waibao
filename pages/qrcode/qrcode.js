// pages/qrcode/qrcode.js
var CONST = require('../Commen/URL.js')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      course: app.globalData.courseForScan
    })
  },
  enter: function (e) {
    let id = e.currentTarget.id
    
    let ticket = wx.getStorageSync("ticket")
    let str = '?ticket=' + ticket + '&courseID=' + id
    wx.request({
      url: CONST.URL.SCAN + str,
      success: (res) => {
        switch (res.data) {
          case "ENTER_OK":
            wx.showToast({ title: '验证成功，欢迎来到力量纵横' })
            setTimeout(()=>{
              wx.navigateBack({ delta: 1 })
            },1000)
            
            break
          default:
            wx.showToast({ title: '服务器出错' })
            break
        }
      }
    })
  }

})