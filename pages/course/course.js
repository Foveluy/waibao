// pages/course/course.js
var Modal = require('Modal/Modal.js')
var ControlPanel = require('ControlPanel/cp.js')
var Trainer = require('ControlPanel/Trainer.js')
var Commen = require("../Commen/Commen.js")

Page({
  data: {
    ModalUse: {
      opacity: 0,
      Pevents: 'none',
      Click: '',
    },
    ControlPanel: {
      currentSelect: 0,
      DateAry: []
    },
    trainerList: [],
    personCourse: [],
    currentTrainer: '',
    CourseList: [],
    backgroundimg: [],
    timeAry: []
  },
  ChangeTrainer: function (e) {
    Trainer.Trainer(e, this)
  },
  BookedTrainer: function (e) {
    Trainer.BookTrainer(e, this)
  },
  qrScan: function (res) {
    ControlPanel.scan(this)
  },
  onLoad: function () {
    let time = Commen.timeAry()
    this.setData({timeAry: time})
  },
  onShow: function () {
    /**初始化控制面板时间 */
    ControlPanel.initDate(this)
    Trainer.getTrainer(this)
    Trainer.personCourse(this)
  },
  selectDay: function (event) {
    /**选择日期 */
    ControlPanel.selectDays(this, event.currentTarget.id)
    Trainer.personCourse(this, parseInt(event.currentTarget.id))
  }
  ,
  CheckStudent: function (event) {
    this.setData({
      ModalUse: {
        opacity: 1,
        Pevents: 'auto',
        Click: event.currentTarget.id
      }
    })
  },
  modalClick: function () {
    Modal.Click(this)
  },
  bookClick: function (event) {
    console.log(event)
    let ID = '?id=' + event.currentTarget.id + '&trainer=' + event.currentTarget.dataset.trainer + '&courseModel=' + event.currentTarget.dataset.coursemodel
    wx.navigateTo({ url: '../booking/booking' + ID })
  },
  withdraw: function (e) {
    let id = parseInt(e.currentTarget.id)
    let that = this
    wx.showModal({
      title: '提示',
      content: '您确定不上这节课了？',
      success: function (res) {
        if (res.confirm) {
          Trainer.Delete(that, that.data.personCourse[id])
        } else if (res.cancel) {
        }
      }
    })
  }
})