Page({
  data: {
    rooms: [
      {
        id: 1,
        title: '价值观非常队',
        progress: '进阶 60min',
        image: '/images/room1.jpg',
        tags: ['考公自习室', '持续打卡·兑换实体作物'],
        focusCount: 17
      },
      {
        id: 2,
        title: '上岸者联盟',
        progress: '基础 30min',
        image: '/images/room2.jpg',
        tags: ['考研自习室', '持续打卡·兑换实体作物'],
        focusCount: 8
      }
    ],
    totalFocusCount: 1290
  },

  onLoad() {
    // 页面加载时的逻辑
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 查看全部排行
  viewAllRanking() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },

  // 进入房间
  enterRoom(e) {
    const roomId = e.currentTarget.dataset.id
    wx.showToast({
      title: '加入房间功能开发中',
      icon: 'none'
    })
  }
}) 