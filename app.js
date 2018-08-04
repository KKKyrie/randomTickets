//app.js
App({
  onLaunch: function () {
    
    this.getTickets();

    // this.test();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  },

  // 全局获取已购买的tickets数据
  getTickets: function() {
    var storage = wx.getStorageSync('userTickets');
    var tickets = storage ? JSON.parse(storage) : {};
    this.globalData.tickets = tickets;
  },

  test: function(){
    for (let i = 1; i < 7800; i++){
      this.globalData.tickets[i] = true;
    }
  },

  globalData: {
    userInfo: null,
    tickets: {}
  }
})