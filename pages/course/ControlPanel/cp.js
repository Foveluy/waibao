var Commen = require('../../Commen/Commen.js')
var CONST = require('../../Commen/URL.js')

var app = getApp()

var img = [
  'https://zh.9uhxir.top/uploads/0001.jpg',
  'https://zh.9uhxir.top/uploads/0002.jpg',
  'https://zh.9uhxir.top/uploads/0003.jpg',
  'https://zh.9uhxir.top/uploads/0004.jpg',
  'https://zh.9uhxir.top/uploads/0005.jpg',
  'https://zh.9uhxir.top/uploads/0006.jpg',
  'https://zh.9uhxir.top/uploads/0007.jpg'
]

function queryCourse(that, fullDate, trainer) {
  wx.showNavigationBarLoading()
  
  wx.request({
    url: CONST.URL.COURSE + '?date=' + fullDate + '&trainer=' + trainer,
    success: res => {
      wx.hideNavigationBarLoading()
      var imgMap = res.data.map((item, index) => {
        let num = index
        if (num > 6) num = 0
        return img[num]
      })

      that.setData({
        CourseList: res.data,
        backgroundimg: imgMap
      })
    }
  })
}

function selectDays(that, ID) {
  var newObj = Object.assign({}, that.data.ControlPanel, { currentSelect: ID })

  that.setData({ ControlPanel: newObj })

  let currentSelect = parseInt(ID)
  let fullDate = Commen.GetDateStr(currentSelect, 'fullDate')
  queryCourse(that, fullDate, that.data.currentTrainer)
}

function initDate(that) {
  let day = Commen.GetSevenDate()
  let newObj = Object.assign({}, that.data.ControlPanel, { DateAry: day })
  that.setData({ ControlPanel: newObj })

  selectDays(that, 0)
}

function scan(that, res) {
  let ticket = wx.getStorageSync('ticket')
  let today = Commen.GetDateStr(0, 'fullDate')

  wx.scanCode({
    success: res => {
      let url = res.result
      console.log(url)
      wx.showLoading({ title: '扫码成功，马上开始训练~' })
      wx.request({
        url: url,
        method: 'POST',
        data: { ticket: ticket, date: today },
        success: function(res) {
          wx.hideLoading()
          app.globalData.courseForScan = res.data
          wx.navigateTo({
            url: '../qrcode/qrcode'
          })
          console.log(app.globalData.courseForScan)
        },
        fail: function() {
          wx.hideLoading()
          wx.showToast({ title: '二维码无效' })
        }
      })
    },
    fail: function() {
      wx.showModal({
        title: '二维码扫描(scanCode)',
        content: '没有进行二维码扫描操作或者二维码扫描无效'
      })
    }
  })
}

module.exports.selectDays = selectDays
module.exports.initDate = initDate
module.exports.scan = scan
module.exports.Img = img
