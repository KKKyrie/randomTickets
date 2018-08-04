//index.js
const app = getApp();
const util = require('../../utils/util.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    initLoading: true,

    pickerRange: [1,2,3,4,5],
    pickerValue: 1,
    randomSeats: {},
    randomSeatsArr: [],
    randomSeatsCount: 0,
    TOTAL_SEATS_COUNT: 7800,
    SECTION_BORDERS: [1, 1950, 1951, 3900, 3901, 5850, 5851, 7800]
  },


  onLoad: function() {
    this.initUserInfo();
    this.getInitTickets();
  },

  onShow: function() {
    this.turnOffLoading();
  },


  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },

  getInitTickets: function() {
    let tickets = app.globalData.tickets;
    let ticketsArr = Object.keys(tickets);
    let count = ticketsArr.length;
    this.setData({
      randomSeats: tickets,
      randomSeatsArr: ticketsArr,
      randomSeatsCount: count
    });
  },

  // 关闭小程序loading动画
  turnOffLoading: function() {
    setTimeout(() => {
      this.setData({
        initLoading: false
      });
    }, 750);
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
    this.setData({
      pickerValue: range[index]
    });
  },


  getRandomTickets: function() {
    let ticketsCount = this.data.pickerValue;
    let max = this.data.TOTAL_SEATS_COUNT;
    let leftTickets = max - this.data.randomSeatsCount;
    let seats = this.data.randomSeats;
    let seatNumber = 0;
    let position = {};
    let tempTickets = [];
    
    // 用户输入不合法
    if (!this.checkUserInput(ticketsCount)){
      return;
    }

    // 剩余票不足
    if (ticketsCount > leftTickets){
      this.showErrorMsg('剩余票不足');
      return;
    }


    for (let i = 0; i < ticketsCount; i++){
      do {
        seatNumber = util.getRandomNumber(max);
      } while (seats[seatNumber]);
      
      tempTickets.push(seatNumber);      
    }

    this.showTicketInfo(tempTickets);

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
  },

  showTicketInfo: function(tickets) {
    let that = this;
    let content = '为你挑选座位：';
    let ticket = {};
    let borders = that.data.SECTION_BORDERS;
    tickets.forEach(function(value){
      ticket = util.getPositionByNumber(value, borders);
      content += `${ticket.section}-${ticket.row}-${ticket.column}  `;
    });
    wx.showModal({
      title: '提示',
      content: content,
      confirmText: '确认购买',
      cancelText: '取消',
      success: function(res) {
        if (res.confirm) {
          that.confirmBuyTickets(tickets);
        } else if (res.cancel) {
          console.log('cancel');
        }
      }
    });
  },

  confirmBuyTickets: function(tickets){

    let globalTickets = app.globalData.tickets;
    tickets.forEach(function(value){
      globalTickets[value] = true;
    });
    wx.setStorageSync('userTickets', JSON.stringify(globalTickets));
    
    this.setData({
      initLoading: true
    });

    this.getInitTickets();

    this.turnOffLoading();

  }

});
