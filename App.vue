<script>
export default {
  onLaunch: function() {
    // 展示本地存储能力
    const logs = uni.getStorageSync('logs') || []
    logs.unshift(Date.now())
    uni.setStorageSync('logs', logs)

    // 登录
    uni.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
}
</script>

<style>
/* 全局样式 */
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
} 
</style>

<template>
  <view class="content">
    <router-view></router-view>
  </view>
</template> 