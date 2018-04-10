var login = require('component/login/login.js')

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Welcome to 力量纵横Xtrength !',
    userInfo: { avatarUrl: '../../res/user.png' },
    isLogin: false
  },
  //事件处理函数
  bindViewTap: function () {
  },
  next: function (event) {
    login.func(event, this)
  },
  onLoad: function (option) {

    if (option.login == 'LOGIN_VALID') {
      this.setData({
        isLogin:false
      })
    }
  },
  onShareAppMessage: function () {

  }
  ,
  onShow: function () {
    
    var that = this
    /**设置用户信息 */
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        app.globalData.userInfo = res.userInfo
        that.setData({ userInfo: res.userInfo })
        /**检查是否还在登陆态中 */
        login.Check(that)
      },
      fail: function (res) {
        wx.navigateTo({ url: '../auth/auth', })
      }
    })
  }
})


