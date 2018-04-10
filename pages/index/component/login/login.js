var CONST = require('../../../Commen/URL.js')
var app = getApp()

function loginCheck(that) {


  wx.request({
    url: CONST.URL.LOGIN + '/check',
    method: 'POST',
    data: {
      jwt_code: wx.getStorageSync('ticket')
    },
    success: function (res) {
      if (res.data.state === 'ok') {
        that.setData({ isLogin: true })
        wx.switchTab({ url: '../course/course' })
      } else {
        that.setData({ isLogin: false })
      }
    }
  })

}


function loginClick(event, that) {
  /** 登陆*/
  that.setData({ isLogin: true })
  wx.showLoading({ title: '登陆中' })
  wx.login({
    success: function (res) {
      /** 发送登陆code给服务器*/

      wx.request({
        url: CONST.URL.LOGIN,
        method: 'POST',
        data: {
          Type: CONST.TYPE.CODE,
          code: res.code,
          userInfo: app.globalData.userInfo
        },
        success: function (res) {
          that.setData({ isLogin: false })
          wx.hideLoading()
          if (res.data.state !== 'ok') {
            wx.showModal({ title: '服务器请求失败,请重试' })
            return
          }
          let ticket = res.data.ticket
          wx.setStorageSync('ticket', ticket)
          wx.switchTab({ url: '../course/course' })
          console.log(wx.getStorageSync('ticket'))
        }, fail: function () {

          wx.showModal({
            title: '微信出错(login)',
            content: '本错误来自于微信本身，请尝试重启微信',
          })
        }
      })
    },
    fail: function () {
      wx.showModal({
        title: '微信出错',
        content: '本错误来自于微信本身，请尝试重启微信',
      })
    }
  })
}

module.exports.func = loginClick
module.exports.Check = loginCheck

