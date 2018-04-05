var Tap = require("tap/tap.js")
var CONST = require("../Commen/URL.js")

Page({
  data: {
    courseDetail: {
      content: [{
        title: '加载中...',
        bref: '加载中...',
        tag: [{
          title: '加载中...',
          bref: '加载中...'
        }, {
          title: '加载中...',
          bref: '加载中...'
        }]
      }],
      trainer: {},
    },
    id: '',
    topImg: [
      'https://zh.9uhxir.top/uploads/001.jpg',
      'https://zh.9uhxir.top/uploads/002.jpg',
      'https://zh.9uhxir.top/uploads/003.jpg',
      'https://zh.9uhxir.top/uploads/004.jpg',
      'https://zh.9uhxir.top/uploads/005.jpg',
      'https://zh.9uhxir.top/uploads/006.jpg',
      'https://zh.9uhxir.top/uploads/007.jpg',
      'https://zh.9uhxir.top/uploads/008.jpg',
      ]
  },
  onLoad: function (pramas) {
    this.setData({
      id: pramas.id
    })
    var that = this
    var courseModel = pramas.courseModel
    console.log(courseModel)
    wx.request({
      url: CONST.URL.TRAINER + pramas.trainer,
      method: 'GET',
      success: (res) => {
        console.log(res.data)
        let obj = Object.assign({}, this.data.courseDetail, { trainer: res.data })
        that.setData({
          courseDetail: obj
        })
      }
    })
    wx.request({
      url: CONST.URL.COURSE_MODEL,
      method: 'GET',
      success: (res) => {
        let filter = res.data.filter((item, index) => {
          if (courseModel == item.id) {
            return item
          }
        })

        let parser = JSON.parse(filter[0].courseModel)
        console.log(parser)
        let obj = Object.assign({}, this.data.courseDetail, { content: parser })
        that.setData({
          courseDetail: obj
        })
      }
    })
  },
  bookClick: function () {
    Tap.Click(this)
  },
  naviBack: function () { wx.navigateBack({}) }

})