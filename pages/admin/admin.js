// pages/admin/admin.js
var CONST = require("../Commen/URL.js")


Page({

  data: {
    user: [],
    trainer: [],
    value: '',
    unitPrice: ''
  },

  onLoad: function (options) {
    wx.request({
      url: CONST.URL.USER,
      success: (res) => {
        console.log(res.data.trainer)
        this.setData({
          user: res.data.user,
          trainer: res.data.trainer
        })
      }
    })
  },

  topup: function (res) {
    wx.showLoading({ title: '充值中' })
    wx.request({
      url: CONST.URL.USER,
      method: "POST",
      data: { id: res.currentTarget.id, value: res.detail.value },
      success: (res) => {
        wx.hideLoading()
        wx.showToast({ title: '充值成功' })
        this.setData({
          user: res.data,
          value: ''
        })
      },
      fail: () => {
        wx.showToast({ title: '充值失败' })
      }
    })
  },
  unitPrice: function (e) {
    const id = e.currentTarget.id
    const value = e.detail.value
    wx.showLoading({ title: '设置中' })
    wx.request({
      url: CONST.URL.USER + '?unitPrice=1',
      method: "POST",
      data: { id: id, value: value },
      success: (res) => {
        wx.hideLoading()
        wx.showToast({ title: '设置成功' })
        this.setData({
          user: res.data,
          unitPrice: ''
        })
      },
      fail: () => {
        wx.showToast({ title: '设置失败' })
      }
    })

  }

})