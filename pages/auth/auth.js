// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  auth:function(){
    wx.openSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']){
            wx.navigateBack({})
        }else{
          wx.showToast({title: '请接受授权'})
        }
      }
    })
  }
})