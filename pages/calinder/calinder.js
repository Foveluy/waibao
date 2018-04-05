// pages/calinder/calinder.js
var CONST = require("../Commen/URL.js")
var Commen = require("../Commen/Commen.js")
var Picker = require('./timePicker.js')
var network = require('./network.js')

Page({
  data: {
    startIndex: 0,
    endIndex: 0,
    multiArray: [],
    time: [],
    trainer: {},
    currentDate: ''
  },
  bindStartPickerChange: function (e) {
    this.setData({
      startIndex: e.detail.value
    })
  },
  bindEndPickerChange: function (e) {
    this.setData({
      endIndex: e.detail.value
    })
  },
  bookAsk: function (e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '您确定预约这节课了？',
      success: function (res) {
        if (res.confirm) {
          that.book(e)
        } else if (res.cancel) {
        }
      }
    })
  },
  book: function (e) {
    let that = this
    let trainer = this.data.trainer.trainer
    let startIndex = this.data.startIndex
    let endIndex = this.data.endIndex
    let date = this.data.currentDate

    if (parseInt(startIndex) > parseInt(endIndex)) {
      wx.showModal({
        title: '预约失败',
        content: '开始时间时间必须小于结束时间;结束时间必须大于开始时间',
      })
      return
    }
    network.postSelectTime(this, trainer, date, parseInt(startIndex) + 14, parseInt(endIndex) + 14)
  },
  onLoad: function (options) {
    let that = this
    let trainer = options.trainer
    let current = parseInt(options.date)
    let bundles = Picker.makeFresh()
    this.setData({
      time: bundles[0],
      multiArray: bundles[1],
      currentDate: Commen.GetDateStr(current, 'fullDate')
    })

    wx.request({
      url: CONST.URL.TRAINER + trainer,
      success: function (res) {
        that.setData({ trainer: res.data })
      }
    })

    //这一部分是请求教练已经安排的课务
    let date = Commen.GetDateStr(current, 'fullDate')
    network.postSelectTime(this, trainer, date, -1, -1)
  }

})

