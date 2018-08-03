//index.js
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    initLoading: true,

    pickerRange: [1,2,3,4,5],
    pickerValue: 1
  },


  onLoad: function() {
    this.initUserInfo();
  },

  onShow: function() {
    this.turnOffLoading();
  },


  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 关闭小程序loading动画
  turnOffLoading: function() {
    setTimeout(() => {
      this.setData({
        initLoading: false
      })
    }, 1500)
  },

  // 初始化用户数据
  initUserInfo: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },


  bindPickerChange: function(e){
    let range = this.data.pickerRange;
    let index = e.detail.value;
    console.log(range[index]);
    this.setData({
      pickerValue: range[index]
    });
  },


  getTickets: function() {
    let ticketsCount = this.data.pickerValue;
    if (!this.checkUserInput(ticketsCount)){
      return;
    }

    // todo: 随机选择座位（用对象保存，天然的hashtable）
  },


  // 检查用户输入是否合法
  checkUserInput: function(input) {
    
    if (typeof input !== 'number'){
      this.showErrorMsg('输入类型不合法，必须是number');
      return false;
    }

    if (input < 1 || input > 5){
      this.showErrorMsg('sorry，一次只能购买1～5张票');
      return false;
    }

    return true;
  },

  showErrorMsg: function(msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      confirmText: '好嘞',
      confirmColor: '#1aad19'
    });
  }

});
