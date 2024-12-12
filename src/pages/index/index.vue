<template>
  <view class="container">
    <view class="content-wrapper">
      <!-- Banner section -->
      <view class="banner">
        <image src="/static/70.jpeg" mode="aspectFill" class="banner-image" />
        <view class="banner-text">
          <text class="banner-title font-bold">托育一件事</text>
          <text class="banner-subtitle font-regular">让托育更简单</text>
        </view>
      </view>

      <!-- Grid of services -->
      <view class="grid">
        <view class="section-title font-medium">热门服务</view>
        <wd-grid :column="4" :border="false">
          <wd-grid-item 
            v-for="(item, index) in services" 
            :key="index"
            :icon="item.icon"
            :text="item.text"
            @click="handleServiceClick(item)"
            custom-class="grid-item-custom"
          />
        </wd-grid>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ServiceItem {
  icon: string
  text: string
}

const services = ref<ServiceItem[]>([
  { icon: '/static/images/tabbar/education.png', text: '我要办托' },
  { icon: '/static/images/tabbar/education.png', text: '我要入托' },
  { icon: '/static/images/tabbar/education.png', text: '入托体检' },
  { icon: '/static/images/tabbar/education.png', text: '一键建托' },
  { icon: '/static/images/tabbar/education.png', text: 'VR云看托' },
  { icon: '/static/images/tabbar/education.png', text: '养育照护活动' },
  { icon: '/static/images/tabbar/education.png', text: '养育资讯' },
  { icon: '/static/images/tabbar/education.png', text: '照护人才风采' },
  { icon: '/static/images/tabbar/education.png', text: '机构食谱' },
  { icon: '/static/images/tabbar/education.png', text: '家园共育' },
  { icon: '/static/images/tabbar/education.png', text: '机构监管信息' },
  { icon: '/static/images/tabbar/education.png', text: '人才培训' }
])

const handleServiceClick = (item: ServiceItem): void => {
  if (item.text === '一键建托') {
    uni.navigateTo({
      url: '/pages/jiantuo/index'
    })
  } else {
    console.log('Service clicked:', item.text)
    switch (item.text) {
      case '我要办托':
        uni.navigateTo({
          url: '/pages/bantuo/index'
        })
        break
      case '我要入托':
        uni.navigateTo({
          url: '/pages/rutuo/rutuo'
        })
        break
      case '入托体检':
        uni.navigateTo({
          url: '/pages/tijianform/index'
        })
        break
      case 'VR云看托':
        uni.navigateTo({
          url: '/pages/vr/index'
        })
        break
      case '养育照护活动':
        uni.navigateTo({
          url: '/pages/yangyu/index'
        })
        break
      case '养育资讯':
        uni.navigateTo({
          url: '/pages/zixun/index'
        })
        break
      case '照护人才风采':
        uni.navigateTo({
          url: '/pages/zhaohu/index'
        })
        break
      case '机构食谱':
        uni.navigateTo({
          url: '/pages/shipu/index'
        })
        break
      case '家园共育':
        uni.navigateTo({
          url: '/pages/jiayuan/index'
        })
        break
      case '机构监管信息':
        uni.navigateTo({
          url: '/pages/jianguan/index'
        })
        break
      case '人才培训':
        uni.navigateTo({
          url: '/pages/peixun/index'
        })
        break
      default:
        uni.showToast({
          title: '功能开发中',
          icon: 'none'
        })
    }
  }
}

const goToRutuo = () => {
  uni.navigateTo({
    url: '/pages/rutuo/rutuo'
  })
}

const goToParentingActivities = () => {
  uni.navigateTo({
    url: '/pages/yangyu/index'
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 120rpx;
}

.content-wrapper {
  width: 100%;
  max-width: 960rpx;
  margin: 0 auto;
  padding: 0 20rpx;
  box-sizing: border-box;
}

.banner {
  position: relative;
  width: 100%;
  height: 400rpx;
  overflow: hidden;
  border-radius: 0 0 12rpx 12rpx;
  margin: 0 -20rpx;

  .banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .banner-text {
    position: absolute;
    top: 50%;
    left: 50rpx;
    transform: translateY(-50%);
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    .banner-title {
      font-size: 48rpx;
    }

    .banner-subtitle {
      font-size: 32rpx;
      opacity: 0.9;
    }
  }
}

.grid {
  margin-top: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);

  .section-title {
    font-size: 32rpx;
    color: #333;
    padding: 30rpx 30rpx 20rpx;
  }

  :deep(.wd-grid) {
    padding: 10rpx;
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    grid-gap: 10rpx;
  }

  :deep(.wd-grid-item) {
    padding: 20rpx 0;
    width: 100% !important;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :deep(.grid-item-custom) {
    height: auto !important;
  }

  :deep(.wd-grid-item__icon) {
    width: 48rpx;
    height: 48rpx;
    margin-bottom: 10rpx;
  }

  :deep(.wd-grid-item__text) {
    font-size: 24rpx;
    color: #333;
    white-space: normal;
    line-height: 1.2;
  }
}
</style>
