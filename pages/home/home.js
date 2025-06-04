Page({
  data: {
    currentTime: '08:34'
  },

  onLoad() {
    this.updateTime()
    // 每分钟更新一次时间
    setInterval(() => {
      this.updateTime()
    }, 60000)
  },

  updateTime() {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    this.setData({
      currentTime: `${hours}:${minutes}`
    })
  },

  // 导航到专注计划
  goToFocusPlan() {
    wx.navigateTo({
      url: '/pages/focus-plan/focus-plan'
    })
  },

  // 导航到我的梯田
  goToMyTerrace() {
    wx.navigateTo({
      url: '/pages/terrace-detail/terrace-detail'
    })
  },

  // 导航到VR农田
  goToVRView() {
    wx.navigateTo({
      url: '/pages/vr-view/vr-view'
    })
  },

  // 导航到多人种植房间
  goToMultiRoom() {
    wx.navigateTo({
      url: '/pages/planting-room/planting-room'
    })
  },

  // 开始今日任务
  startTask() {
    wx.navigateTo({
      url: '/pages/task/task'
    })
  },

  // 查看全部任务
  viewAllTasks() {
    wx.navigateTo({
      url: '/pages/tasks/tasks'
    })
  },

  // 开始专注计时器
  startFocusTimer() {
    wx.navigateTo({
      url: '/pages/focus-timer/focus-timer'
    })
  }
}) 