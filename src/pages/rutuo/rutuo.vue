<template>
  <view class="container">
    <!-- 顶部搜索区域 -->
    <view class="search-section">
      <view class="search-bar">
        <view class="location" @tap="selectLocation">
          {{ selectedLocation || '上城' }}
          <text class="arrow-down">▼</text>
        </view>
        <wd-search
          v-model="searchText"
          placeholder="搜索"
          class="search-box"
          cancel-txt="筛选"
        />
      </view>
      
      <!-- 城市选择弹出层 -->
      <view class="mask-container" v-if="showCityPicker">
        <view class="city-popup-mask" @tap="closeCityPicker"></view>
        <view class="popup-wrapper">
          <transition name="slide-down">
            <view class="city-popup" v-show="showCityPicker">
              <view class="city-content">
                <view class="city-grid">
                  <view 
                    class="city-item" 
                    v-for="(city, index) in cityList" 
                    :key="index"
                    :class="{ active: city === selectedLocation }"
                    @tap="selectCity(city)"
                  >
                    {{ city }}
                  </view>
                </view>
              </view>
            </view>
          </transition>
        </view>
      </view>
    </view>

    <!-- 机构列表 -->
    <view class="org-list">
      <view 
        class="org-item" 
        v-for="(org, index) in orgList" 
        :key="index" 
        @tap="goToYuyue(org)"
      >
        <view class="org-left">
          <image :src="org.image" mode="aspectFill" class="org-image" />
          <view class="emergency-tag" v-if="org.isEmergency">紧急招生</view>
        </view>
        <view class="org-info">
          <view class="org-title">
            <text class="org-name">{{ org.name }}</text>
            <text class="distance">{{ org.distance }}</text>
          </view>
          <view class="org-tags">
            <text class="tag" v-for="(tag, tagIndex) in org.tags" :key="tagIndex">
              {{ tag }}
            </text>
          </view>
          <view class="org-address">
            <text class="icon">📍</text>
            <text class="address">{{ org.address }}</text>
            <text class="detail">详情 ></text>
          </view>
          <view class="capacity" v-if="org.capacity">
            <text class="icon">👶</text>
            <text>托位：{{ org.capacity }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface OrgInfo {
  id: number
  name: string
  image: string
  distance: string
  address: string
  tags: string[]
  isEmergency: boolean
  capacity: number
}

const selectedLocation = ref('上城')
const searchText = ref('')

const orgList = ref<OrgInfo[]>([
  {
    id: 1,
    name: '鹿乐国际托幼中心',
    image: '/static/images/org1.jpg',
    distance: '268m',
    address: '苏州市吴中区独墅湖10号',
    tags: ['全日托', '半日托', '计时托', '临时托'],
    isEmergency: true,
    capacity: 68
  },
  {
    id: 2,
    name: '杭州安宇托育有限公司',
    image: '/static/images/org2.jpg',
    distance: '300m',
    address: '长睦路484号',
    tags: ['全日托', '半日托', '计时托', '临时托'],
    isEmergency: true,
    capacity: 55
  },
  {
    id: 3,
    name: '杭州稚趣星托育服务有限公���',
    image: '/static/images/org3.jpg',
    distance: '500m',
    address: '上城区华鹤街938号、936号-1',
    tags: ['全日托', '半日托', '计时托', '临时托'],
    isEmergency: false,
    capacity: 72
  },
  {
    id: 4,
    name: '蹦哒哒托育（杭州）有限公司',
    image: '/static/images/org4.jpg',
    distance: '1.2km',
    address: '杭州市江干区丁兰街道环丁路1428号',
    tags: ['全日托', '半日托', '计时托', '临时托'],
    isEmergency: true,
    capacity: 60
  }
])

const showCityPicker = ref(false)

const cityList = [
  '杭州市', '上城', '拱墅', '西湖',
  '滨江', '萧山', '余杭', '富阳',
  '临安', '临平', '钱塘', '桐庐',
  '淳安', '建德', '西湖名胜'
]

const selectLocation = () => {
  showCityPicker.value = true
}

const closeCityPicker = () => {
  showCityPicker.value = false
}

const selectCity = (city: string) => {
  selectedLocation.value = city
  showCityPicker.value = false
}

const toggleFilter = (type: string) => {
  uni.showToast({
    title: '筛选功能待实现',
    icon: 'none'
  })
}

const goToYuyue = (org: OrgInfo) => {
  uni.navigateTo({
    url: `/pages/rutuo/yuyue?orgId=${org.id}&orgName=${encodeURIComponent(org.name)}`
  })
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  position: relative;
  background-color: #f8f8f8;

  .search-section {
    background-color: #fff;
    position: relative;
    z-index: 1000;

    .search-bar {
      display: flex;
      align-items: center;
      gap: 20rpx;
      padding: 20rpx;
    }

    .location {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      white-space: nowrap;

      .arrow-down {
        font-size: 24rpx;
        margin-left: 4rpx;
      }
    }

    .search-box {
      flex: 1;
    }
  }

  .mask-container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    bottom: -100vh;
    z-index: 998;

    .city-popup-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .popup-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
    }

    .city-popup {
      position: relative;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
      
      .city-content {
        padding: 20rpx;
        max-height: 60vh;
        overflow-y: auto;

        .city-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20rpx;

          .city-item {
            padding: 16rpx 32rpx;
            background-color: #f5f5f5;
            border-radius: 8rpx;
            font-size: 28rpx;
            color: #333;

            &.active {
              background-color: #e1f5fe;
              color: #2196f3;
            }
          }
        }
      }
    }
  }

  .org-list {
    padding: 20rpx;

    .org-item {
      background: #fff;
      border-radius: 16rpx;
      margin-bottom: 20rpx;
      display: flex;
      padding: 20rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .org-left {
        position: relative;
        margin-right: 20rpx;

        .org-image {
          width: 200rpx;
          height: 200rpx;
          border-radius: 8rpx;
        }

        .emergency-tag {
          position: absolute;
          left: 0;
          top: 16rpx;
          background: rgba(244, 67, 54, 0.9);
          color: #fff;
          font-size: 24rpx;
          padding: 4rpx 12rpx;
          border-top-right-radius: 4rpx;
          border-bottom-right-radius: 4rpx;
        }
      }

      .org-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .org-title {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16rpx;

          .org-name {
            font-size: 32rpx;
            font-weight: 500;
            color: #333;
          }

          .distance {
            font-size: 24rpx;
            color: #999;
          }
        }

        .org-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12rpx;
          margin-bottom: 16rpx;

          .tag {
            font-size: 24rpx;
            color: #2483F3;
            background: #e6f7ff;
            padding: 4rpx 12rpx;
            border-radius: 4rpx;
          }
        }

        .org-address {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16rpx;

          .icon {
            margin-right: 8rpx;
          }

          .address {
            flex: 1;
            font-size: 28rpx;
            color: #666;
          }

          .detail {
            font-size: 28rpx;
            color: #2483F3;
          }
        }

        .capacity {
          display: flex;
          align-items: center;
          font-size: 28rpx;
          color: #666;

          .icon {
            margin-right: 8rpx;
          }
        }
      }
    }
  }
}

// 滑动动画
.slide-down-enter-active {
  animation: slide-in-down 0.3s ease-out forwards;
}
.slide-down-leave-active {
  animation: slide-in-down 0.3s ease-out reverse;
}

@keyframes slide-in-down {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>