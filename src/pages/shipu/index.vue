<template>
  <view class="container">
    <view class="content-wrapper">
      <!-- 搜索栏 -->
      <view class="search-bar">
        <view class="search-input">
          <uni-icons type="search" size="16" color="#999"></uni-icons>
          <input type="text" placeholder="请输入搜索关键词" v-model="searchText" class="input" />
        </view>
      </view>

      <!-- 机构列表 -->
      <view class="org-list">
        <view v-for="(org, index) in orgList" :key="index" class="org-item">
          <!-- 机构名称 -->
          <view class="org-header" @click="goToOrgDetail(org)">
            <view class="org-title">
              <view class="blue-line"></view>
              <text class="org-name">{{ org.name }}</text>
            </view>
            <uni-icons type="right" size="16" color="#666"></uni-icons>
          </view>
          <!-- 食谱列表 -->
          <scroll-view class="menu-list" scroll-x="true" show-scrollbar="false">
            <view v-for="(menu, menuIndex) in org.menus" :key="menuIndex" class="menu-item" @click="goToMenuDetail(menu)">
              <image 
                :src="menu.image" 
                class="menu-image" 
                mode="aspectFill"
                @click.stop="previewImage(menu.image)"
              ></image>
              <view class="menu-info">
                <text class="menu-name">{{ menu.name }}</text>
                <text class="menu-date">{{ menu.date }}</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Menu {
  name: string
  date: string
  image: string
}

interface Organization {
  name: string
  menus: Menu[]
}

const searchText = ref('')

const orgList = ref<Organization[]>([
  {
    name: '杭州贝亲托育有限公司',
    menus: [
      { name: '本周食谱', date: '12.11-12.15', image: '/static/images/menu1.png' },
      { name: '下周食谱', date: '12.18-12.22', image: '/static/images/menu2.png' },
      { name: '上周食谱', date: '12.04-12.08', image: '/static/images/menu3.png' }
    ]
  },
  {
    name: '杭州安宇托育有限公司',
    menus: [
      { name: '本周食谱', date: '12.11-12.15', image: '/static/images/menu1.png' },
      { name: '下周食谱', date: '12.18-12.22', image: '/static/images/menu2.png' }
    ]
  },
  {
    name: '杭州稚趣星托育服务有限公司',
    menus: [
      { name: '本周食谱', date: '12.11-12.15', image: '/static/images/menu1.png' },
      { name: '下周食谱', date: '12.18-12.22', image: '/static/images/menu2.png' }
    ]
  }
])

// 跳转到机构详情
const goToOrgDetail = (org: Organization) => {
  uni.navigateTo({
    url: `/pages/shipu/org-detail?id=${org.id}`
  })
}

// 跳转到食谱详情
const goToMenuDetail = (menu: Menu) => {
  uni.navigateTo({
    url: `/pages/shipu/menu-detail?name=${menu.name}&date=${menu.date}`
  })
}

// 预览图片
const previewImage = (image: string) => {
  uni.previewImage({
    urls: [image],
    current: image
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content-wrapper {
  max-width: 750rpx;
  margin: 0 auto;
  padding: 30rpx;
}

.search-bar {
  margin-bottom: 30rpx;

  .search-input {
    height: 80rpx;
    background: #fff;
    border-radius: 40rpx;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;

    .input {
      flex: 1;
      font-size: 28rpx;
    }
  }
}

.org-list {
  .org-item {
    background: #fff;
    border-radius: 20rpx;
    margin-bottom: 30rpx;
    padding: 30rpx;
  }
}

.org-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
  
  .org-title {
    display: flex;
    align-items: center;
    gap: 20rpx;

    .blue-line {
      width: 8rpx;
      height: 36rpx;
      background: #007AFF;
      border-radius: 4rpx;
    }

    .org-name {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }
  }
}

.menu-list {
  white-space: nowrap;

  .menu-item {
    display: inline-block;
    margin-right: 20rpx;
    width: 280rpx;

    &:last-child {
      margin-right: 0;
    }

    .menu-image {
      width: 280rpx;
      height: 210rpx;
      border-radius: 16rpx;
      margin-bottom: 20rpx;
    }

    .menu-info {
      .menu-name {
        font-size: 28rpx;
        color: #333;
        display: block;
        margin-bottom: 10rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .menu-date {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}
</style>
