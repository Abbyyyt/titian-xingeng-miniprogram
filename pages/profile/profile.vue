<template>
  <view class="profile-bg">
    <!-- 顶部区域 -->
    <view class="profile-header">
      <view class="header-row">
        <view class="header-icons">
        </view>
      </view>
      <view class="user-info">
        <image class="avatar" src="/static/avatar-demo.jpg"></image>
        <text class="nickname">七骑士十九</text>
      </view>
      <view class="focus-coin">
        <view class="coin-label">专注币</view>
        <view class="coin-value">26515</view>
        <text class="coin-arrow">›</text>
      </view>
    </view>
    <!-- 专注作物区 -->
    <view class="profile-card">
      <view class="card-title-row">
        <text class="card-title">专注作物</text>
        <text class="card-more">全部 ›</text>
      </view>
      <view class="crop-row">
        <view class="crop-item">
          <text class="crop-icon">📦</text>
          <text class="crop-label">待支付</text>
        </view>
        <view class="crop-item">
          <text class="crop-icon">📬</text>
          <view class="badge">3</view>
          <text class="crop-label">待收货</text>
        </view>
        <view class="crop-item">
          <text class="crop-icon">✅</text>
          <text class="crop-label">已完成</text>
        </view>
        <view class="crop-item">
          <text class="crop-icon">💰</text>
          <text class="crop-label">售后</text>
        </view>
      </view>
    </view>
    <!-- 用户设置区 -->
    <view class="profile-card">
      <view class="card-title-row">
        <text class="card-title">用户设置和偏好</text>
      </view>
      <view class="setting-row">
        <view class="setting-item">
          <text class="setting-icon">📝</text>
          <text class="setting-label">信息管理</text>
        </view>
        <view class="setting-item">
          <text class="setting-icon">🔒</text>
          <text class="setting-label">隐私设置</text>
        </view>
        <view class="setting-item">
          <text class="setting-icon">📥</text>
          <text class="setting-label">数据导入</text>
        </view>
        <view class="setting-item" @click="goGovernment">
          <text class="setting-icon">🏛️</text>
          <text class="setting-label">政府服务</text>
        </view>
      </view>
    </view>
    <!-- 底部联系我们 -->
    <view class="profile-footer">联系我们</view>
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
      currentTab: 'profile'
    }
  },
  methods: {
    switchTab(tab) {
      if(tab === this.currentTab) return;
      this.currentTab = tab;
      let url = '';
      if(tab==='home') url = '/pages/home/home';
      else if(tab==='shop') url = '/pages/shop/shop';
      else if(tab==='activity') url = '/pages/activity/activity';
      else if(tab==='profile') url = '/pages/profile/profile';
      uni.navigateTo({ url });
    },
    goGovernment() {
      uni.navigateTo({ url: '/pages/government/complaint' });
    }
  },
  onLoad() {
    this.currentTab = 'profile';
  }
}
</script>

<style scoped>
.profile-bg {
  min-height: 100vh;
  background: linear-gradient(180deg, #e6f7b6 0%, #fffde7 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.profile-header {
  padding: 0 0 12px 0;
  background: linear-gradient(180deg, #d6eeb6 0%, #f7fbe7 100%);
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}
.header-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 18px 18px 0 18px;
}
.icon-back {
  font-size: 22px;
  color: #222;
}
.header-title {
  font-size: 20px;
  font-weight: bold;
  color: #222;
}
.header-icons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}
.icon-more {
  font-size: 20px;
  color: #888;
}
.icon-setting {
  font-size: 18px;
  color: #888;
}
.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 18px 0 0 18px;
}
.avatar {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  margin-right: 14px;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.nickname {
  font-size: 18px;
  color: #222;
  font-weight: bold;
}
.focus-coin {
  margin: 16px 18px 0 18px;
  background: linear-gradient(90deg, #e6f7b6 0%, #fffde7 100%);
  border-radius: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  box-shadow: 0 2px 8px rgba(76,192,139,0.08);
}
.coin-label {
  font-size: 15px;
  color: #4ec08b;
  font-weight: bold;
  margin-right: 8px;
}
.coin-value {
  font-size: 18px;
  color: #f7b500;
  font-weight: bold;
  margin-right: 8px;
}
.coin-arrow {
  font-size: 18px;
  color: #bbb;
}
.profile-card {
  background: #fff;
  border-radius: 18px;
  margin: 18px 18px 0 18px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  padding: 14px 0 0 0;
}
.card-title-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px 8px 18px;
}
.card-title {
  font-size: 16px;
  color: #222;
  font-weight: bold;
}
.card-more {
  font-size: 14px;
  color: #4ec08b;
}
.crop-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 0 12px 0;
}
.crop-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.crop-icon {
  font-size: 28px;
  margin-bottom: 2px;
}
.crop-label {
  font-size: 13px;
  color: #333;
}
.badge {
  position: absolute;
  top: -4px;
  right: -10px;
  background: #f44;
  color: #fff;
  font-size: 11px;
  border-radius: 10px;
  padding: 0 5px;
  min-width: 16px;
  text-align: center;
  font-weight: bold;
}
.setting-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 0 14px 0;
}
.setting-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.setting-icon {
  font-size: 26px;
  margin-bottom: 2px;
}
.setting-label {
  font-size: 13px;
  color: #333;
}
.profile-footer {
  text-align: center;
  color: #888;
  font-size: 14px;
  margin: 24px 0 80px 0;
}
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