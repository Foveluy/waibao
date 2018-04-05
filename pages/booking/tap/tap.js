var CONST = require("../../Commen/URL.js")

function Request(id) {
  wx.showNavigationBarLoading()

  let ticket = wx.getStorageSync('ticket')
  wx.request({
    url: CONST.URL.COURSE,
    method: 'POST',
    data: {
      ticket: ticket,
      id: id,
      Type: CONST.TYPE.BOOK_COURSE
    },
    success: function (res) {
      wx.hideNavigationBarLoading()
      switch (res.data.state) {
        case 'LOGIN_VALID':
          wx.showToast({ title: '登陆失效' })
          wx.redirectTo({ url: '../index/index' })
          break;
        case 'SELECTED':
          wx.showToast({ title: '课程已选上，不要重复选课' })
          setTimeout(() => wx.navigateBack({}), 1000)
          break;
        case 'PHONE_FAIL':
          wx.showToast({ title: '您的生日尚未填写，请到「我」的资料中填写' })
          setTimeout(() => wx.navigateBack({}), 1000)
          break
        case 'SELECT_OK':
          wx.showToast({ title: '选课成功' })
          setTimeout(() => wx.navigateBack({}), 1000)
          break;
        case 'COURSE_FULL':
          wx.showToast({ title: '课程人数已经满噢～' })
          setTimeout(() => wx.navigateBack({}), 1000)
          break;
        case 'CREDIT_NEEDS':
          wx.showToast({ title: '你的课程余额不足噢～' })
          setTimeout(() => wx.navigateBack({}), 1000)
          break;
        case 'COURSE_DONE':
          wx.showToast({ title: '课程已经结束啦～' })
          setTimeout(() => wx.navigateBack({}), 1000)
          break;
        default:
          wx.showToast({ title: '服务器出错' })
          setTimeout(() => wx.navigateBack({}), 1000)
          break;
      }
    }
  })
}

function bookClick(that) {
  wx.showModal({
    title: '您确定预约吗？',
    content: '确定预约后将扣除相应课时',
    success: function (res) {
      if (res.confirm) {
        Request(that.data.id)
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

module.exports.Click = bookClick

