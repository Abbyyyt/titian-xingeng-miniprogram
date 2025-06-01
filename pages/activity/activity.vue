<template>
    <!-- 根节点：背景 + 内容层 -->
    <view class="focus-bg">
      <!-- 背景图片（模糊处理）-->
      <image class="bg-img" src="/static/focus-bg.jpg" mode="aspectFill" />
      <!-- 半透明遮罩渐变 -->
      <view class="bg-gradient" />
  
      <!-- 内容层：放在背景之上 -->
      <view class="content-wrapper">
        <!-- 主标题 Banner -->
        <view class="banner">
          <text class="banner-line">千年哈尼雕琢大地</text>
          <text class="banner-line">万里梯田对话苍穹</text>
        </view>
  
        <!-- 功能模块六宫格 -->
        <view class="features-grid">
          <view class="feature-item">
            <image :src="images.featureDigitalCulture" alt="数字文化馆" class="feature-icon" />
            <text class="feature-label">数字文化馆</text>
          </view>
          <view class="feature-item">
            <image :src="images.featureHaniLearning" alt="哈尼文化学习" class="feature-icon" />
            <text class="feature-label">哈尼文化学习</text>
          </view>
          <view class="feature-item">
            <image :src="images.featureQuiz" alt="哈尼知识竞答" class="feature-icon" />
            <text class="feature-label">哈尼知识竞答</text>
          </view>
          <view class="feature-item">
            <image :src="images.featureWeatherLive" alt="景区天气直播" class="feature-icon" />
            <text class="feature-label">景区天气直播</text>
          </view>
          <view class="feature-item">
            <image :src="images.featureCommunity" alt="交流社区" class="feature-icon" />
            <text class="feature-label">交流社区</text>
          </view>
          <view class="feature-item">
            <image :src="images.featureDeepTour" alt="主题深度游" class="feature-icon" />
            <text class="feature-label">主题深度游</text>
          </view>
        </view>
      </view>
  
      <!-- 底部导航栏（固定在最底部）-->
      <view class="tabbar">
        <view
          class="tabbar-item"
          :class="{ active: currentTab === 'home' }"
          @click="switchTab('home')"
        >
          <text class="iconfont">🌐</text>
          <text class="tabbar-text">首页</text>
        </view>
        <view
          class="tabbar-item"
          :class="{ active: currentTab === 'shop' }"
          @click="switchTab('shop')"
        >
          <text class="iconfont">🛍️</text>
          <text class="tabbar-text">商城</text>
        </view>
        <view
          class="tabbar-item"
          :class="{ active: currentTab === 'activity' }"
          @click="switchTab('activity')"
        >
          <text class="iconfont">⏳</text>
          <text class="tabbar-text">活动</text>
        </view>
        <view
          class="tabbar-item"
          :class="{ active: currentTab === 'profile' }"
          @click="switchTab('profile')"
        >
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
        currentTab: 'focus',
        images: {
          featureDigitalCulture: '/static/feature-digital-culture.jpg', // 数字文化馆 图标
          featureHaniLearning: '/static/feature-hani-learning.jpg',     // 哈尼文化学习 图标
          featureQuiz: '/static/feature-quiz.jpg',                      // 哈尼知识竞答 图标
          featureWeatherLive: '/static/feature-weather-live.jpg',       // 景区天气直播 图标
          featureCommunity: '/static/feature-community.jpg',            // 交流社区 图标
          featureDeepTour: '/static/feature-deep-tour.jpg'              // 主题深度游 图标
        }
      };
    },
    methods: {
      switchTab(tab) {
        if (tab === this.currentTab) return;
        this.currentTab = tab;
        let url = '';
        if (tab === 'home') url = '/pages/home/home';
        else if (tab === 'shop') url = '/pages/shop/shop';
        else if (tab === 'activity') url = '/pages/activity/activity';
        else if (tab === 'profile') url = '/pages/profile/profile';
        uni.navigateTo({ url });
      }
    },
    onLoad() {
      this.currentTab = 'focus';
    }
  };
  </script>
  
  <style scoped>
  /* 整个页面根：背景层 + 内容层 */
  .focus-bg {
    position: relative;
    min-height: 100vh;
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }
  
  /* 背景图片（全屏，模糊） */
  .bg-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    z-index: 1;
  }
  
  /* 半透明渐变遮罩，避免背景过于刺眼 */
  .bg-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.6)
    );
    z-index: 2;
  }
  
  /* 内容层：在背景上方显示，留出导航栏高度 */
  .content-wrapper {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    padding-bottom: 60px; /* 底部导航栏高度 */
  }
  
  /* 主标题 Banner */
  .banner {
    margin-top: 24px;
    align-items: center;
    justify-content: center;
  }
  .banner-line {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    text-shadow:
      -1px -1px 0 #2a5d00,
       1px -1px 0 #2a5d00,
      -1px  1px 0 #2a5d00,
       1px  1px 0 #2a5d00;
    margin: 4px 0;
    text-align: center;
  }
  
  /* 功能模块六宫格 */
  .features-grid {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding: 24px 16px;
    justify-content: space-between;
  }
  .feature-item {
    width: 47%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  .feature-icon {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-bottom: 8px;
  }
  .feature-label {
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
  
  /* 底部导航栏：固定在视口底部 */
  .tabbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    background: rgba(40, 40, 40, 0.85);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    z-index: 4;
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
  