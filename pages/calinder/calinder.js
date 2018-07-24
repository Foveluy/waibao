// pages/calinder/calinder.js
var CONST = require('../Commen/URL.js')
var Commen = require('../Commen/Commen.js')
var Picker = require('./timePicker.js')
var network = require('./network.js')

Page({
  data: {
    startIndex: 0,
    endIndex: 0,
    multiArray: [],
    time: [],
    trainer: {},
    currentDate: '',
    currentSelect: 0,
    trainerName: ''
  },
  timeSelect: function(e) {
    const index = parseInt(e.currentTarget.id)

    let plus = 0
    const newArray = this.data.time.map((t, i) => {
      if (index === i || index === i - 1 || index === i - 2) {
        return { ...t, pick: true }
      }
      if (index >= 26) {
        if (i === 26 || i === 27 || i === 28) {
          return { ...t, pick: true }
        }
      }

      return { ...t, pick: false }
    })
    this.setData({
      time: newArray
    })
  },
  bindStartPickerChange: function(e) {
    this.setData({
      startIndex: e.detail.value
    })
  },

  bindEndPickerChange: function(e) {
    this.setData({
      endIndex: e.detail.value
    })
  },
  bookAsk: function(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '您确定预约这节课了？',
      success: function(res) {
        if (res.confirm) {
          that.book(e)
        } else if (res.cancel) {
        }
      }
    })
  },
  book: function(e) {
    let that = this
    let trainer = this.data.trainer.trainer
    let date = Commen.GetDateStr(parseInt(this.data.currentSelect), 'fullDate')

    let startIndex = 0
    let endIndex = 0

    const selectTime = []
    this.data.time.forEach((e, index) => {
      if (e.pick) selectTime.push(index)
    })
    startIndex = selectTime[0]
    endIndex = selectTime[2]

    if (parseInt(startIndex) > parseInt(endIndex)) {
      wx.showModal({
        title: '预约失败',
        content: '开始时间时间必须小于结束时间;结束时间必须大于开始时间'
      })
      return
    }
    network.postSelectTime(this, trainer, date, parseInt(startIndex) + 14, parseInt(endIndex) + 14)
  },
  selectDay: function(e) {
    //这一部分是请求教练已经安排的课务
    let date = Commen.GetDateStr(parseInt(e.currentTarget.id), 'fullDate')
    this.setData({
      currentSelect: e.currentTarget.id
    })
    network.postSelectTime(this, this.data.trainerName, date, -1, -1)
  },
  onLoad: function(options) {
    let that = this
    let trainer = options.trainer
    let current = parseInt(options.date)
    let bundles = Picker.makeFresh()
    this.setData({
      time: bundles[0],
      multiArray: bundles[1],
      currentDate: Commen.GetDateStr(current, 'fullDate'),
      DateAry: Commen.GetSevenDate(),
      currentSelect: current,
      trainerName: trainer
    })

    wx.request({
      url: CONST.URL.TRAINER + trainer,
      success: function(res) {
        that.setData({ trainer: res.data })
      }
    })

    //这一部分是请求教练已经安排的课务
    let date = Commen.GetDateStr(current, 'fullDate')

    network.postSelectTime(this, trainer, date, -1, -1)
  }
})
