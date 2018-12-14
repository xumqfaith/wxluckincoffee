//menu.js
const util = require('../../utils/util.js')
Page({
  data: {
    arr:[],
    toView: 'data0',
    num: "data0",
    numbers:0,
    floatindex: true,
    selfservice: "自提",
    transport: "外送",
    caridlist:[],
    lists: [
      {
        "name": "大师咖啡",
        "id": "data0"
      },
      {
        "name": "零度拿铁",
        "id": "data1"
      },
      {
        "name": "瑞纳冰",
        "id": "data2"
      },
      {
        "name": "经典饮品",
        "id": "data3"
      },
      {
        "name": "健康轻食",
        "id": "data4"
      },
      {
        "name": "鲜榨果蔬汁",
        "id": "data5"
      },
    ],
    masterlist: [
      {
        "chinesename": "标准美式",
        "englishname": "Americano",
        "price": 21,
        "id": "001",
        "num":1
      },
      {
        "chinesename": "加浓美式",
        "englishname": "Extra Americano",
        "price": 24,
        "id": "002",
        "num": 1
      },
      {
        "chinesename": "焦糖标准美式",
        "englishname": "Caramel Extra Americano",
        "price": 24,
        "id": "003",
        "num": 1
      },
      {
        "chinesename": "焦糖加浓美式",
        "englishname": "Caramel Extra Americano",
        "price": 27,
        "id": "004",
        "num": 1
      },
      {
        "chinesename": "黑金气泡美式",
        "englishname": "Black Gold Soda Americano",
        "price": 24,
        "id": "005",
        "num": 1
      },
      {
        "chinesename": "标准美式0",
        "englishname": "Americano",
        "price": 21,
        "id": "006",
        "num": 1
      },
      {
        "chinesename": "加浓美式1",
        "englishname": "Extra Americano",
        "price": 24,
        "id": "007",
        "num": 1
      }
    ],
    zerolatte: [
      {
        "chinesename": "抹茶拿铁0",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "101",
        "num": 1
      },
      {
        "chinesename": "抹茶拿铁1",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "102",
        "num": 1
      },
      {
        "chinesename": "抹茶拿铁2",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "103",
        "num": 1
      },
      {
        "chinesename": "抹茶拿铁3",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "104",
        "num": 1
      },
      {
        "chinesename": "抹茶拿铁4",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "105",
        "num": 1
      }
    ],
    ice:[
      {
        "chinesename": "芒果瑞纳冰",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "201",
        "num": 1
      },
      {
        "chinesename": "卡布奇诺瑞纳冰",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "202",
        "num": 1
      },
      {
        "chinesename": "巧克力瑞纳冰",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "203",
        "num": 1
      },
      {
        "chinesename": "抹茶瑞纳冰",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "204",
        "num": 1
      }
    ],
    classic:[
      {
        "chinesename": "经典饮品0",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "301",
        "num": 1
      },
      {
        "chinesename": "经典饮品1",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "302",
        "num": 1
      }
    ],
    health:[
      {
        "chinesename": "健康饮食0",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "401",
        "num": 1
      },
      {
        "chinesename": "健康饮食1",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "402",
        "num": 1
      }
    ],
    juice:[
      {
        "chinesename": "果汁0",
        "englishname": "Matcha Latte",
        "price": 21,
         "id": "501",
        "num": 1
      },
      {
        "chinesename": "果汁1",
        "englishname": "Matcha Latte",
        "price": 21,
        "id": "502",
        "num": 1
      }
    ],
    allmater:[]
  },
  changebtn: function () {
    let that = this
    let floatindex = that.data.floatindex
    if (floatindex == true) {
      that.setData({
        floatindex: false,
        floatdata: "right",
        selfservice: "外送",
        transport: "自提"
      })
    }
    if (floatindex == false) {
      that.setData({
        floatindex: true,
        floatdata: "left",
        selfservice: "自提",
        transport: "外送"
      })
    }
  },
  click: function (e) {
    let that = this
    that.setData({
      num: e.target.dataset.current,
      toView: e.target.id
    })
  },
  onReady:function(){
    let that = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.details').boundingClientRect()
    query.exec((res) => {
      var listHeight = res[0].height; // 获取list高度
      var length0 = that.data.masterlist.length * 75 + 38 - listHeight;
      var length1 = length0 + that.data.zerolatte.length * 75 + 38;
      var length2 = length1 + that.data.ice.length * 75 + 38;
      var length3 = length2 + that.data.classic.length * 75 + 38;
      var length4 = length3 + that.data.health.length * 75 + 38;
      var length5 = length4 + that.data.juice.length * 75 + 38;
      that.arr = [0, length0, length1, length2, length3,length4, length5];
      that.setData({
        arr: that.arr
      })
    })

  },
  scroll:function(e){
    let that = this;
    var scrollTop = e.detail.scrollTop;
    for (var i = 0; i < that.arr.length; i++) {
      if (scrollTop >= that.arr[i] && scrollTop < that.arr[i+1]) {
        that.setData({
          num: "data"+i
        })
      }
    }
  },
  onLoad:function(){
    let that = this;
    that.data.masterlist.forEach(item => {
      that.data.allmater.push(item);
    });
    that.data.zerolatte.forEach(item => {
      that.data.allmater.push(item);
    });
    that.data.ice.forEach(item => {
      that.data.allmater.push(item);
    });
    that.data.classic.forEach(item => {
      that.data.allmater.push(item);
    });
    that.data.health.forEach(item => {
      that.data.allmater.push(item);
    });
    that.data.juice.forEach(item => {
      that.data.allmater.push(item);
    });
  },
  onShow:function(){
    let that = this;
    //如何取缓存失败则赋值caridlist为空数组
    wx.getStorage({
      key: 'orders',
      success:function(res){
        if(res.data.length > 0){
          that.data.caridlist = res.data;
          that.setData({
            caridlist: that.data.caridlist
          });
        }else{
          that.setData({
            caridlist: []
          });
        }
      },
      fail:function(){
        that.setData({
          caridlist: []
        });
      }
    })
  },
  //添加购物车
  add:function(e){
    let that = this;
    var indexNum;
    // 获取该商品index值
    that.data.allmater.forEach((item,index) => {
      if ( item.id == e.target.dataset.id ) {
           indexNum =index;
        }
    });  
    var idNum = false;
    var t_food = that.data.allmater[indexNum];
    if (that.data.caridlist.length == 0){
      that.data.caridlist.push(t_food);
    } else {
      var index = 0;
      //遍历购物车数组，判断选择的id是否存在，存在则改变num，不存在则push进去
      that.data.caridlist.forEach(function(item,i){
        if (item.id == t_food.id){
            idNum = true;
            index = i;
          }
      })
      if (idNum){
        that.data.caridlist[index].num++;
      }else{
        that.data.caridlist.push(t_food)
      }
    }
    wx.setStorage({
      key: "orders",
      data: that.data.caridlist
    });
    //得到购物车数量
    var sum = 0;
    that.data.caridlist.forEach(function(item){
      sum = sum + item.num;
    })
    //TabBarBadge数字
    wx.setTabBarBadge({
      index: 3,
      text: sum.toString() ,
      success:function(){
        wx.showToast({
          title: '成功加入购物车',
          icon: 'success',
          duration: 2000
        })

      }
    })
  }

})
