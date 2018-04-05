var Commen = require('../../Commen/Commen.js')
var CONST = require('../../Commen/URL.js')
var ControlPanel = require('cp.js')

function _queryCourse(that, fullDate, trainer) {
  var img = ControlPanel.Img
  wx.showNavigationBarLoading()
  wx.request({
    url: CONST.URL.COURSE + '?date=' + fullDate + '&trainer=' + trainer,
    success: (res) => {
      console.log(res)
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

function getTrainer(that) {
  wx.request({
    url: CONST.URL.TRAINER + 'all_in_one',
    success: function (res) {
      console.log(res)
      that.setData({
        trainerList: [
          {
            avatarUrl:"https://zh.9uhxir.top/uploads/9c0c9fc6815e18af42280fafb8c3da5c59a978a4.jpg",
            trainer: ""
          }
          , ...res.data]
      })
    }
  })
}

function ChangeTrainer(e, that) {
  let id = parseInt(e.currentTarget.id)
  let currentTrainer = that.data.trainerList[id].trainer
  if (currentTrainer == ''){
    wx.setNavigationBarTitle({ title: '力量纵横课程' })
  }else{
    wx.setNavigationBarTitle({ title: currentTrainer + '的课程' })
  }
  that.setData({ currentTrainer: currentTrainer})
  let current = parseInt(that.data.ControlPanel.currentSelect)
  let currentDayStr = Commen.GetDateStr(current, 'fullDate')

  _queryCourse(that, currentDayStr, currentTrainer)
  console.log(currentDayStr)
}


module.exports.getTrainer = getTrainer
module.exports.ChangeTrainer = ChangeTrainer