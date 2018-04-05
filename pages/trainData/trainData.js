// pages/trainData/trainData.js
var CONST = require('../Commen/URL.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bodyData: [],
    max:[],
    dataUnit:{
      '引体向上':'个',
      '俯卧撑':'个',
      '负重引体向上':'个',
      '颈前深蹲':'kg',
      '高翻':'kg',
      '抓举':'kg',
      '挺举':'kg',
      '借力推':'kg',
      '借力挺':'kg',
      '双力臂':'个',
      '吊环双力臂':'个',
      '倒立':'秒',
      '倒立走':'步',
      '平板支撑':'秒',
      '反向平板支撑':'秒',
      '壶铃土耳其起立':'kg',
      '卧推':'kg', '硬拉':'kg', '深蹲':'kg'
    }
  },
  trainData: function (e) {
    let id = e.currentTarget.id
    if (id != '') {
      wx.navigateTo({ url: '../dataLog/dataLog?time=' + id })
    } else {
      wx.navigateTo({ url: '../dataLog/dataLog?time=none' })
    }

  },
  onShow: function () {
    let ticket = wx.getStorageSync('ticket')
    let that = this
    wx.request({
      url: CONST.URL.bodyData + '?ticket=' + ticket,
      success: function (res) {
        let bodyData = res.data.map((item, index) => {
          return Object.assign(
            {},
            item,
            { bodyData: JSON.parse(item.bodyData) })
        })
        that.setData({
          bodyData: bodyData
        })
        PRsetting(that)
      },
      fail: function () {
        wx.showModal({
          title: '微信出错(trainData)',
          content: '本错误来自于微信本身，请尝试重启微信',
        })
      }
    })
  }
})

function PRsetting(that) {
  console.log(that.data.bodyData)
  let newData = {}
  that.data.bodyData.forEach((item) => {
    item.bodyData.forEach((one) => {
      let key = one.body
      let kg = one.kg
      if (typeof newData[key] == 'undefined') {
        newData[key] = []
      }
      newData[key].push(kg)
    })
  })
  let js = []
  for (var row in newData) {

    let obj = { body: row, kg: Math.max.apply(Math,newData[row]) }
    js.push(obj)
  }
  console.log(js)
  that.setData({
    max:js
  })
}