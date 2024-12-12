<template>
  <view class="container">
    <view class="header">
      <!-- 搜索栏 -->
      <view class="search-bar">
        <view class="search-input">
          <uni-icons type="search" size="16" color="#999"></uni-icons>
          <input type="text" placeholder="搜索" v-model="searchText" />
        </view>
        <view class="filter-btn" @click="showFilter = true">
          <text>筛选</text>
          <uni-icons type="filter" size="16" color="#666"></uni-icons>
        </view>
      </view>

      <!-- 筛选下拉框 -->
      <view class="filter-dropdown" v-if="showFilter">
        <view class="filter-section">
          <view class="filter-title">活动类型</view>
          <view class="filter-options">
            <view 
              v-for="(type, index) in ['全部', '视频知识', '图文知识']" 
              :key="index"
              :class="['filter-option', selectedType === type ? 'active' : '']"
              @click="selectType(type)"
            >
              {{ type }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 遮罩层 -->
    <view class="mask" v-if="showFilter" @click="closeFilter"></view>

    <!-- 资讯列表 -->
    <view class="news-list">
      <view class="news-item" v-for="(item, index) in newsList" :key="index" @click="goToDetail(item)">
        <view class="news-image-wrapper">
          <image :src="item.image" mode="aspectFill" class="news-image"></image>
          <view class="play-icon">
            <uni-icons type="videocam-filled" size="24" color="#fff"></uni-icons>
          </view>
        </view>
        <view class="news-title">{{ item.title }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface NewsItem {
  id: string
  title: string
  image: string
}

const searchText = ref('')
const showFilter = ref(false)
const selectedType = ref('全部')

const newsList = ref<NewsItem[]>([
  {
    id: '1',
    title: '0-3月龄婴幼儿大运动发育指导',
    image: '/static/images/news1.png'
  },
  {
    id: '2',
    title: '婴儿主被动操',
    image: '/static/images/news2.png'
  },
  {
    id: '3',
    title: '宝宝疫苗接种',
    image: '/static/images/news3.png'
  },
  {
    id: '4',
    title: '图书推荐——西瓜船',
    image: '/static/images/news4.png'
  },
  {
    id: '5',
    title: '"好妈妈"厨房 母乳喂养的正确姿势',
    image: '/static/images/news5.png'
  },
  {
    id: '6',
    title: '宝宝吐奶怎么办？',
    image: '/static/images/news6.png'
  },
  {
    id: '7',
    title: '电子产品能早期学习吗？',
    image: '/static/images/news7.png'
  },
  {
    id: '8',
    title: '宝宝如何整夜睡眠',
    image: '/static/images/news8.png'
  }
])

const goToDetail = (item: NewsItem) => {
  // 跳转到资讯详情页
  uni.navigateTo({
    url: `/pages/zixun/detail?id=${item.id}`
  })
}

const closeFilter = () => {
  showFilter.value = false
}

const selectType = (type: string) => {
  selectedType.value = type
  closeFilter()
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background: #fff;
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-input {
  flex: 1;
  height: 36px;
  background: #f5f5f5;
  border-radius: 18px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    flex: 1;
    font-size: 14px;
  }
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
}

.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 108px; // 头部高度
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
}

.filter-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 10;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-section {
  .filter-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  .filter-options {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .filter-option {
    padding: 6px 16px;
    background: #f5f5f5;
    border-radius: 16px;
    font-size: 14px;
    color: #666;

    &.active {
      background: #007AFF;
      color: #fff;
    }
  }
}

.news-list {
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.news-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.news-image-wrapper {
  position: relative;
  padding-top: 56.25%; // 16:9 比例
}

.news-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-icon {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.news-title {
  padding: 8px;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>