// pages/commit/commit.js
var CONST = require("../Commen/URL.js")

function getData(that, trainer) {
  wx.request({
    url: CONST.URL.COMMIT + trainer + '&ticket=' + wx.getStorageSync('ticket'),
    success: function (res) {

      let newObj = res.data.commits.filter((item) => {
        if (item.commitType == '1') {
          if (item.admin == 'true') {
            return item
          }
          if (item.admin == 'false') {
            if (item.yours == 'true') {
              return item
            }
          }
        } else {
          return item
        }
      })

      that.setData({
        trainer: res.data.trainer,
        commit: newObj.reverse()
      })
    }
  })
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    trainer: {},
    commit: [],
    inputValue: '',
    tmpTrainer: '',
    courseiD: '',
    picker: ['评论', '投诉'],
    idx: 0,
    admin: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let split = options.courseID.split('-')
    if (typeof split == 'undefined') {
      this.setData({
        tmpTrainer: options.trainer,
        courseiD: options.courseID,
        admin: options.admin
      })
    }else{
      this.setData({
        tmpTrainer: options.trainer,
        courseiD: split,
        admin: options.admin
      })
    }
    

  },
  onShow: function () {
    var that = this
    let trainer = this.data.tmpTrainer
    getData(that, trainer)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  wirteCommit: function (e) {
    var that = this
    let ticket = wx.getStorageSync('ticket')
    let value = e.detail.value
    let commitType = this.data.idx

    this.setData({ inputValue: '' })
    wx.request({
      url: CONST.URL.COMMIT,
      method: "POST",
      data: {
        ticket: ticket,
        commit: value,
        trainer: that.data.trainer.trainer,
        courseID: that.data.courseiD,
        commitType: commitType
      },
      success: function (res) {
        switch (res.data) {
          case 'OK':
            wx.showToast({ title: '评论成功' })
            break
          case 'COMMITED':
            wx.showToast({ title: '你已经评论过了～' })
            break
          case 'NO_ENTER':
            wx.showToast({ title: '你还没有进场上课，不能评价～' })
            break
          case 'FAIL':
            wx.showToast({ title: '服务器出错' })
            break
          default:
            break;
        }
        getData(that, that.data.trainer.trainer)
      }
    })
  },
  pickerChange: function (e) {
    this.setData({
      idx: e.detail.value
    })
    if (e.detail.value == 1) {
      wx.showModal({
        title: '投诉说明',
        content: '您对教练的投诉不会显示在公共评论区',
      })
    }

  }

})