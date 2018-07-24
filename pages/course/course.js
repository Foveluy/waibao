// pages/course/course.js
var Modal = require('Modal/Modal.js');
var ControlPanel = require('ControlPanel/cp.js');
var Trainer = require('ControlPanel/Trainer.js');
var Commen = require('../Commen/Commen.js');
var URL = require('../../pages/Commen/URL.js');

Page({
  data: {
    ModalUse: {
      opacity: 0,
      Pevents: 'none',
      Click: ''
    },
    ControlPanel: {
      currentSelect: 0,
      DateAry: []
    },
    currentSwitcher: 1,
    trainerList: [],
    personCourse: [],
    currentTrainer: '',
    CourseList: [],
    backgroundimg: [],
    timeAry: [],
    courseSrc: ''
  },
  handleSwitcher: function(e) {
    if (e.target.id === 'tuan') {
      this.setData({
        currentSwitcher: 0
      });
    } else {
      this.setData({
        currentSwitcher: 1
      });
    }
  },
  ChangeTrainer: function(e) {
    Trainer.Trainer(e, this);
  },
  BookedTrainer: function(e) {
    Trainer.BookTrainer(e, this);
  },
  qrScan: function(res) {
    ControlPanel.scan(this);
  },
  onLoad: function() {
    this.setData({
      courseSrc: URL.host + '/course/' + wx.getStorageSync('ticket')
    });
  },
  onShow: function() {
    /**初始化控制面板时间 */
    ControlPanel.initDate(this);
    Trainer.getTrainer(this);
    Trainer.personCourse(this);
    console.log(this.data.timeAry);
    this.setData({
      timeAry: [...pickerAry]
    });
  },
  selectDay: function(event) {
    /**选择日期 */
    ControlPanel.selectDays(this, event.currentTarget.id);
    Trainer.personCourse(this, parseInt(event.currentTarget.id));
  },
  CheckStudent: function(event) {
    this.setData({
      ModalUse: {
        opacity: 1,
        Pevents: 'auto',
        Click: event.currentTarget.id
      }
    });
  },
  modalClick: function() {
    Modal.Click(this);
  },
  bookClick: function(event) {
    console.log(event);
    let ID =
      '?id=' +
      event.currentTarget.id +
      '&trainer=' +
      event.currentTarget.dataset.trainer +
      '&courseModel=' +
      event.currentTarget.dataset.coursemodel;
    wx.navigateTo({ url: '../booking/booking' + ID });
  },
  withdraw: function(e) {
    let id = parseInt(e.currentTarget.id);
    let that = this;
    wx.showModal({
      title: '提示',
      content: '您确定不上这节课了？',
      success: function(res) {
        if (res.confirm) {
          Trainer.Delete(that, that.data.personCourse[id]);
        } else if (res.cancel) {
        }
      }
    });
  }
});

let pickerAry = [
  '7:00',
  '7:30',
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30'
];
