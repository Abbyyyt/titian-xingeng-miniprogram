Page({
  data: {
    minutes: '32',
    seconds: '11',
    isRunning: false,
    selectedSound: 'rain', // 'rain', 'cicada', 'waves'
    plantStatus: '长成幼苗了',
    totalSeconds: 0,
    targetSeconds: 25 * 60, // 25 minutes by default
  },

  onLoad: function(options) {
    // Set initial time if passed from previous page
    if (options && options.time) {
      this.setData({
        targetSeconds: parseInt(options.time) * 60
      });
    }
    
    // Format initial time display
    this.updateTimeDisplay(this.data.targetSeconds);
  },

  selectSound: function(e) {
    var sound = e.currentTarget.dataset.sound;
    this.setData({ selectedSound: sound });
  },

  toggleTimer: function() {
    if (this.data.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  },

  startTimer: function() {
    var that = this;
    this.setData({ isRunning: true });
    
    this.timer = setInterval(function() {
      if (that.data.totalSeconds >= that.data.targetSeconds) {
        that.completeTimer();
        return;
      }
      
      that.data.totalSeconds++;
      that.updateTimeDisplay(that.data.targetSeconds - that.data.totalSeconds);
      that.updatePlantStatus();
    }, 1000);
  },

  pauseTimer: function() {
    this.setData({ isRunning: false });
    clearInterval(this.timer);
  },

  stopTimer: function() {
    this.pauseTimer();
    this.data.totalSeconds = 0;
    this.updateTimeDisplay(this.data.targetSeconds);
    this.setData({ plantStatus: '开始种植吧' });
  },

  resetTimer: function() {
    this.stopTimer();
  },

  updateTimeDisplay: function(remainingSeconds) {
    var minutes = Math.floor(remainingSeconds / 60);
    var seconds = remainingSeconds % 60;
    
    this.setData({
      minutes: this.padZero(minutes),
      seconds: this.padZero(seconds)
    });
  },

  padZero: function(num) {
    return num < 10 ? '0' + num : '' + num;
  },

  updatePlantStatus: function() {
    var progress = this.data.totalSeconds / this.data.targetSeconds;
    
    if (progress < 0.25) {
      this.setData({ plantStatus: '种子正在发芽' });
    } else if (progress < 0.5) {
      this.setData({ plantStatus: '长出小芽了' });
    } else if (progress < 0.75) {
      this.setData({ plantStatus: '长成幼苗了' });
    } else {
      this.setData({ plantStatus: '快要成熟了' });
    }
  },

  completeTimer: function() {
    var that = this;
    this.pauseTimer();
    wx.showToast({
      title: '获得60专注币',
      icon: 'success',
      duration: 2000
    });
    
    setTimeout(function() {
      wx.navigateBack();
    }, 2000);
  },

  goBack: function() {
    wx.navigateBack();
  },

  onUnload: function() {
    // Clean up
    clearInterval(this.timer);
  }
}); 