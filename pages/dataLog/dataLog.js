// pages/dataLog/dataLog.js
var CONST = require('../Commen/URL.js')

Page({
  data: {
    form: [{
      index: 0,
      Type: '',
      body: '卧推',
      kg: 0
    }],
    time: "none",
    array: ['卧推', '硬拉', '深蹲', '引体向上', '俯卧撑', '负重引体向上', '颈前深蹲', '高翻', '抓举', '挺举', '借力推', '借力挺', '双力臂', '吊环双力臂', '倒立', '倒立走', '平板支撑', '反向平板支撑','壶铃土耳其起立'],
  },

  onLoad: function (e) {
    let time = e.time
    if (time != 'none') {
      let ticket = wx.getStorageSync('ticket')
      let that = this
      wx.request({
        url: CONST.URL.bodyData + '?ticket=' + ticket + '&time=' + time,
        method: "GET",
        success: function (res) {

          let bodyData = res.data.map((item, index) => {
            return JSON.parse(item)
          })
          that.setData({
            form: bodyData[0].reverse(),
            time: time
          })
        },
        fail: function () {
          wx.showModal({
            title: '微信出错(datalog:onLoad)',
            content: '本错误来自于微信本身，请尝试重启微信',
          })
        }
      })
    }
  },

  bindPickerChange: function (e) {
    let index = parseInt(e.currentTarget.id)
    let num = e.detail.value
    let tmpData = this.data.form
    tmpData[index].index = num
    tmpData[index].body = this.data.array[num]
    this.setData({
      form: tmpData
    })

  },
  bindInputBlur: function (e) {
    let index = parseInt(e.currentTarget.id)
    let num = e.detail.value
    let tmpData = this.data.form
    tmpData[index].kg = num
    this.setData({
      form: tmpData
    })
  },
  Delete: function (e) {
    let index = parseInt(e.currentTarget.id)
    let tmp = this.data.form
    this.data.form[index].Type = 'delete'

    this.setData({
      form: this.data.form
    })

    let newData = this.data.form.filter((item, idx) => {
      if (idx != index) {
        return item
      }
    })

    var that = this
    setTimeout(() => {
      that.setData({ form: newData })
    }, 400)

  },

  add: function () {
    let Data = [...this.data.form, {
      index: 0,
      Type: '',
      body: '卧推',
      kg: 0
    }]

    let newData = Data.filter((item, index) => {
      if (item.Type != 'delete') return item
    })

    this.setData({ form: newData })
  },
  finished: function () {
    let ticket = wx.getStorageSync('ticket')
    let data = JSON.stringify(this.data.form)
    console.log(this.data.time)
    if (this.data.time != 'none') {
      wx.request({
        url: CONST.URL.bodyData,
        method: "PUT",
        data: { ticket: ticket, bodyData: data, time: this.data.time },
        success: function () {
          wx.navigateBack({})
        },
        fail: function () {
          wx.showModal({
            title: '微信出错',
            content: '本错误来自于微信本身，请尝试重启微信',
          })
        }
      })

    } else {
      wx.request({
        url: CONST.URL.bodyData,
        method: "POST",
        data: { ticket: ticket, bodyData: data },
        success: function () {
          wx.navigateBack({})
        },
        fail: function () {
          wx.showModal({
            title: '微信出错(datalog:finished)',
            content: '本错误来自于微信本身，请尝试重启微信',
          })
        }
      })
    }
  },
  Del: function () {
    let ticket = wx.getStorageSync('ticket')
    let data = JSON.stringify(this.data.form)
    wx.request({
      url: CONST.URL.bodyData,
      method: "DELETE",
      data: { ticket: ticket, bodyData: data, time: this.data.time},
      success: function (res) {
        if (res.data == 'OK') 
        { wx.navigateBack({})}
        else if (res.data == 'fail'){
          wx.showModal({ title: '登陆有问题，请稍后尝试' })
        }
        else{
          wx.showModal({ title: '服务器故障，请联系管理员' })
        }
        
      },
      fail: function (res) {
        wx.showModal({ title: '((datalog:Del))微信网络模块故障，请重启微信'})
      }
    })
  }
})

