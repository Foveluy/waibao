var Commen = require('../../Commen/Commen.js')
var CONST = require('../../Commen/URL.js')

function getTrainer(that) {
  wx.request({
    url: CONST.URL.TRAINER + 'all_in_one',
    success: function (res) {
      that.setData({
        trainerList: res.data
      })
    }
  })
}


function Trainer(e, that) {
  let id = parseInt(e.currentTarget.id)
  let currentTrainer = that.data.trainerList[id].trainer
  wx.navigateTo({
    url: '../calinder/calinder?trainer=' + currentTrainer + '&date=' + that.data.ControlPanel.currentSelect,
  })
}
function BookTrainer(e, that) {
  let currentTrainer = e.currentTarget.id
  wx.navigateTo({
    url: '../calinder/calinder?trainer=' + currentTrainer + '&date=' + that.data.ControlPanel.currentSelect,
  })
}


function personCourse(that, select = 0) {
  let date = Commen.GetDateStr(select, 'fullDate')

  let thatone = that
  wx.request({
    url: CONST.URL.PERSON + '?date=' + date + '&ticket=' + wx.getStorageSync("ticket"),
    success: function (res) {
      if(res.data == 'FAIL')return
      thatone.setData({ personCourse: res.data })
    }
  })
}

function Delete(that, item) {
  wx.showNavigationBarLoading()
  wx.request({
    url: CONST.URL.PERSON,
    method: "DELETE",
    data: [wx.getStorageSync("ticket"), item],
    success: function (res) {
      wx.hideNavigationBarLoading()
      that.setData({ personCourse: res.data })
    }
  })
}

module.exports.Trainer = Trainer
module.exports.getTrainer = getTrainer
module.exports.personCourse = personCourse
module.exports.BookTrainer = BookTrainer
module.exports.Delete = Delete




