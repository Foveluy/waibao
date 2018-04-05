var CONST = require("../Commen/URL.js")
var Commen = require("../Commen/Commen.js")



Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeAry: [],
    record: []
  },
  onLoad: function (options) {
    // let time = Commen.timeAry()

    // let that = this
    // wx.request({
    //   url: CONST.URL.PERSON + '?ticket=all',
    //   success: function (res) {
    //     that.setData({
    //       record: res.data,
    //       timeAry: time
    //     })
    //   }
    // })
  },

})