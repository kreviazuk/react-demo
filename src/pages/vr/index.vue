<template>
  <view class="vr-container">
    <!-- 搜索框 -->
    <view class="search-box">
      <input 
        type="text" 
        v-model="searchText"
        placeholder="搜索托育机构" 
        @input="handleSearch"
      />
      <img src="/static/images/search.png" class="search-icon"/>
    </view>

    <!-- VR概览标题 -->
    <view class="section-title">
      <view class="blue-bar"></view>
      <text>托育机构VR</text>
    </view>

    <!-- VR列表 -->
    <view class="vr-list">
      <view 
        class="vr-item" 
        v-for="(item, index) in filteredList" 
        :key="index"
        @click="openVR(item.vrLink)"
      >
        <view class="vr-image">
          <image :src="item.image" mode="aspectFill" class="preview-image" />
          <image 
            src="/static/images/vr-play.png" 
            mode="aspectFit" 
            class="vr-play-icon"
          />
        </view>
        <view class="vr-info">
          <view class="institution-name">{{ item.name }}</view>
          <view class="institution-address">{{ item.address }}</view>
          <view class="institution-distance">距您{{ item.distance }}km</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface VRItem {
  name: string;
  address: string;
  distance: string;
  image: string;
  vrLink: string;
}

import { ref, computed } from 'vue'

const searchText = ref('')

// VR列表数据
const vrList = ref([
  {
    name: '杭州幼聪托育有限公司',
    address: '浙江省杭州市浦江区',
    distance: '127.8',
    image: 'https://img.qmniu.com/allimg/c130924/13T29261932220-1T05_lit.jpg',
    vrLink: 'https://www.720yun.com/vr/d43jkrmuOw7'
  },
  {
    name: '杭州百艺托托育有限公司',
    address: '浙江省杭州市临平区',
    distance: '101.4',
    image: 'https://img.qmniu.com/allimg/c130924/13T29261932220-1T05_lit.jpg',
    vrLink: 'https://www.720yun.com/vr/d43jkrmuOw7'
  }
] as VRItem[])

const filteredList = computed(() => {
  if (!searchText.value) return vrList.value;
  const searchLower = searchText.value.toLowerCase();
  return vrList.value.filter(item => 
    item.name.toLowerCase().includes(searchLower) ||
    item.address.toLowerCase().includes(searchLower)
  );
})

const openVR = (link: string) => {
  console.log(link)
  window.open('https://www.720yun.com/vr/d43jkrmuOw7', '_blank');
}

const handleSearch = () => {
  // 搜索功能已通过computed属性实现
}
</script>

<style lang="scss" scoped>
.vr-container {
  padding: 16px;
  background: #F5F5F5;
  min-height: 100vh;

  .search-box {
    position: relative;
    margin-bottom: 16px;

    input {
      width: 100%;
      height: 40px;
      padding: 0 40px 0 16px;
      border-radius: 20px;
      border: none;
      background: white;
      font-size: 14px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &::placeholder {
        color: #999;
      }
    }

    .search-icon {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
    }
  }

  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .blue-bar {
      width: 4px;
      height: 16px;
      background: #2196F3;
      margin-right: 8px;
      border-radius: 2px;
    }

    text {
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
  }

  .vr-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    .vr-item {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      cursor: pointer;

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .vr-image {
        position: relative;
        width: 100%;
        padding-bottom: 75%;

        .preview-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .vr-play-icon {
          position: absolute;
          right: 8px;
          bottom: 8px;
          width: 32px;
          height: 32px;
          z-index: 1;
        }
      }

      .vr-info {
        padding: 12px;

        .institution-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .institution-address {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .institution-distance {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
