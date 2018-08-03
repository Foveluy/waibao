// pages/qiang/qiang.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    number: 10,
    total: 0,
    permoney: ""
  },
  inputChange: function(e) {
    this.setData({
      total: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { type } = options;

    if (type === "260") {
      this.setData({
        type: "私教",
        numner: 10,
        permoney: type
      });
    } else {
      this.setData({
        type: "团课",
        number: 30,
        permoney: type
      });
    }
  },
  onQiang: function() {
    const type = this.data.type === "团课" ? "t-qiang" : "person-qiang";

    const money = this.data.type === "团课" ? 66 : 260;
    const realMoney = money * parseInt(this.data.total);
    if (this.data.total < 30 && this.data.type === "团课") {
      wx.showModal({ title: "太少啦", content: "团课最低30节开抢～" });

      return;
    }
    if (this.data.total < 10 && this.data.type === "私教") {
      wx.showModal({ title: "太少啦", content: "私教最低10节开抢～" });

      return;
    }

    wx.showModal({
      title: `您抢到了${this.data.total}节${this.data.type}课,你确定要充值 ${realMoney} 元吗?`,
      content: "请确保您已经与场馆负责人确认过相关购买流程",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      success: res => {
        if (res.confirm) {
          wx.request({
            url: "https://zh.9uhxir.top/django/zongheng/payment/",
            method: "POST",
            header: "application/json",
            data: {
              ticket: wx.getStorageSync("ticket"),
              money: `${realMoney * 100}`,
              type: type
            },
            success: res => {
              const json = res.data.data;
              console.log(json);
              wx.requestPayment({
                timeStamp: json.timeStamp,
                nonceStr: json.nonceStr,
                package: json.package,
                signType: "MD5",
                paySign: json.paySign,
                success: res => {
                  console.log(res);
                  wx.showModal({
                    title: "充值成功",
                    content:
                      "请切换面板刷新状态，如果超过30分钟未到账，请联系场馆管理员"
                  });
                },
                fail: res => {
                  wx.showModal({
                    title: "充值失败",
                    content: "请联系场馆管理员"
                  });
                }
              });
            },
            fail: () => {}
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
