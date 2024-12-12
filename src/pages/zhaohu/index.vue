<template>
  <view class="page-container">
    <!-- 搜索栏 -->
    <view class="search-section">
      <view class="search-bar">
        <view class="search-input">
          <uni-icons type="search" size="16" color="#999"></uni-icons>
          <input type="text" placeholder="请输入搜索关键词" v-model="searchText" class="input" />
        </view>
        <view class="filter-btn" @click="handleFilter">
          <uni-icons type="bars" size="20" color="#333"></uni-icons>
          <text>筛选</text>
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content-wrapper">
      <!-- 机构列表 -->
      <view class="org-list">
        <view v-for="(org, index) in orgList" :key="index" class="org-item">
          <!-- 机构名称 -->
          <view class="org-header" @click="goToOrgDetail(org)">
            <view class="org-title">
              <view class="blue-line"></view>
              <text class="org-name">{{ org.name }}</text>
            </view>
            <uni-icons type="right" size="16" color="#666"></uni-icons>
          </view>
          <!-- 人员列表 -->
          <scroll-view class="staff-list" scroll-x="true" show-scrollbar="false">
            <view v-for="(staff, staffIndex) in org.staffs" :key="staffIndex" class="staff-item" @click="goToStaffDetail(staff)">
              <image :src="staff.avatar" class="staff-avatar" mode="aspectFill"></image>
              <view class="staff-info">
                <text class="staff-name">{{ staff.name }}</text>
                <text class="staff-role">{{ staff.role }}</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Staff {
  name: string
  role: string
  avatar: string
}

interface Organization {
  name: string
  staffs: Staff[]
}

const searchText = ref('')

const orgList = ref<Organization[]>([
  {
    name: '杭州贝亲托育有限公司',
    staffs: [
      { name: '程久洪', role: '厨师', avatar: '/static/images/avatar.png' },
      { name: '张燕', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '韩金莲', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '乔丽萍', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '王小丽', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '李明明', role: '保健员', avatar: '/static/images/avatar.png' },
      { name: '张大伟', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '刘晓芳', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '陈美玲', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '赵小红', role: '保育员', avatar: '/static/images/avatar.png' }
    ]
  },
  {
    name: '杭州安宇托育有限公司',
    staffs: [
      { name: '郑小玲', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '付婷艳', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '吴彬霞', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '宋艳艳', role: '保育员', avatar: '/static/images/avatar.png' }
    ]
  },
  {
    name: '杭州稚趣星托育服务有限公司',
    staffs: [
      { name: '许雪榕', role: '保健员', avatar: '/static/images/avatar.png' },
      { name: '方红婷', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '洪朵朵', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '延海燕', role: '园长', avatar: '/static/images/avatar.png' }
    ]
  },
  {
    name: '蹦哒哒托育（杭州）有限公司',
    staffs: [
      { name: '张荷仙', role: '保健员', avatar: '/static/images/avatar.png' },
      { name: '寿文君', role: '园长', avatar: '/static/images/avatar.png' },
      { name: '邓桃桃', role: '保育员', avatar: '/static/images/avatar.png' },
      { name: '董殿英', role: '其他', avatar: '/static/images/avatar.png' }
    ]
  }
])

// 跳转到机构详情
const goToOrgDetail = (org: Organization) => {
  uni.navigateTo({
    url: `/pages/zhaohu/org-detail?id=${org.id}`
  })
}

// 跳转到人员详情
const goToStaffDetail = (staff: Staff) => {
  uni.navigateTo({
    url: `/pages/zhaohu/staff-detail?id=${staff.id}`
  })
}
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.search-section {
  background: #fff;
  width: 100%;
  padding: 12rpx 0;
  margin-bottom: 20rpx;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 0 20rpx;
  max-width: 750rpx;
  margin: 0 auto;

  .search-input {
    flex: 1;
    display: flex;
    align-items: center;
    background: #f5f5f5;
    padding: 6rpx 16rpx;
    border-radius: 30rpx;
    height: 60rpx;

    input {
      flex: 1;
      margin-left: 10rpx;
      font-size: 26rpx;
      height: 48rpx;
      line-height: 48rpx;
    }
  }

  .filter-btn {
    display: flex;
    align-items: center;
    gap: 4rpx;
    padding: 0 10rpx;
    
    text {
      font-size: 26rpx;
      color: #333;
    }
  }
}

.content-wrapper {
  width: 100%;
  max-width: 750rpx;
  margin: 0 auto;
  padding: 0 20rpx;
  box-sizing: border-box;
}

.org-list {
  .org-item {
    background: #fff;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
    overflow: hidden;

    .org-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      border-bottom: 1px solid #f5f5f5;
      cursor: pointer;

      .org-title {
        display: flex;
        align-items: center;
        gap: 12rpx;

        .blue-line {
          width: 6rpx;
          height: 32rpx;
          background: #007AFF;
          border-radius: 3rpx;
        }

        .org-name {
          font-size: 28rpx;
          color: #333;
          font-weight: bold;
        }
      }

      uni-icons {
        color: #999;
      }
    }

    .staff-list {
      white-space: nowrap;
      padding: 20rpx;
      padding-bottom: 10rpx;

      .staff-item {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        margin-right: 30rpx;
        width: 140rpx;
        cursor: pointer;

        &:last-child {
          margin-right: 0;
        }

        .staff-avatar {
          width: 120rpx;
          height: 120rpx;
          border-radius: 8rpx;
          margin-bottom: 12rpx;
        }

        .staff-info {
          text-align: center;
          width: 100%;
          margin-bottom: 10rpx;
          display: flex;
          flex-direction: column;
          gap: 4rpx;

          .staff-name {
            font-size: 26rpx;
            color: #333;
            line-height: 1.4;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 6rpx;
            display: block;
          }

          .staff-role {
            font-size: 24rpx;
            color: #999;
            line-height: 1.4;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 6rpx;
            display: block;
          }
        }

        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}
</style> 