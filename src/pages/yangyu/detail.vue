<template>
  <view class="container">
    <!-- 顶部图片 -->
    <view class="header">
      <image src="/static/70.jpeg" mode="aspectFill" class="header-image"></image>
    </view>

    <!-- 活动信息卡片 -->
    <view class="info-card">
      <!-- 活动名称 -->
      <view class="title-section">
        <view class="icon-title">
          <uni-icons type="calendar" size="20" color="#333"></uni-icons>
          <text class="title">活动名称：</text>
        </view>
        <text class="content">养育小组活动（运动开发24月龄-36月龄）</text>
      </view>

      <!-- 活动介绍 -->
      <view class="intro-section">
        <view class="icon-title">
          <uni-icons type="info" size="20" color="#333"></uni-icons>
          <text class="title">活动介绍：</text>
        </view>
        <text class="content">指导家庭养育实操技能、相关知识、方法，促进宝宝大运动、精细运动、语言交流、社会情绪能力的全方位发展。</text>
      </view>

      <!-- 受众儿童年龄 -->
      <view class="age-section">
        <view class="icon-title">
          <uni-icons type="person" size="20" color="#333"></uni-icons>
          <text class="title">受众儿童年龄：</text>
        </view>
        <text class="content">25月龄,26月龄,27月龄,28月龄,29月龄,30月龄,31月龄,32月龄,33月龄,34月龄,35月龄,36月龄</text>
      </view>

      <!-- 活动时间 -->
      <view class="time-section">
        <view class="icon-title">
          <uni-icons type="clock" size="20" color="#333"></uni-icons>
          <text class="title">活动时间：</text>
        </view>
        <text class="content">2024-12-18 10:00 ~ 2024-12-18 11:00</text>
      </view>

      <!-- 预约截止时间 -->
      <view class="deadline-section">
        <view class="icon-title">
          <uni-icons type="clock-filled" size="20" color="#333"></uni-icons>
          <text class="title">预约截止时间：</text>
        </view>
        <text class="content">2024-12-18 11:00</text>
      </view>

      <!-- 活动地点 -->
      <view class="location-section">
        <view class="icon-title">
          <uni-icons type="location" size="20" color="#333"></uni-icons>
          <text class="title">活动地点：</text>
        </view>
        <text class="content">杭州市拱墅区余杭��路1号拱墅健康大厦10楼亲子阅读区</text>
      </view>
    </view>

    <!-- 底部预约按钮 -->
    <view class="bottom-button">
      <button class="reserve-btn" @click="handleReserve">预约活动</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const handleReserve = () => {
  uni.showToast({
    title: '预约成功',
    icon: 'success'
  })
}

onMounted(() => {
  // 可以在这里获取路由参数，加载具体活动数据
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 120rpx;

  .header {
    width: 100%;
    height: 400rpx;

    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info-card {
    margin: 20rpx;
    padding: 30rpx;
    background: #fff;
    border-radius: 12rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);

    .icon-title {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;

      .title {
        margin-left: 12rpx;
        font-size: 30rpx;
        font-weight: bold;
        color: #333;
      }
    }

    .content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      padding-left: 44rpx;
    }

    .title-section,
    .intro-section,
    .age-section,
    .time-section,
    .deadline-section,
    .location-section {
      margin-bottom: 40rpx;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .bottom-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20rpx;
    background: #fff;
    box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

    .reserve-btn {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      background: #007AFF;
      color: #fff;
      border-radius: 40rpx;
      font-size: 30rpx;
      font-weight: bold;
    }
  }
}
</style> 