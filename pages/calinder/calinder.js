// pages/calinder/calinder.js
var CONST = require("../Commen/URL.js");
var Commen = require("../Commen/Commen.js");
var Picker = require("./timePicker.js");
var network = require("./network.js");

Page({
  data: {
    startIndex: 0,
    endIndex: 0,
    multiArray: [],
    time: [],
    trainer: {},
    currentDate: "",
    currentSelect: 0,
    trainerName: "",
    has_credit: true
  },
  timeSelect: function(e) {
    const index = parseInt(e.currentTarget.id);

    let plus = 0;
    const newArray = this.data.time.map((t, i) => {
      if (index === i || index === i - 1 || index === i - 2) {
        return { ...t, pick: true };
      }
      if (index >= 26) {
        if (i === 26 || i === 27 || i === 28) {
          return { ...t, pick: true };
        }
      }

      return { ...t, pick: false };
    });
    this.setData({
      time: newArray
    });
  },
  bindStartPickerChange: function(e) {
    this.setData({
      startIndex: e.detail.value
    });
  },
  exchange: function(e) {
    wx.showModal({
      title: "课程互换",
      content: "您确定用4节团课换取1节私教课程吗？",
      success: () => {
        wx.request({
          url: "https://zh.9uhxir.top/django/zongheng/exchange/",
          method: "POST",
          data: { ticket: wx.getStorageSync("ticket") },
          success: res => {
            console.log(res.data);
            const data = res.data;
            if (data.state === "good") {
              wx.showModal({
                title: "兑换成功",
                content: "您的4节团课已经换成1节私教课程，快点开始约课吧！～"
              });
              this.setData({
                has_credit: true
              });
            } else if (data.state === "need_credit") {
              wx.showModal({
                title: "余额不足",
                content: "您的团课剩余不足，请联系场馆充值"
              });
            }
          },
          fail: () => {
            wx.showToast({ title: "充值失败" });
          }
        });
      }
    });
  },
  bindEndPickerChange: function(e) {
    this.setData({
      endIndex: e.detail.value
    });
  },
  bookAsk: function(e) {
    let that = this;
    wx.showModal({
      title: "提示",
      content: "您确定预约这节课了？",
      success: function(res) {
        if (res.confirm) {
          that.book(e);
        } else if (res.cancel) {
        }
      }
    });
  },
  book: function(e) {
    let that = this;
    let trainer = this.data.trainer.trainer;
    let date = Commen.GetDateStr(parseInt(this.data.currentSelect), "fullDate");

    let startIndex = 0;
    let endIndex = 0;

    const selectTime = [];
    this.data.time.forEach((e, index) => {
      if (e.pick) selectTime.push(index);
    });
    startIndex = selectTime[0];
    endIndex = selectTime[2];

    if (parseInt(startIndex) > parseInt(endIndex)) {
      wx.showModal({
        title: "预约失败",
        content: "开始时间时间必须小于结束时间;结束时间必须大于开始时间"
      });
      return;
    }
    network.postSelectTime(
      this,
      trainer,
      date,
      parseInt(startIndex) + 14,
      parseInt(endIndex) + 14
    );
  },
  selectDay: function(e) {
    //这一部分是请求教练已经安排的课务
    let date = Commen.GetDateStr(parseInt(e.currentTarget.id), "fullDate");
    this.setData({
      currentSelect: e.currentTarget.id
    });
    network.postSelectTime(this, this.data.trainerName, date, -1, -1);
  },
  onLoad: function(options) {
    let that = this;
    let trainer = options.trainer;
    let current = parseInt(options.date);
    let bundles = Picker.makeFresh();
    this.setData({
      time: bundles[0],
      multiArray: bundles[1],
      currentDate: Commen.GetDateStr(current, "fullDate"),
      DateAry: Commen.GetSevenDate(),
      currentSelect: current,
      trainerName: trainer
    });

    wx.request({
      url: CONST.URL.TRAINER + trainer,
      success: function(res) {
        that.setData({ trainer: res.data });
      }
    });

    //这一部分是请求教练已经安排的课务
    let date = Commen.GetDateStr(current, "fullDate");

    network.postSelectTime(this, trainer, date, -1, -1);
  }
});
