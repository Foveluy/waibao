//app.js
App({
  onLaunch: function() {
  },

  getUserInfo: function(cb) {
    var that = this
    if (typeof cb === 'function'){
      cb(this.globalData.userInfo)
    }

  },

  globalData: {
    userInfo: null,
    courseForScan:[]
  }
})
