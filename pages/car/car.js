//car.js
const util = require('../../utils/util.js')

Page({
  data: {
    nothing:true,
    charlist:[],
    money:0,
    startX:'',
    startY:''
  },
  go:function(){
    wx.switchTab({
      url: '../menu/menu'
    })
  },
  onShow: function () {
    let that = this;
    // 判断是否有存储的数据
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        var money = 0;
        if (res.data.length > 0){
            res.data.forEach(function (item) {
              item["isTouchMove"] = false;
              item["checked"] = true;
              money = money + item.price * item.num * item.checked
            })
            that.setData({
              charlist: res.data,
              money: money,
              nothing: false
            });
           wx.setTabBarBadge({
            index: 3,
            text: that.getSum().toString()
          })
        }else{
          that.setData({
            nothing: true
          });
        }
          
      },
      fail:function(){
        that.setData({
          nothing: true
        });
      }
    })
    
  },
  add:function(e){
    this.changeNum(e,true);
  },
  sub:function(e){
    this.changeNum(e, false);
  },
  changeNum:function(e,bool){
    let that = this;
    if (bool){
      var obj = that.data.charlist[e.target.dataset.index];
      obj.num++;
    }else{
      if (e.target.dataset.num > 1) {
        var obj = that.data.charlist[e.target.dataset.index];
        obj.num--;
      }else{
        that.data.charlist.splice(e.target.dataset.index,1);
      }
    }

    if (that.data.charlist.length == 0){
      that.setData({
        charlist: that.data.charlist,
        money: that.getMoney(),
        nothing: true
      });
    }else{
      that.setData({
        charlist: that.data.charlist,
        money: that.getMoney(),
        nothing: false
      });
    }
    that.save();
  },
  //是否选中
  checked:function(e){
    let that = this;
    var index = e.currentTarget.dataset.index;
    var checked = e.currentTarget.dataset.checked;
    that.data.charlist[index].checked = !that.data.charlist[index].checked;

    that.setData({
      charlist: that.data.charlist,
      money: that.getMoney()
    });
    //如果数值为0则隐藏TabBar上面的数字
    if (that.getSum() == 0) {
      wx.hideTabBarRedDot({
        index: 3
      })
    } else {
      wx.setTabBarBadge({
        index: 3,
        text: that.getSum().toString()
      })
    }
  },
  //去结算
  accounts:function(){
    let that = this
    wx.clearStorage()
    that.setData({
      charlist: "",
      money: 0,
      nothing: true
    });
    wx.hideTabBarRedDot({
      index: 3
    })
  },
  //滑动删除
  //开始
  touchstart:function(e){
    let that = this
    that.data.startX = e.changedTouches[0].clientX;
    that.data.startY = e.changedTouches[0].clientY;
  },
  //滑动
  touchmove:function(e){
    let that = this;
    var index = e.currentTarget.dataset.index;//当前索引
    var startX = that.data.startX;//开始X坐标
    var startY = that.data.startY;//开始Y坐标
    var touchMoveX = e.changedTouches[0].clientX;//滑动变化坐标
    var touchMoveY = e.changedTouches[0].clientY;//滑动变化坐标
    //获取滑动角度
    var angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    // console.log(angle)
    that.data.charlist.forEach(function (item, i) {
      item.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX){ //右滑
          item.isTouchMove = false
        }else{ //左滑
          item.isTouchMove = true
        }
      }
    })
    //更新数据
    that.setData({
      charlist: that.data.charlist
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  getMoney:function(){
    let that = this;
    //需付的钱数
    var money = 0;
    that.data.charlist.forEach(function (item) {
      money = money + item.price * item.num * item.checked;
    })
    return money;
  },
  getSum:function(){
      let that = this;
      //得到购物车数量
      var sum = 0;
      that.data.charlist.forEach(function (item) {
        sum = sum + item.num * item.checked;
      })
      return sum;
  },
  save:function(){
    let that = this;
    //存在本地
    wx.setStorage({
      key: "orders",
      data: that.data.charlist,
      success: function () {
        //TabBarBadge数字
        if (that.getSum() == 0) {
          that.setData({
            charlist: that.data.charlist,
            money: that.getMoney(),
            nothing: true
          });
          wx.hideTabBarRedDot({
            index: 3
          })
        } else {
          that.setData({
            charlist: that.data.charlist,
            money: that.getMoney(),
            nothing: false
          });
          wx.setTabBarBadge({
            index: 3,
            text: that.getSum().toString()
          })
        }
      }
    });
  },
  delete:function(e){
    let that = this;
    that.data.charlist.splice(e.target.dataset.index, 1);
    that.save();  
  }
})
