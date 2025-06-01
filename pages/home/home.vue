<template>
  <view class="home-bg">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="nav-left">
        <text class="icon-menu">≡</text>
      </view>
      <view class="nav-title">
        <text class="nav-title-text">梯田心耕</text>
        <text class="icon-arrow">▼</text>
      </view>
      <view class="nav-right">
        <text class="icon-setting">⚙️</text>
      </view>
    </view>
    <!-- 主功能区 -->
    <view class="main-area">
      <text class="main-title">我的梯田</text>
      <view class="feature-grid">
        <view class="feature-btn btn-focus" @click="goFocus">
          <view class="btn-icon">📋</view>
          <text class="btn-label">专注计划</text>
        </view>
        <view class="feature-btn btn-record">
          <view class="btn-icon">🕒</view>
          <text class="btn-label">我的梯田</text>
        </view>
        <view class="feature-btn btn-vr">
          <view class="btn-icon">📷</view>
          <text class="btn-label">VR农田</text>
        </view>
        <view class="feature-btn btn-multi">
          <image class="btn-sticker" src="/static/sticker-folder.png"></image>
          <text class="btn-label">多人种植房间</text>
        </view>
      </view>
    </view>
    <!-- 今日任务区 -->
    <view class="today-task">
      <view class="task-title-row">
        <text class="task-title">今日任务</text>
        <text class="task-viewall">查看全部</text>
      </view>
      <view class="task-card">
        <image class="task-bg-img" src="/static/8d7aa5c56a9cea4bd8022f8cf8a9d3a4_.jpg" mode="aspectFill"></image>
        <view class="task-card-content">
          <view class="task-info">
            <text class="task-name">记单词</text>
            <text class="task-time">1小时</text>
          </view>
          <button class="task-btn">START</button>
        </view>
      </view>
    </view>
    <!-- 底部导航栏 -->
    <view class="tabbar">
      <view class="tabbar-item" :class="{active: currentTab==='home'}" @click="switchTab('home')">
        <text class="iconfont">🌐</text>
        <text class="tabbar-text">首页</text>
      </view>
      <view class="tabbar-item" :class="{active: currentTab==='shop'}" @click="switchTab('shop')">
        <text class="iconfont">🛍️</text>
        <text class="tabbar-text">商城</text>
      </view>
      <view class="tabbar-item" :class="{active: currentTab==='activity'}" @click="switchTab('activity')">
        <text class="iconfont">⏳</text>
        <text class="tabbar-text">活动</text>
      </view>
      <view class="tabbar-item" :class="{active: currentTab==='profile'}" @click="switchTab('profile')">
        <text class="iconfont">👤</text>
        <text class="tabbar-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'home'
    }
  },
  methods: {
    goactivity() {
      uni.navigateTo({ url: '/pages/activity/activity' });
    },
    switchTab(tab) {
      if(tab === this.currentTab) return;
      this.currentTab = tab;
      let url = '';
      if(tab==='home') url = '/pages/home/home';
      else if(tab==='shop') url = '/pages/shop/shop';
      else if(tab==='activity') url = '/pages/activity/activity';
      else if(tab==='profile') url = '/pages/profile/profile';
      uni.navigateTo({ url });
    }
  },
  onLoad() {
    this.currentTab = 'home';
  }
}
</script>

<style scoped>
.home-bg {
  min-height: 100vh;
  background: linear-gradient(180deg, #b6e7a7 0%, #e6f7b6 60%, #fffde7 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
/* 顶部导航栏 */
.nav-bar {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  color: #fff;
  background: transparent;
}
.nav-left, .nav-right {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-menu {
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 2px;
}
.icon-setting {
  font-size: 22px;
}
.nav-title {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-title-text {
  font-size: 20px;
  font-weight: bold;
  margin-right: 4px;
}
.icon-arrow {
  font-size: 14px;
  margin-top: 2px;
}
/* 主功能区 */
.main-area {
  margin-top: 20px;
  margin-bottom: 0;
  padding: 0 18px;
}
.main-title {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 18px;
  margin-left: 2px;
}
.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
  height: 300px;
}
.feature-btn {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 18px 18px 14px 18px;
  min-width: 0;
  min-height: 0;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  position: relative;
  overflow: hidden;
}
.btn-focus {
  background: linear-gradient(135deg, #f9c6d3 0%, #fbeee6 100%);
}
.btn-record {
  background: linear-gradient(135deg, #fff9c4 0%, #fbeee6 100%);
}
.btn-vr {
  background: linear-gradient(135deg, #ffe0b2 0%, #fbeee6 100%);
}
.btn-multi {
  background: linear-gradient(135deg, #d0f5c7 0%, #fbeee6 100%);
}
.btn-label {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 8px;
}
.btn-icon {
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 2px;
  text-shadow: 0 2px 8px #fff;
}
.btn-sticker {
  width: 32px;
  height: 32px;
  margin-bottom: 2px;
}
/* 今日任务区 */
.today-task {
  margin: 18px 18px 80px 18px;
}
.task-title-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.task-title {
  font-size: 20px;
  font-weight: bold;
  color: #222;
}
.task-viewall {
  color: #3a8cff;
  font-size: 15px;
  font-weight: normal;
}
.task-card {
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
}
.task-bg-img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.task-card-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: rgba(255,255,255,0.12);
}
.task-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.task-name {
  color: #3a8cff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 2px;
}
.task-time {
  color: #222;
  font-size: 15px;
}
.task-btn {
  background: #b7e3b4;
  color: #fff;
  font-size: 16px;
  border-radius: 16px;
  padding: 6px 24px;
  box-shadow: 0 4px 16px rgba(110,203,143,0.12);
  border: none;
}
/* 底部导航栏 */
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  background: rgba(40,40,40,0.85);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #bbb;
  font-size: 13px;
}
.tabbar-item.active {
  color: #3a8cff;
}
.iconfont {
  font-size: 22px;
  margin-bottom: 2px;
}
.tabbar-text {
  font-size: 13px;
}
</style> 