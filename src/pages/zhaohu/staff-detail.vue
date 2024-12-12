<template>
  <view class="container">
    <!-- 基本信息 -->
    <view class="staff-info">
      <image :src="staffInfo.avatar" class="avatar" mode="aspectFill"></image>
      <view class="info-content">
        <view class="name">{{ staffInfo.name }}</view>
        <view class="role">{{ staffInfo.role }}</view>
        <view class="company">{{ staffInfo.company }}</view>
      </view>
    </view>

    <!-- 证照展示 -->
    <view class="cert-section">
      <view class="section-title">
        <view class="blue-line"></view>
        <text>证照展示</text>
      </view>
      <view class="cert-grid">
        <view 
          v-for="(img, index) in staffInfo.certificates" 
          :key="index" 
          class="cert-item"
          @click="previewImage(index)"
        >
          <image :src="img.url" mode="aspectFill"></image>
          <text class="cert-name">{{ img.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Certificate {
  url: string
  name: string
}

interface StaffDetail {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  certificates: Certificate[]
}

const staffInfo = ref<StaffDetail>({
  id: '',
  name: '寿文君',
  role: '园长',
  company: '蹦哒哒托育（杭州）有限公司',
  avatar: '/static/images/avatar.png',
  certificates: [
    {
      url: 'https://pic.88tph.com/87/c9/h8m8dbbfEeyEcQAWPgWqLw-0.jpg!/fw/700/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/repeat/true',
      name: '园长上岗证'
    },
    {
      url: 'https://pic.88tph.com/87/c9/h8m8dbbfEeyEcQAWPgWqLw-0.jpg!/fw/700/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/repeat/true',
      name: '育婴师资格证'
    }
  ]
})

// 预览图片
const previewImage = (index: number) => {
  const urls = staffInfo.value.certificates.map(cert => cert.url)
  uni.previewImage({
    urls,
    current: urls[index]
  })
}

onMounted(() => {
  // 获取路由参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const id = currentPage.$page?.options?.id

  // TODO: 根据id获取员工详情
  console.log('Staff ID:', id)
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 40rpx;
}

.staff-info {
  background: #fff;
  padding: 40rpx;
  display: flex;
  align-items: center;
  gap: 30rpx;

  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 8rpx;
  }

  .info-content {
    flex: 1;

    .name {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 8rpx;
    }

    .role {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 8rpx;
    }

    .company {
      font-size: 26rpx;
      color: #999;
    }
  }
}

.cert-section {
  margin-top: 20rpx;
  background: #fff;
  padding: 30rpx;

  .section-title {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 30rpx;

    .blue-line {
      width: 6rpx;
      height: 32rpx;
      background: #007AFF;
      border-radius: 3rpx;
    }

    text {
      font-size: 30rpx;
      font-weight: bold;
      color: #333;
    }
  }

  .cert-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;

    .cert-item {
      background: #f8f8f8;
      border-radius: 8rpx;
      overflow: hidden;

      image {
        width: 100%;
        height: 320rpx;
        object-fit: cover;
      }

      .cert-name {
        display: block;
        padding: 16rpx;
        font-size: 26rpx;
        color: #666;
        text-align: center;
      }
    }
  }
}
</style> 