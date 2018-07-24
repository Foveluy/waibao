var CONST = require("../Commen/URL.js");
var Picker = require("./timePicker.js");

function ErrorDetect(data, that) {
  if (data == "PHONE_FAIL") {
    wx.showModal({
      title: "您的生日信息有问题",
      content: "请填写生日再进行约课,到「我」的资料中填写个人数据"
    });
    setTimeout(() => wx.navigateBack({}), 3500);
    return false;
  } else if (data == "NO_CREDIT") {
    wx.showModal({
      title: "您的课时不足",
      content: "请联系场馆负责人进行充值"
    });
    that.setData({
      has_credit: false
    });
    // setTimeout(() => wx.navigateBack({}), 2000)
    return false;
  }
  switch (data.state) {
    case "OK":
      wx.showActionSheet({
        itemList: [
          "预约成功!!",
          "教练微信：" + that.data.trainer.weChat,
          "教练电话：" + that.data.trainer.phone
        ],
        success: function(res) {
          if (res.tapIndex == 2) {
            wx.makePhoneCall({
              phoneNumber: that.data.trainer.phone
            });
          }
        },
        fail: function(res) {
          console.log(res.errMsg);
        }
      });
      break;
    case "query":
      break;
    case "noCredit":
      break;
    default:
      wx.showToast({ title: "教练已经被预定" });
      break;
  }
  return true;
}

function postSelectTime(that, trainer, date, start, end) {
  wx.showLoading({
    title: "加载教练中",
    mask: true
  });
  wx.request({
    url: CONST.URL.PERSON,
    method: "POST",
    data: {
      trainer: trainer,
      date: date,
      start: start,
      end: end,
      ticket: wx.getStorageSync("ticket")
    },
    success: function(res) {
      wx.hideLoading();

      if (ErrorDetect(res.data, that)) {
      } else return;

      let times = that.data.time;
      let newAry = res.data.info.map(item => {
        let a = parseInt(item[1] - 14);
        let b = parseInt(item[2] - 14);
        return [times[a], times[b], item[0]];
      });

      let bundles = Picker.makeFresh();
      that.setData({ time: bundles[0] });
      newAry.forEach(item => {
        bundles = Picker.setTime(that, item[0].time, item[1].time, item[2]);
      });
    }
  });
}

module.exports.postSelectTime = postSelectTime;
