var CONST = require('../Commen/URL.js')
var Commen = require("../Commen/Commen.js")

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    records: [],
    person: [],
    credit: 0,
    admin: 'false',
    trainer: 'false',
    body: [],
    timeAry: [],
    phone: '',
    showpersonCourse: false,
    showTCourse: false,
    birth: '',
    realname: ''
  },

  onLoad: function () {
    let time = Commen.timeAry()
    this.setData({
      timeAry: time
    })
  },

  onShow: function () {
    wx.showNavigationBarLoading()

    this.setData({
      userInfo: app.globalData.userInfo
    })
    let ticket = wx.getStorageSync('ticket')
    let cc = []
    wx.request({
      url: CONST.URL.COURSE_RECORD + ticket,
      success: (res) => {
        wx.hideNavigationBarLoading()

        let credit = res.data.credit
        let record = res.data.record
        let admin = res.data.admin
        let trainer = res.data.trainer
        let body = res.data.body
        let birth = res.data.birthdate
        let realname = res.data.realname
        console.log(res.data)
        this.setData({
          credit: credit,
          records: record.reverse(),
          person: res.data.personRecord.reverse(),
          admin: admin,
          trainer: trainer,
          body: JSON.parse(body),
          phone: res.data.phone,
          birth: birth,
          realname: realname
        })
      }
    })
  },
  showPersonCourse: function () {
    this.setData({
      showpersonCourse: !this.data.showpersonCourse
    })
  },
  showTCourse: function () {
    this.setData({
      showTCourse: !this.data.showTCourse
    })
  },
  admin: function () {
    wx.navigateTo({
      url: '../admin/admin'
    })
  },
  toCommit: function (option) {
    let name = option.currentTarget.id
    let courseId = option.currentTarget.dataset.courseid
    wx.navigateTo({
      url: '../commit/commit?trainer=' + name + '&courseID=' + courseId + '&admin=' + this.data.admin,
    })
  },
  traineData: function () {
    wx.navigateTo({
      url: '../trainData/trainData',
    })
  },
  bookme: function () {
    wx.navigateTo({
      url: '../bookme/bookme',
    })

  },
  userCard: function () {
    wx.navigateTo({
      url: '../body/body?body=' + this.data.body + '&phone=' + this.data.phone + '&birth=' + (this.data.birth ? this.data.birth : '2015-1-1') + '&realname=' + this.data.realname
    })
  }

})