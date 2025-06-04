Page({
  data: {
    vrImageUrl: null
  },

  onLoad: function(options) {
    // 设置图片URL
    this.setData({
      vrImageUrl: options.imageUrl || '/images/terrace-vr.jpg'
    });
  },

  goBack() {
    wx.navigateBack()
  }
}) 