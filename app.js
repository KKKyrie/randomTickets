//app.js
App({
  onLaunch: function () {
    
    this.getTickets();
    this.initRandomPool();

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
    let storageTickets = wx.getStorageSync('userTickets');
    let tickets = storageTickets ? JSON.parse(storageTickets) : {};
    this.globalData.tickets = tickets;
  },

  // 初始化随机数池
  initRandomPool: function() {
    let storagePool = wx.getStorageSync('userRandomPool');
    let randomPool = [];
    if (storagePool){
      randomPool = JSON.parse(storagePool);
    } else {
      // 初始化randomPool
      for (let i = 1; i < 7801; i++){
        randomPool[i] = i;
      }
      // 立马写进 straoge 里面，不用每次打开都循环7000+次了
      wx.setStorageSync('userRandomPool', JSON.stringify(randomPool));
    }

    this.globalData.randomPool = randomPool;

  },

  // 测试函数
  test: function(){
    for (let i = 1; i < 7800; i++){
      this.globalData.tickets[i] = true;
    }
  },

  globalData: {
    userInfo: null,
    tickets: {},
    randomPool: []
  }
})