<template>
  <view class="container">
    <!-- 机构基本信息 -->
    <view class="org-header">
      <image class="banner-image" src="/static/70.jpeg" mode="aspectFill" />
    </view>

    <view class="content-group">
      <!-- 机构信息卡片 -->
      <view class="content-cell">
        <view class="org-card">
          <view class="status-tag">已备案</view>
          <view class="org-title">鹿鸣国际托幼中心</view>
          <view class="org-address" @tap="openLocation">
            <text class="icon">📍</text>
            <text>苏州市吴中区独墅湖10号</text>
          </view>
          <view class="divider"></view>
          <view class="info-list">
            <view class="info-item">
              <text class="info-label">• 机构类型：</text>
            </view>
            <view class="info-item">
              <text class="info-label">• 开办日期：</text>
            </view>
            <view class="info-item">
              <text class="info-label">• 建筑面积：</text>
            </view>
            <view class="info-item">
              <text class="info-label">• 收费标准：</text>
            </view>
            <view class="info-item">
              <text class="info-label">• 总托位数：</text>
            </view>
            <view class="info-item">
              <text class="info-label">• 剩余托位：</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 机构介绍 -->
      <view class="content-cell">
        <view class="section">
          <view class="section-title">机构介绍</view>
          <view class="section-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </view>
        </view>
      </view>

      <!-- 照护团队 -->
      <view class="content-cell">
        <view class="section">
          <view class="section-title">照护团队</view>
          <view class="team-grid">
            <view class="team-item" v-for="(item, index) in 3" :key="index">
              <view class="team-box">
                <view class="placeholder"></view>
              </view>
              <text class="name">姓名</text>
              <text class="cert">资格认证</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 机构食谱 -->
      <view class="content-cell">
        <view class="section">
          <view class="section-title">机构食谱</view>
          <view class="menu-grid">
            <view class="menu-item" @click="handleRutuoClick">
              <view class="menu-box">
                <view class="placeholder">预约入托</view>
              </view>
            </view>
            <view class="menu-item" @click="handleTijianClick">
              <view class="menu-box">
                <view class="placeholder">入托体检</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 预约按钮 -->
    <button class="submit-btn" type="primary" @tap="goToForm">预约入托</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface YuyueData {
  name: string
  phone: string
  address: string
  date: string
  time: string
}

const formData = ref<YuyueData>({
  name: '',
  phone: '',
  address: '',
  date: '',
  time: ''
})

const openLocation = () => {
  const latitude = 31.2983400000
  const longitude = 120.5831900000
  const name = '鹿鸣国际托幼中心'
  const address = '苏州市吴中区独墅湖10号'

  uni.openLocation({
    latitude,
    longitude,
    name,
    address,
    success: () => {
      console.log('打开地图成功')
    },
    fail: (err) => {
      console.error('打开地图失败：', err)
      uni.showToast({
        title: '打开地图失败',
        icon: 'none'
      })
    }
  })
}

const makePhoneCall = (phoneNumber: string): void => {
  uni.makePhoneCall({
    phoneNumber,
    fail: () => {
      uni.showToast({
        title: '拨打电话失败',
        icon: 'none'
      })
    }
  })
}

const handleSubmit = (): void => {
  console.log('提交预约信息', formData.value)
  uni.showToast({
    title: '预约成功',
    icon: 'success'
  })
}

const handleDateChange = (e: { detail: { value: string } }): void => {
  formData.value.date = e.detail.value
}

const handleTimeChange = (e: { detail: { value: string } }): void => {
  formData.value.time = e.detail.value
}

const navigateToTijian = (): void => {
  uni.navigateTo({
    url: '//pages/tijianform/index'
  })
}

const goToForm = () => {
  uni.navigateTo({
    url: '/pages/rutuo/rutuoform'
  })
}

const handleRutuoClick = () => {
  uni.navigateTo({
    url: '/pages/rutuo/rutuoform'
  })
}

const handleTijianClick = () => {
  uni.navigateTo({
    url: '//pages/tijianform/index'
  })
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 120rpx;

  .org-header {
    position: relative;

    .banner-image {
      width: 100%;
      height: 400rpx;
    }
  }

  :deep(.wd-cell-group) {
    margin-top: -40rpx;
    position: relative;
    z-index: 1;
  }

  .org-card {
    background: #fff;
    padding: 30rpx;
    border-radius: 16rpx;
    position: relative;

    .status-tag {
      position: absolute;
      right: 30rpx;
      top: 30rpx;
      font-size: 24rpx;
      color: #2483F3;
      background: #e6f7ff;
      padding: 4rpx 12rpx;
      border-radius: 4rpx;
    }

    .org-title {
      font-size: 36rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 20rpx;
    }

    .org-address {
      font-size: 28rpx;
      color: #666;
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;

      .icon {
        margin-right: 10rpx;
      }
    }

    .divider {
      height: 1rpx;
      background: #eee;
      margin: 20rpx 0;
    }

    .info-list {
      display: flex;
      flex-direction: column;
      gap: 20rpx;

      .info-item {
        display: flex;
        align-items: center;

        .info-label {
          font-size: 28rpx;
          color: #333;
        }
      }
    }
  }

  .section {
    background: #fff;
    margin: 20rpx;
    padding: 30rpx;
    border-radius: 16rpx;

    .section-title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 20rpx;
      position: relative;
      padding-left: 20rpx;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6rpx;
        height: 30rpx;
        background-color: #2483F3;
      }
    }

    .section-content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20rpx;
      padding: 20rpx 0;

      .team-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .team-box {
          width: 100%;
          aspect-ratio: 1;
          background: #f5f5f5;
          border-radius: 8rpx;
          margin-bottom: 12rpx;

          .placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
            font-size: 24rpx;
          }
        }

        .name {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 4rpx;
        }

        .cert {
          font-size: 24rpx;
          color: #999;
        }
      }
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;
      padding: 20rpx 0;

      .menu-item {
        .menu-box {
          width: 100%;
          aspect-ratio: 1;
          background: #f5f5f5;
          border-radius: 8rpx;

          .placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
            font-size: 24rpx;
          }
        }
      }
    }
  }

  .submit-btn {
    position: fixed;
    bottom: 40rpx;
    left: 20rpx;
    right: 20rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background-color: #2979ff;
    color: #fff;
    border-radius: 44rpx;
    font-size: 32rpx;
  }
}
</style>