var app = getApp()
Page({
  data: {
    longitude:"",
    latitude:""
  },
  onShow:function(){
    this.get();
  },
  get:function(){
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        that.setData({
          longitude: longitude,
          latitude: latitude
        })

      }
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})