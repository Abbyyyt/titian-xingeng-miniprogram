Page({
  data: {
    account: '',
    password: '',
    currentTime: '08:34'
  },

  onLoad() {
    this.updateTime()
  },

  updateTime() {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    this.setData({
      currentTime: `${hours}:${minutes}`
    })
  },

  onAccountInput(e) {
    this.setData({
      account: e.detail.value
    })
  },

  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  onLogin() {
    const { account, password } = this.data
    if (!account || !password) {
      wx.showToast({
        title: '请输入账号和密码',
        icon: 'none'
      })
      return
    }

    // 这里添加登录逻辑
    wx.showLoading({
      title: '登录中...'
    })

    // 模拟登录请求
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500,
        success: () => {
          // 登录成功后跳转到主页面
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/home/home'
            })
          }, 1500)
        }
      })
    }, 1500)
  }
}) 