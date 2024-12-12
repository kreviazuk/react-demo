<template>
  <view class="page-container">
    <view class="content-wrapper">
      <!-- Tabs -->
      <view class="tabs">
        <view 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="['tab-item', { active: currentTab === index }]"
          @click="currentTab = index"
        >
          {{ tab }}
        </view>
      </view>

      <!-- 规范化培训 Content -->
      <view v-show="currentTab === 0">
        <!-- Training Stats -->
        <view class="stats-grid">
          <view class="stats-card orange">
            <view class="stats-title">
              <text>实训基地培训活动</text>
              <text class="subtitle">有效培训时长</text>
            </view>
            <view class="stats-value">
              <text class="number">0</text>
              <text class="unit">h</text>
              <text class="number">0</text>
              <text class="unit">min</text>
            </view>
          </view>
          <view class="stats-card blue">
            <view class="stats-title">
              <text>机构观摩</text>
              <text class="subtitle">有效培训时长</text>
            </view>
            <view class="stats-value">
              <text class="number">0</text>
              <text class="unit">h</text>
              <text class="number">0</text>
              <text class="unit">min</text>
            </view>
          </view>
        </view>

        <!-- Empty State for 规范化培训 -->
        <view class="empty-state">
          <image src="/static/images/empty-box.png" mode="aspectFit" class="empty-image"></image>
          <text class="empty-text">暂无可观摩机构</text>
        </view>
      </view>

      <!-- 技能培训 Content -->
      <view v-show="currentTab === 1">
        <!-- Search Bar -->
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
          <text class="filter-btn">筛选</text>
        </view>

        <!-- Training List -->
        <view class="training-list" v-if="trainingList.length > 0">
          <view 
            v-for="(item, index) in trainingList" 
            :key="index"
            class="training-item"
          >
            <view class="training-content">
              <text class="training-title">{{ item.title }}</text>
              <view class="training-info">
                <text class="duration">{{ item.duration }}</text>
                <text class="date">{{ item.date }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- Empty State for 技能培训 -->
        <view class="empty-state" v-else>
          <image src="/static/images/empty-box.png" mode="aspectFit" class="empty-image"></image>
          <text class="empty-text">暂无培训记录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ['规范化培训', '技能培训']
const currentTab = ref(0)
const searchText = ref('')

interface TrainingItem {
  title: string
  duration: string
  date: string
}

const trainingList = ref<TrainingItem[]>([
  {
    title: '培训标题',
    duration: '3h45min',
    date: '2020-09-10'
  },
  {
    title: '培训标题',
    duration: '3h45min',
    date: '2020-09-10'
  }
])
</script>

<style lang="scss" scoped>
@import '@/styles/layout.scss';

.page-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: env(safe-area-inset-bottom);
}

.content-wrapper {
  width: 100%;
  max-width: 960rpx;
  margin: 0 auto;
  padding: 20rpx;
  box-sizing: border-box;
}

.tabs {
  display: flex;
  background: #f0f0f0;
  border-radius: 8rpx;
  padding: 8rpx;
  margin-bottom: 20rpx;

  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 16rpx 0;
    border-radius: 6rpx;

    &.active {
      background: #2979ff;
      color: #fff;
    }
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  margin-bottom: 20rpx;
}

.stats-card {
  background: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;

  &.orange {
    background: linear-gradient(135deg, #ff9966, #ff5e62);
  }

  &.blue {
    background: linear-gradient(135deg, #4e54c8, #8f94fb);
  }

  .stats-title {
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    color: #fff;
    font-size: 28rpx;

    .subtitle {
      font-size: 24rpx;
      opacity: 0.9;
    }
  }

  .stats-value {
    display: flex;
    align-items: baseline;
    color: #fff;
    gap: 4rpx;

    .number {
      font-size: 48rpx;
      font-weight: 500;
    }

    .unit {
      font-size: 24rpx;
      margin-right: 12rpx;
    }
  }
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 20rpx;

  .search-bar {
    flex: 1;
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

  .filter-btn {
    font-size: 28rpx;
    color: #666;
  }
}

.training-list {
  .training-item {
    background: #fff;
    border-radius: 8rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;

    .training-content {
      display: flex;
      flex-direction: column;
      gap: 12rpx;
    }

    .training-title {
      font-size: 28rpx;
      color: #333;
      font-weight: 500;
    }

    .training-info {
      display: flex;
      gap: 20rpx;
      font-size: 24rpx;
      color: #999;
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 0;
  
  .empty-image {
    width: 240rpx;
    height: 240rpx;
    margin-bottom: 20rpx;
  }

  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}
</style>