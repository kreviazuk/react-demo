<template>
  <view class="container">
    <!-- 申请办托流程 -->
    <view class="section">
      <view class="section-title">申请办托流程</view>
      <view class="flow-steps">
        <view class="step-item" v-for="(step, index) in flowSteps" :key="index">
          <view class="step-content">
            <image class="step-icon" :src="step.icon" mode="aspectFit"></image>
            <text class="step-text">{{ step.text }}</text>
          </view>
          <view class="step-arrow" v-if="index !== flowSteps.length - 1">
            <text class="arrow">↓</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 机构所属区域 -->
    <view class="section">
      <view class="section-title">机构所属区域</view>
      <view class="area-selector" @tap="selectArea">
        <text class="area-placeholder">{{ selectedArea || '请选择所在地区' }}</text>
        <text class="arrow-right">></text>
      </view>
    </view>

    <!-- 办托所需材料 -->
    <view class="section">
      <view class="section-title">办托所需材料</view>
      
      <!-- 按机构性质选择 -->
      <view class="material-group">
        <view class="group-title">按机构性质选择（三选一）</view>
        <view class="material-item" v-for="(item, index) in natureDocuments" :key="index">
          <text>{{ item.name }}</text>
          <text class="org-name">{{ item.org }}</text>
        </view>
      </view>

      <!-- 按机构使用场地产权选择 -->
      <view class="material-group">
        <view class="group-title">按机构使用场地产权选择（二选一）</view>
        <view class="material-item" v-for="(item, index) in propertyDocuments" :key="index">
          <text>{{ item }}</text>
        </view>
      </view>

      <!-- 按机构供餐情况选择 -->
      <view class="material-group">
        <view class="group-title">按机构供餐情况选择（三选一）</view>
        <view class="material-item" v-for="(item, index) in cateringDocuments" :key="index">
          <text>{{ item.name }}</text>
          <text class="org-name" v-if="item.org">{{ item.org }}</text>
        </view>
      </view>

      <!-- 必须材料 -->
      <view class="material-group">
        <view class="group-title">必须材料</view>
        <view class="material-item" v-for="(item, index) in requiredDocuments" :key="index">
          <text>{{ item.name }}</text>
          <text class="org-name" v-if="item.org">{{ item.org }}</text>
        </view>
      </view>
    </view>

    <!-- 申请按钮 -->
    <view class="submit-btn" @tap="submitApplication">申请办托</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedArea = ref('')

const flowSteps = [
  { text: '电话咨询', icon: '/static/icons/phone.png' },
  { text: '相关部门会商', icon: '/static/icons/meeting.png' },
  { text: '办托材料准备', icon: '/static/icons/document.png' },
  { text: '办托申请填写', icon: '/static/icons/write.png' },
  { text: '属地卫健局核准', icon: '/static/icons/approve.png' }
]

const natureDocuments = [
  { name: '民办非企业单位登记证书', org: '（民政局）' },
  { name: '营业执照', org: '（市场监督管理局）' },
  { name: '事业单位法人证书', org: '（事业单位登记管理局）' }
]

const propertyDocuments = ['房产证', '租赁合同']

const cateringDocuments = [
  { name: '食品经营许可证', org: '（市场监督管理局）' },
  { name: '供餐合同和第三方食品经营许可证', org: '（供餐单位）' },
  { name: '不供餐不需提供材料' }
]

const requiredDocuments = [
  { name: '室内环保检测报告' },
  { name: '卫生评价申请书' },
  { name: '负责学历及工作证明' },
  { name: '消防安全检查合格证明', org: '（住房和城乡建设局）' },
  { name: '备案承诺书' },
  { name: '备案申请书' }
]

const selectArea = () => {
  // 实现地区选择逻辑
  uni.showToast({
    title: '选择地区功能待实现',
    icon: 'none'
  })
}

const submitApplication = () => {
  if (!selectedArea.value) {
    uni.showToast({
      title: '请选择机构所属区域',
      icon: 'none'
    })
    return
  }
  // 实现提交申请逻辑
  uni.showToast({
    title: '提交申请功能待实现',
    icon: 'none'
  })
}
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 120rpx;
}

.section {
  background-color: #fff;
  margin: 20rpx;
  border-radius: 12rpx;
  padding: 30rpx;
}

.section-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 30rpx;
  position: relative;
  padding-left: 20rpx;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6rpx;
  height: 30rpx;
  background-color: #1890ff;
}

/* 流程步骤样式 */
.flow-steps {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-content {
  display: flex;
  align-items: center;
  background-color: #e6f7ff;
  padding: 12rpx 40rpx;
  border-radius: 8rpx;
}

.step-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
}

.step-text {
  font-size: 28rpx;
  color: #666;
}

.step-arrow {
  margin: 8rpx 0;
  color: #1890ff;
}

/* 区域选择样式 */
.area-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.area-placeholder {
  color: #999;
  font-size: 28rpx;
}

.arrow-right {
  color: #999;
}

/* 材料列表样式 */
.material-group {
  margin-bottom: 30rpx;
}

.group-title {
  font-size: 28rpx;
  color: #2483F3;
  margin-bottom: 20rpx;

}

.material-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  margin-bottom: 15rpx;
  font-size: 28rpx;
}

.org-name {
  color: #999;
  margin-left: 10rpx;
}

/* 提交按钮样式 */
.submit-btn {
  position: fixed;
  bottom: 40rpx;
  left: 20rpx;
  right: 20rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  background-color: #1890ff;
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
}
</style>
