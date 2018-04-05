// pages/body/body.js
var CONST = require('../Commen/URL.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    body: [0, 0, 0, 0],
    phoneNumber: '',
    date: '2015-09-01',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let split = options.body.split(',')
    let phone = options.phone
    let birth = options.birth
    this.setData({
      body: split,
      phoneNumber: phone,
      date: birth,
      name: options.realname
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  change: function (e) {
    if (e.currentTarget.id == 'phoneNumber') {
      this.setData({
        phoneNumber: e.detail.value
      })
      return
    }


    let id = parseInt(e.currentTarget.id)
    let value = e.detail.value
    let newbody = this.data.body
    newbody[id] = value
    this.setData({
      body: newbody
    })


  },
  onNameChange: function (e) {
    let id = parseInt(e.currentTarget.id)
    let value = e.detail.value
    this.setData({
      name: value
    })
  },
  finished: function () {
    wx.request({
      url: CONST.URL.USER,
      method: "PUT",
      data: {
        ticket: wx.getStorageSync('ticket'),
        body: JSON.stringify(this.data.body),
        phone: this.data.phoneNumber,
        birth: this.data.date,
        realname: this.data.name
      },
      success: function (res) {
        if (res.data == 'OK') {
          wx.navigateBack({ delta: 1 })
        }
      },
      fail: function () {
        wx.showModal({
          title: '微信出错(body.finished)',
          content: '重启微信后，稍后再尝试',
        })
      }
    })
  }
})