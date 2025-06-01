<template>
    <view class="shop-page">
      <!-- ── 顶部绿色渐变背景 ── -->
      <view class="header-bg">
        <!-- 状态栏留白（可选，有自定义状态栏时可删） -->
        <view class="status-bar-placeholder"></view>
  
        <!-- 顶部搜索栏 -->
        <view class="search-container">
          <view class="search-wrapper">
            <text class="iconfont search-icon">🔍</text>
            <input
              class="search-input"
              placeholder="专注美好生活"
              v-model="searchQuery"
              @confirm="onSearchConfirm"
            />
          </view>
          <view class="header-cart-btn" @click="goToCart">
            <text class="iconfont cart-icon">🛒</text>
          </view>
        </view>
  
        <!-- 顶部一级分类滚动条 -->
        <scroll-view
          class="top-categories"
          scroll-x="true"
          scroll-with-animation
          :show-scrollbar="false"
        >
          <view
            v-for="(cat, idx) in topCategories"
            :key="idx"
            :class="['cat-item', activeTopCat === idx ? 'active' : '']"
            @click="switchTopCategory(idx)"
          >
            <!-- 注意图标背景仍然保持白色圆形，避免被渐变干扰可视 -->
            <image :src="cat.icon" class="cat-icon" mode="aspectFill" />
            <text class="cat-label">{{ cat.label }}</text>
          </view>
        </scroll-view>
      </view>
  
      <!-- ── 中下部内容白底（从这里开始为内容区） ── -->
      <view class="content-area">
        <!-- 左侧二级分类 -->
        <view class="side-menu">
          <scroll-view
            class="side-scroll"
            scroll-y="true"
            scroll-with-animation
            :show-scrollbar="false"
          >
            <view
              v-for="(sub, idx) in subCategories"
              :key="idx"
              :class="['side-item', activeSubCat === idx ? 'active' : '']"
              @click="switchSubCategory(idx)"
            >
              <text class="side-text">{{ sub }}</text>
            </view>
          </scroll-view>
        </view>
  
        <!-- 右侧商品列表 -->
        <view class="product-list">
          <!-- 顶部的 Tab 选项 -->
          <view class="list-tabs">
            <view
              v-for="(tab, idx) in listTabs"
              :key="idx"
              :class="['list-tab-item', activeListTab === idx ? 'active' : '']"
              @click="switchListTab(idx)"
            >
              <text class="list-tab-text">{{ tab }}</text>
            </view>
          </view>
  
          <!-- 商品项网格展示 -->
          <scroll-view
            class="products-scroll"
            scroll-y="true"
            scroll-with-animation
            :show-scrollbar="false"
          >
            <view class="product-grid">
              <view
                v-for="(item, idx) in filteredProducts"
                :key="idx"
                class="product-card"
              >
                <image :src="item.img" mode="aspectFill" class="product-img" />
                <view class="product-info">
                  <text class="product-title">{{ item.title }}</text>
                  <text class="product-subtitle">{{ item.subtitle }}</text>
                  <view class="product-meta">
                    <text class="product-price">
                      {{ item.price }}
                      <text class="price-unit">专注币/{{ item.unit }}</text>
                    </text>
                    <view class="add-cart-btn" @click="addToCart(item)">
                      <text class="iconfont">🛒</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
  
      <!-- 底部导航栏 -->
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
        currentTab: 'shop',
        searchQuery: '',
        topCategories: [
          { label: '特色作物', icon: '/static/icon-zzcw.png' },
          { label: '杂粮类', icon: '/static/icon-zll.png' },
          { label: '生态蔬菜', icon: '/static/icon-stsc.png' },
          { label: '特色调味', icon: '/static/icon-tctw.png' },
          { label: '作物兑换', icon: '/static/icon-cwdh.png' }
        ],
        activeTopCat: 0,
        subCategories: ['红米系列', '特色稻米', '其他...'],
        activeSubCat: 0,
        listTabs: ['好货推荐', '新品特惠', '热销爆款'],
        activeListTab: 0,
        products: [
          {
            topCat: 0,
            subCatIdx: 0,
            tabIdx: 0,
            img: '/static/shop-yuanyang-hongmi.jpg',
            title: '元阳梯田红米',
            subtitle: '红米 | 核心特色',
            price: 3990,
            unit: '袋'
          },
          {
            topCat: 0,
            subCatIdx: 0,
            tabIdx: 0,
            img: '/static/shop-zihongmi.jpg',
            title: '紫红米',
            subtitle: '红米 | 稀有品种',
            price: 1280,
            unit: '份'
          },
          {
            topCat: 0,
            subCatIdx: 1,
            tabIdx: 1,
            img: '/static/shop-special-rice1.jpg',
            title: '特色香稻 A',
            subtitle: '特色稻米 | 香甜可口',
            price: 2590,
            unit: '袋'
          },
          {
            topCat: 0,
            subCatIdx: 1,
            tabIdx: 1,
            img: '/static/shop-special-rice2.jpg',
            title: '特色香稻 B',
            subtitle: '特色稻米 | 香糯满分',
            price: 2890,
            unit: '袋'
          },
          {
            topCat: 0,
            subCatIdx: 0,
            tabIdx: 2,
            img: '/static/shop-popular-hongmi.jpg',
            title: '爆款红米',
            subtitle: '红米 | 销量冠军',
            price: 3590,
            unit: '袋'
          }
          // …可继续添加…
        ]
      };
    },
    computed: {
      filteredProducts() {
        return this.products.filter(
          (item) =>
            item.topCat === this.activeTopCat &&
            item.subCatIdx === this.activeSubCat &&
            item.tabIdx === this.activeListTab
        );
      }
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
      },
      onSearchConfirm() {
        console.log('搜索关键字：', this.searchQuery);
        uni.showToast({ title: `搜索：${this.searchQuery}`, icon: 'none' });
        // uni.navigateTo({ url: `/pages/shop/search?kw=${encodeURIComponent(this.searchQuery)}` });
      },
      goToCart() {
        uni.navigateTo({ url: '/pages/cart/cart' });
      },
      switchTopCategory(idx) {
        if (idx === this.activeTopCat) return;
        this.activeTopCat = idx;
        // 模拟不同二级分类
        if (idx === 0) this.subCategories = ['红米系列', '特色稻米', '其他...'];
        else if (idx === 1) this.subCategories = ['小米系列', '高粱', '玉米'];
        else if (idx === 2) this.subCategories = ['蔬菜 A', '蔬菜 B'];
        else if (idx === 3) this.subCategories = ['调味 A', '调味 B'];
        else if (idx === 4) this.subCategories = ['兑换商品1', '兑换商品2'];
        else this.subCategories = ['分类1', '分类2'];
        this.activeSubCat = 0;
        this.activeListTab = 0;
      },
      switchSubCategory(idx) {
        if (idx === this.activeSubCat) return;
        this.activeSubCat = idx;
        this.activeListTab = 0;
      },
      switchListTab(idx) {
        if (idx === this.activeListTab) return;
        this.activeListTab = idx;
      },
      addToCart(item) {
        uni.showToast({
          title: `已加入购物车：${item.title}`,
          icon: 'success'
        });
      }
    },
    onLoad() {
      this.currentTab = 'shop';
      this.activeTopCat = 0;
      this.activeSubCat = 0;
      this.activeListTab = 0;
    }
  };
  </script>
  
  <style scoped>
  /* ====== 顶部绿色渐变背景 ====== */
  .header-bg {
    /* 从浅绿色渐变到透明，百分比可以自己调整 */
    background: linear-gradient(
      to bottom,
      #a8d349 0%,
      rgba(255, 255, 255, 0) 60%
    );
    /* 如果想让后面部分完全衔接为白色，也可改成： 
       background: linear-gradient(to bottom, #a8d349 0%, #ffffff 80%);
    */
    /* 确保 header-bg 的高度足够包住状态栏 + 搜索 + 一级分类 */
    padding-bottom: 8px;
  }
  
  /* ===== 状态栏留白（可选） ===== */
  .status-bar-placeholder {
    height: env(safe-area-inset-top);
    width: 100%;
    background-color: transparent;
  }
  
  /* ===== 搜索栏样式（背景保持白色） ===== */
  .search-container {
    width: 100%;
    height: 48px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-radius: 24px;
    margin: 0 12px;
    margin-top: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  .search-wrapper {
    flex: 1;
    height: 32px;
    background-color: #f2f2f2;
    border-radius: 16px;
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
  .search-icon {
    font-size: 18px;
    color: #999;
    margin-right: 6px;
  }
  .search-input {
    flex: 1;
    font-size: 14px;
    height: 100%;
    line-height: 32px;
    color: #333;
    border: none;
    background: transparent;
    outline: none;
  }
  .header-cart-btn {
    width: 36px;
    height: 36px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-icon {
    font-size: 20px;
    color: #3a8cff;
  }
  
  /* ===== 顶部一级分类滚动条 ===== */
  .top-categories {
    height: 80px;
    background-color: transparent; /* 让渐变背景透出来 */
    padding-top: 4px;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
  }
  .cat-item {
    flex-shrink: 0;
    width: 72px;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cat-icon {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: #ffffff; /* 保持白色底，凸显图标 */
  }
  .cat-label {
    font-size: 12px;
    color: #333;
    margin-top: 4px;
  }
  .cat-item.active .cat-label {
    color: #3a8cff;
  }
  
  /* ===== 整体页面布局 ===== */
  .shop-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #ffffff; /* 底色为白，渐变往下渐进到白 */
  }
  
  /* ===== 中下部内容区 ===== */
  .content-area {
    flex: 1;
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
  }
  
  /* 左侧二级分类 ===== */
  .side-menu {
    width: 80px;
    background-color: #fafafa;
    border-right: 1px solid #ececec;
  }
  .side-scroll {
    height: calc(
      100vh - /* 减去 header-bg 已经占用的空间 */ (48px + 80px + env(safe-area-inset-top, 0)) - 60px
    );
  }
  .side-item {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 12px;
    position: relative;
  }
  .side-text {
    font-size: 14px;
    color: #555;
  }
  .side-item.active {
    background-color: transparent;
  }
  .side-item.active .side-text {
    color: #3a8cff;
    font-weight: bold;
  }
  .side-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 12px;
    bottom: 12px;
    width: 3px;
    background-color: #3a8cff;
  }
  
  /* 右侧商品列表 + 顶部 Tab ===== */
  .product-list {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .list-tabs {
    height: 40px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ececec;
    background-color: #ffffff;
  }
  .list-tab-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .list-tab-text {
    font-size: 14px;
    color: #666;
  }
  .list-tab-item.active .list-tab-text {
    color: #3a8cff;
    font-weight: bold;
    border-bottom: 2px solid #3a8cff;
    padding-bottom: 6px;
  }
  
  /* 商品网格 ===== */
  .products-scroll {
    flex: 1;
  }
  .product-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 12px 8px;
    justify-content: space-between;
  }
  .product-card {
    width: 48%;
    background-color: #ffffff;
    border: 1px solid #ececec;
    border-radius: 8px;
    margin-bottom: 12px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  .product-img {
    width: 100%;
    height: 100px;
  }
  .product-info {
    padding: 8px;
  }
  .product-title {
    font-size: 14px;
    color: #333;
    font-weight: 500;
    line-height: 1.2;
    height: 32px;
    overflow: hidden;
  }
  .product-subtitle {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
  }
  .product-meta {
    margin-top: 6px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .product-price {
    font-size: 16px;
    color: #f37b1d;
    font-weight: bold;
  }
  .price-unit {
    font-size: 12px;
    color: #f37b1d;
  }
  .add-cart-btn {
    width: 28px;
    height: 28px;
    background-color: #3a8cff;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .add-cart-btn .iconfont {
    font-size: 14px;
    color: #fff;
  }
  
  /* ===== 底部导航栏 ===== */
  .tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: #ffffff;
    border-top: 1px solid #ececec;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
  }
  .tabbar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #888;
  }
  .tabbar-item.active {
    color: #3a8cff;
  }
  .tabbar-item .iconfont {
    font-size: 22px;
    margin-bottom: 4px;
    color: inherit;
  }
  .tabbar-text {
    font-size: 12px;
    color: inherit;
  }
  </style>
  