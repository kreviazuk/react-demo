<template>
    <view class="container">
      <!-- 搜索栏 -->
      <view class="search-bar">
        <view class="search-wrapper">
          <view class="search-input">
            <uni-icons type="search" size="16" color="#999"></uni-icons>
            <input type="text" placeholder="搜索" v-model="searchText" />
          </view>
        </view>
        <view class="filter-btn" @click="showFilter = true">
          <text>筛选</text>
          <uni-icons type="filter" size="16" color="#666"></uni-icons>
        </view>
      </view>
  
      <!-- 导航标签 -->
      <view class="nav-tabs">
        <view 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="['tab-item', activeTab === index ? 'active' : '']"
          @click="activeTab = index"
        >
          {{ tab }}
        </view>
      </view>
  
      <!-- 活动列表 -->
      <view class="activity-list">
        <view class="activity-item" v-for="(item, index) in activities" :key="index" @click="goToDetail(item)">
          <image :src="item.image" mode="aspectFill" class="activity-image"></image>
          <view class="activity-content">
            <view class="activity-title">{{ item.title }}</view>
            <view class="activity-source">来源：{{ item.source }}</view>
            <view class="activity-time">{{ item.time }}</view>
            <view class="activity-address">{{ item.address }}</view>
          </view>
          <view class="activity-quota">{{ item.quota }}</view>
        </view>
      </view>
  
      <!-- 筛选下拉框 -->
      <view class="mask" v-if="showFilter" @click="closeFilter"></view>
      <view class="filter-dropdown" v-if="showFilter">
        <!-- 区域筛选 -->
        <view class="filter-section">
          <view class="filter-title">区域</view>
          <view class="filter-options">
            <view 
              v-for="(area, index) in areas" 
              :key="index"
              :class="['filter-option', selectedArea === area ? 'active' : '']"
              @click="selectArea(area)"
            >
              {{ area }}
            </view>
          </view>
        </view>
        <!-- 活动类型筛选 -->
        <view class="filter-section">
          <view class="filter-title">活动类型</view>
          <view class="filter-options">
            <view 
              v-for="(type, index) in activityTypes" 
              :key="index"
              :class="['filter-option', selectedType === type ? 'active' : '']"
              @click="selectType(type)"
            >
              {{ type }}
            </view>
          </view>
        </view>
        <!-- 按钮组 -->
        <view class="filter-buttons">
          <view class="reset-btn" @click="resetFilter">重置</view>
          <view class="confirm-btn" @click="confirmFilter">确定</view>
        </view>
      </view>
    </view>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  interface Activity {
    id: string
    title: string
    image: string
    source: string
    time: string
    address: string
    quota: string
  }
  
  const searchText = ref<string>('')
  const showFilter = ref<boolean>(false)
  const activeTab = ref<number>(0)
  const selectedArea = ref<string>('')
  const selectedType = ref<string>('')
  
  const tabs: string[] = ['区级托育综合服务中心', '婴幼儿成长驿站', '"医防护"儿童发展中心']
  
  const activities = ref<Activity[]>([
    {
      id: '1',
      title: '养育小组活动（运动开发24月龄-36月龄）',
      image: '/static/images/activity1.png',
      source: '拱墅区托育综合服务中心',
      time: '2024-12-18 10:00:00',
      address: '119.0km | 杭州市拱墅区余杭塘路1号拱墅区托育综合服务中心',
      quota: '0/8'
    },
    {
      id: '2',
      title: '养育小组活动（养育照护活动15-18月龄）',
      image: '/static/images/activity2.png',
      source: '拱墅区托育综合服务中心',
      time: '2024-12-13 10:00:00',
      address: '119.0km | 杭州市拱墅区余杭塘路1号拱墅区托育综合服务中心',
      quota: '0/8'
    },
    {
      id: '3',
      title: '养育小组活动（好妈妈营养厨房辅食课）',
      image: '/static/images/activity3.png',
      source: '拱墅区托育综合服务中心',
      time: '2024-12-18 10:00:00',
      address: '120.9km | 杭州市拱墅区余杭塘路1号拱墅区托育综合服务中心',
      quota: '0/8'
    }
  ])
  
  // 区域数据
  const areas: string[] = [
    '杭州市', '上城区', '拱墅区', '西湖区', '滨江区',
    '萧山区', '余杭区', '临平区', '钱塘区', '富阳区',
    '临安区', '建德市', '淳安县', '桐庐县'
  ]
  
  // 活动类型数据
  const activityTypes: string[] = [
    '养育小组活动', '培训活动', '活动地点距离', '由近到远', '由远到近'
  ]
  
  // 筛选方法
  const selectArea = (area: string): void => {
    selectedArea.value = area
  }
  
  const selectType = (type: string): void => {
    selectedType.value = type
  }
  
  const resetFilter = (): void => {
    selectedArea.value = ''
    selectedType.value = ''
  }
  
  const closeFilter = (): void => {
    showFilter.value = false
  }
  
  const confirmFilter = (): void => {
    showFilter.value = false
    // 这里添加筛选逻辑
  }
  
  const goToDetail = (item: Activity) => {
    uni.navigateTo({
      url: `/pages/yangyu/detail?id=${item.id}`
    })
  }
  </script>
  
  <style lang="scss" scoped>
  .container {
    padding: 0;
    background: #f5f5f5;
    min-height: 100vh;
  
    .search-bar {
      display: flex;
      align-items: center;
      padding: 6rpx 12rpx;
      background: #fff;
      justify-content: space-between;
  
      .search-wrapper {
        flex: 1;
        margin-right: 20rpx;
  
        .search-input {
          display: flex;
          align-items: center;
          background: #f5f5f5;
          padding: 4rpx 12rpx;
          border-radius: 30rpx;
          height: 56rpx;
  
          input {
            flex: 1;
            margin-left: 10rpx;
            font-size: 26rpx;
            height: 48rpx;
            line-height: 48rpx;
          }
        }
      }
  
      .filter-btn {
        display: flex;
        align-items: center;
        font-size: 26rpx;
        color: #666;
        padding: 0 10rpx;
        height: 56rpx;
        line-height: 56rpx;
        min-width: 100rpx;
        justify-content: flex-end;
  
        text {
          margin-right: 4rpx;
        }
      }
    }
  
    .nav-tabs {
      display: flex;
      background: #fff;
      margin-top: 2rpx;
      padding: 10rpx 0;
      border-radius: 8rpx;
      position: relative;
      z-index: 1000;
  
      .tab-item {
        flex: 1;
        text-align: center;
        font-size: 26rpx;
        color: #666;
        padding: 6rpx 0;
  
        &.active {
          color: #007AFF;
          position: relative;
  
          &::after {
            content: '';
            position: absolute;
            bottom: -10rpx;
            left: 50%;
            transform: translateX(-50%);
            width: 40rpx;
            height: 4rpx;
            background: #007AFF;
          }
        }
      }
    }
  
    .activity-list {
      padding: 20rpx;
  
      .activity-item {
        display: flex;
        background: #fff;
        padding: 20rpx;
        margin-bottom: 20rpx;
        border-radius: 8rpx;
        position: relative;
  
        .activity-image {
          width: 160rpx;
          height: 160rpx;
          border-radius: 8rpx;
        }
  
        .activity-content {
          flex: 1;
          margin-left: 20rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
  
          .activity-title {
            font-size: 28rpx;
            font-weight: bold;
            margin-bottom: 10rpx;
          }
  
          .activity-source {
            font-size: 24rpx;
            color: #666;
            margin-bottom: 10rpx;
          }
  
          .activity-time {
            font-size: 24rpx;
            color: #999;
            margin-bottom: 10rpx;
          }
  
          .activity-address {
            font-size: 24rpx;
            color: #999;
          }
        }
  
        .activity-quota {
          position: absolute;
          top: 20rpx;
          right: 20rpx;
          background: #fef0f0;
          color: #f56c6c;
          padding: 4rpx 12rpx;
          border-radius: 4rpx;
          font-size: 24rpx;
        }
      }
    }
  }
  
  .mask {
    position: fixed;
    top: 160rpx;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 99;
  }
  
  .filter-dropdown {
    position: absolute;
    top: 160rpx;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 999;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  
    .filter-section {
      padding: 20rpx;
      border-bottom: 1rpx solid #eee;
  
      .filter-title {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 20rpx;
      }
  
      .filter-options {
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;
  
        .filter-option {
          padding: 10rpx 20rpx;
          background: #f5f5f5;
          border-radius: 24rpx;
          font-size: 24rpx;
          color: #666;
  
          &.active {
            background: #e1f0ff;
            color: #007AFF;
          }
        }
      }
    }
  
    .filter-buttons {
      display: flex;
      padding: 20rpx;
      gap: 20rpx;
  
      .reset-btn, .confirm-btn {
        flex: 1;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 40rpx;
        font-size: 28rpx;
      }
  
      .reset-btn {
        background: #f5f5f5;
        color: #666;
      }
  
      .confirm-btn {
        background: #007AFF;
        color: #fff;
      }
    }
  }
  </style>