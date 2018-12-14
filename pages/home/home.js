//home.js
const util = require('../../utils/util.js')

Page({
  data: {
    imgUrls: [
      './img/page1.jpg',
      './img/page2.jpg',
      './img/wei.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true
  },
  now:function(){
    console.log('now');
    wx.switchTab({
      url: '../menu/menu'
    })
  },
  onLoad: function () {
    
  }
})
