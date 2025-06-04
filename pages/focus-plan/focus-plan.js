Page({
  data: {
    planName: '',
    selectedCategory: '',
    timerMode: 'normal', // normal, countdown, none
    duration: 25
  },

  onLoad() {
    // 页面加载时的初始化逻辑
  },

  goBack() {
    wx.navigateBack();
  },

  onPlanNameInput(e) {
    this.setData({
      planName: e.detail.value
    });
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      selectedCategory: category
    });
  },

  selectTimerMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({
      timerMode: mode
    });
  },

  onSliderChange(e) {
    this.setData({
      duration: e.detail.value
    });
  },

  submitPlan() {
    const { planName, selectedCategory, timerMode, duration } = this.data;
    
    if (!planName) {
      wx.showToast({
        title: '请输入计划名称',
        icon: 'none'
      });
      return;
    }

    if (!selectedCategory) {
      wx.showToast({
        title: '请选择分类',
        icon: 'none'
      });
      return;
    }

    // 保存计划数据
    const plan = {
      name: planName,
      category: selectedCategory,
      timerMode,
      duration
    };

    // TODO: 保存到本地存储或发送到服务器
    console.log('提交计划:', plan);

    // 返回上一页
    wx.navigateBack();
  }
}); 