var CONST = require('../Commen/URL.js');
var Commen = require('../Commen/Commen.js');

// pages/payment/payment.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    credit: '读取中',
    realname: '读取中',
    admin: 'false',
    tuanMoney: '读取中',
    left: 200,
    money: [
      {
        title: '店庆特惠私教课200份：260元/节，卖完为止',
        money: 260,
        left: true
      },
      { title: '1v1私教课程 368元/节', money: 368 },
      { title: '3人内小团体课私教 588元/节', money: 588 },
      { title: '12节课程套餐 4260元(355/节)', money: 4260, hot: true },
      { title: '36节课程套餐 11999元(333/节)', money: 11999, hot: true },
      { title: '72节课程套餐 22249元(309/节)', money: 22249 },
      { title: '99节课程套餐 29699元(300/节)', money: 29699 },
      { title: '团课充值1次卡 1节', money: 110, t: 't' },
      { title: '团课充值次卡 30节', money: 2800, t: 't' },
      { title: '团课充值次卡 50节', money: 4260, t: 't' },
      { title: '团课充值次卡 100节', money: 6500, t: 't' }
    ]
  },
  onPaymen: function(e) {
    const money = e.currentTarget.id;
    const type = e.currentTarget.dataset.type
      ? e.currentTarget.dataset.type
      : 'person';

    const realMoney = parseInt(money) === 0 ? money : parseInt(money);
    console.log(e);
    wx.showModal({
      title: `你确定要充值 ${realMoney} 元吗?`,
      content: '请确保您已经与场馆负责人确认过相关购买流程',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: res => {
        if (res.confirm) {
          wx.request({
            url: 'https://zh.9uhxir.top/django/zongheng/payment/',
            method: 'POST',
            header: 'application/json',
            data: {
              ticket: wx.getStorageSync('ticket'),
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
                signType: 'MD5',
                paySign: json.paySign,
                success: res => {
                  console.log(res);
                  wx.showModal({
                    title: '充值成功',
                    content:
                      '请切换面板刷新状态，如果超过30分钟未到账，请联系场馆管理员'
                  });
                },
                fail: res => {
                  wx.showModal({
                    title: '充值失败',
                    content: '请联系场馆管理员'
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
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    let ticket = wx.getStorageSync('ticket');
    let cc = [];
    wx.request({
      url: CONST.URL.COURSE_RECORD + ticket,
      success: res => {
        wx.hideNavigationBarLoading();

        let credit = res.data.credit;
        let realname = res.data.realname;

        console.log(res);
        this.setData({
          credit: credit,
          realname: realname,
          tuanMoney: res.data.tuanMoney,
          admin: res.data.admin
        });
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
  onShow: function() {
    let ticket = wx.getStorageSync('ticket');
    let cc = [];
    wx.request({
      url: CONST.URL.COURSE_RECORD + ticket,
      success: res => {
        wx.hideNavigationBarLoading();

        let credit = res.data.credit;
        let realname = res.data.realname;

        console.log(res);
        this.setData({
          credit: credit,
          realname: realname,
          tuanMoney: res.data.tuanMoney,
          admin: res.data.admin
        });
      }
    });
  },

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
