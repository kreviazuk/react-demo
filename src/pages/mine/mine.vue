<template>
  <view class="container">
    <!-- 用户信息 -->
    <view class="user-info">
      <view class="avatar-wrapper">
        <image 
          src="/static/images/default-avatar.png" 
          mode="aspectFill" 
          class="avatar"
        ></image>
      </view>
      <view class="user-detail">
        <view class="name-row">
          <text class="label">姓名</text>
          <uni-icons type="plusempty" size="8" color="#999"></uni-icons>
        </view>
        <text class="name">幼儿姓名</text>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="function-list">
      <view 
        v-for="(item, index) in functionList" 
        :key="index"
        class="function-item"
        @click="handleItemClick(item)"
      >
        <text class="item-text">{{ item.text }}</text>
        <uni-icons type="right" size="8" color="#999"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FunctionItem {
  text: string
  path: string
}

const functionList = ref<FunctionItem[]>([
  { text: '我的活动', path: '/pages/mine/activity' },
  { text: '入托预约', path: '/pages/rutuo/yuyue' },
  { text: '入托体检预约', path: '/pages/tijianform/index' },
  { text: '临时托预约', path: '/pages/rutuo/temp' },
  { text: '我的培训', path: '/pages/mine/training' },
  { text: '我的考核', path: '/pages/mine/assessment' },
  { text: '我的证书', path: '/pages/mine/certificate' },
  { text: '消息中心', path: '/pages/mine/message' }
])

const handleItemClick = (item: FunctionItem) => {
  uni.navigateTo({
    url: item.path
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
  box-sizing: border-box;
}

.user-info {
  background: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  gap: 20rpx;

  .avatar-wrapper {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    overflow: hidden;
    background: #f5f5f5;
  }

  .avatar {
    width: 100%;
    height: 100%;
  }

  .user-detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name-row {
      display: flex;
      align-items: center;
      gap: 12rpx;
      margin-bottom: 8rpx;

      .label {
        font-size: 28rpx;
        color: #999;
        margin-right: auto;
      }
    }

    .name {
      font-size: 28rpx;
      color: #333;
    }
  }
}

.function-list {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;

  .function-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 30rpx;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .item-text {
      font-size: 28rpx;
      color: #333;
    }
  }
}
</style>
