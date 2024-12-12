<template>
  <view class="container">
    <view class="content-wrapper">
      <!-- 搜索栏 -->
      <view class="search-wrapper">
        <view class="search-bar">
          <uni-icons type="search" size="16" color="#999"></uni-icons>
          <input 
            type="text" 
            v-model="searchText" 
            placeholder="搜索" 
            class="search-input"
          />
        </view>
      </view>

      <!-- 机构列表 -->
      <view class="org-list">
        <view 
          v-for="(org, index) in orgList" 
          :key="index" 
          class="org-item"
          @click="goToDetail(org)"
        >
          <image :src="org.image" mode="aspectFill" class="org-image"></image>
          <view class="org-content">
            <text class="org-name">{{ org.name }}</text>
            <view class="org-info">
              <text class="time">最近处罚时间：{{ org.punishTime }}</text>
              <view class="count">
                <text class="label">累计处罚</text>
                <text class="value">{{ org.punishCount }}次</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Organization {
  id: string
  name: string
  image: string
  punishTime: string
  punishCount: number
}

const searchText = ref('')

const orgList = ref<Organization[]>([
  {
    id: '1',
    name: '杭州格睿德托育有限公司',
    image: 'https://pic.88tph.com/13/7d/h8m8dbbfEeyEcQAWPgWqLw-0.jpg!/fw/700/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/repeat/true',
    punishTime: '2022-09-07 00:00:00',
    punishCount: 1
  },
  {
    id: '2',
    name: '杭州哆啦啦国托育服务有限公司',
    image: 'https://pic.88tph.com/13/7d/h8m8dbbfEeyEcQAWPgWqLw-0.jpg!/fw/700/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/repeat/true',
    punishTime: '2022-06-27 00:00:00',
    punishCount: 1
  },
  {
    id: '3',
    name: '杭州贝雅礼托育服务有限公司',
    image: 'https://pic.88tph.com/13/7d/h8m8dbbfEeyEcQAWPgWqLw-0.jpg!/fw/700/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/repeat/true',
    punishTime: '2022-05-24 00:00:00',
    punishCount: 1
  },
  {
    id: '4',
    name: '杭州英伦托育有限公司大塘巷分公司',
    image: 'https://pic.88tph.com/13/7d/h8m8dbbfEeyEcQAWPgWqLw-0.jpg!/fw/700/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/repeat/true',
    punishTime: '2022-05-24 00:00:00',
    punishCount: 1
  },
  {
    id: '5',
    name: '壹蒙托育（杭州富阳）有限公司',
    image: 'https://pic.88tph.com/87/c9/h8m8dbbfEeyEcQAWPgWqLw-0.jpg!/fw/700/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/repeat/true',
    punishTime: '2022-03-23 00:00:00',
    punishCount: 1
  }
])

const goToDetail = (org: Organization) => {
  uni.navigateTo({
    url: `/pages/jianguan/detail?id=${org.id}`
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';
@import '@/styles/layout.scss';

.container {
  min-height: 100vh;
  background: #f5f5f5;
}

.content-wrapper {
  width: 100%;
  max-width: 960rpx;
  margin: 0 auto;
  padding: 20rpx;
  box-sizing: border-box;
}

.search-wrapper {
  margin-bottom: 20rpx;

  .search-bar {
    background: #fff;
    border-radius: 8rpx;
    padding: 12rpx 20rpx;
    display: flex;
    align-items: center;
    gap: 12rpx;
    height: 72rpx;
    box-sizing: border-box;

    .search-input {
      flex: 1;
      font-size: 28rpx;
      color: #333;
      height: 100%;

      &::placeholder {
        color: #999;
      }
    }
  }
}

.org-list {
  .org-item {
    background: #fff;
    border-radius: 12rpx;
    padding: 24rpx;
    margin-bottom: 20rpx;
    display: flex;
    gap: 20rpx;

    .org-image {
      width: 160rpx;
      height: 160rpx;
      border-radius: $border-radius-base;
      flex-shrink: 0;
    }

    .org-content {
      flex: 1;
      @include flex-column;
      justify-content: space-between;
      min-width: 0;

      .org-name {
        font-size: $font-size-large;
        color: $text-color;
        font-weight: 500;
        @include text-ellipsis;
        margin-bottom: $spacing-xlarge;
      }

      .org-info {
        @include flex-column;
        gap: $spacing-base;

        .time {
          font-size: $font-size-base;
          color: $text-color-light;
        }

        .count {
          @include flex-center;
          gap: $spacing-small;

          .label {
            font-size: $font-size-base;
            color: $text-color-light;
          }

          .value {
            font-size: $font-size-base;
            color: $warning-color;
          }
        }
      }
    }
  }
}
</style>