<template>
  <view class="container">
    <view class="content-wrapper">
      <view class="form">
        <view class="form-item">
          <text class="required">*</text>
          <text class="label">儿童姓名</text>
          <input type="text" placeholder="请输入儿童姓名" v-model="formData.childName" class="input" />
        </view>

        <view class="form-item">
          <text class="required">*</text>
          <text class="label">性别</text>
          <view class="radio-group">
            <view 
              :class="['radio-item', formData.gender === '男' ? 'active' : '']" 
              @click="formData.gender = '男'"
            >
              <text>男</text>
            </view>
            <view 
              :class="['radio-item', formData.gender === '女' ? 'active' : '']" 
              @click="formData.gender = '女'"
            >
              <text>女</text>
            </view>
          </view>
        </view>

        <view class="form-item">
          <text class="required">*</text>
          <text class="label">证件类型</text>
          <picker 
            :range="idTypes" 
            @change="handleIdTypeChange" 
            class="picker"
          >
            <view class="picker-value">
              {{ formData.idType || '请选择' }}
              <uni-icons type="bottom" size="14" color="#666"></uni-icons>
            </view>
          </picker>
        </view>

        <view class="form-item">
          <text class="required">*</text>
          <text class="label">证件号码</text>
          <input type="text" placeholder="请输入证件号码" v-model="formData.idNumber" class="input" />
        </view>

        <view class="form-item">
          <text class="required">*</text>
          <text class="label">儿童出生日期</text>
          <picker 
            mode="date" 
            :value="formData.birthDate" 
            @change="handleBirthDateChange"
            class="picker"
          >
            <view class="picker-value">
              {{ formData.birthDate || '请选择' }}
              <uni-icons type="bottom" size="14" color="#666"></uni-icons>
            </view>
          </picker>
        </view>

        <view class="form-item">
          <text class="required">*</text>
          <text class="label">所在机构</text>
          <picker 
            :range="organizations" 
            @change="handleOrgChange"
            class="picker"
          >
            <view class="picker-value">
              {{ formData.organization || '请选择' }}
              <uni-icons type="bottom" size="14" color="#666"></uni-icons>
            </view>
          </picker>
        </view>

        <view class="form-item">
          <text class="required">*</text>
          <text class="label">家长电话</text>
          <input type="number" placeholder="请输入联系电话" v-model="formData.parentPhone" class="input" />
        </view>

        <button class="submit-btn" @click="handleSubmit">确定</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formData = reactive({
  childName: '',
  gender: '',
  idType: '',
  idNumber: '',
  birthDate: '',
  organization: '',
  parentPhone: ''
})

const idTypes = ['身份证', '护照', '港澳通行证', '台胞证']
const organizations = ['杭州贝亲托育有限公司', '杭州安宇托育有限公司', '杭州稚趣星托育服务有限公司']

const handleIdTypeChange = (e: any) => {
  formData.idType = idTypes[e.detail.value]
}

const handleBirthDateChange = (e: any) => {
  formData.birthDate = e.detail.value
}

const handleOrgChange = (e: any) => {
  formData.organization = organizations[e.detail.value]
}

const handleSubmit = () => {
  // 验证必填字段
  if (!formData.childName) {
    uni.showToast({ title: '请输入儿童姓名', icon: 'none' })
    return
  }
  if (!formData.gender) {
    uni.showToast({ title: '请选择性别', icon: 'none' })
    return
  }
  if (!formData.idType) {
    uni.showToast({ title: '请选择证件类型', icon: 'none' })
    return
  }
  if (!formData.idNumber) {
    uni.showToast({ title: '请输入证件号码', icon: 'none' })
    return
  }
  if (!formData.birthDate) {
    uni.showToast({ title: '请选择出生日期', icon: 'none' })
    return
  }
  if (!formData.organization) {
    uni.showToast({ title: '请选择所在机构', icon: 'none' })
    return
  }
  if (!formData.parentPhone) {
    uni.showToast({ title: '请输入家长电话', icon: 'none' })
    return
  }

  // TODO: 提交表单数据
  console.log('提交的表单数据：', formData)
  uni.showToast({ title: '提交成功', icon: 'success' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content-wrapper {
  max-width: 960rpx;
  margin: 0 auto;
  padding: 32rpx;
}

.form {
  background: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  box-sizing: border-box;
  max-width: 680rpx;
  margin: 0 auto;
}

.form-item {
  margin-bottom: 40rpx;
  position: relative;
  box-sizing: border-box;

  .required {
    color: #ff4d4f;
    margin-right: 8rpx;
    font-size: 28rpx;
  }

  .label {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 16rpx;
    display: inline-block;
  }

  .input {
    width: 100%;
    height: 80rpx;
    border: 1rpx solid #ddd;
    border-radius: 8rpx;
    padding: 0 24rpx;
    font-size: 28rpx;
    color: #333;
    background: #fff;
    margin-top: 16rpx;
    box-sizing: border-box;

    &::placeholder {
      color: #999;
    }
  }

  .radio-group {
    display: flex;
    gap: 32rpx;
    margin-top: 16rpx;
    box-sizing: border-box;

    .radio-item {
      flex: 1;
      height: 80rpx;
      border: 1rpx solid #ddd;
      border-radius: 8rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      color: #666;
      background: #fff;
      box-sizing: border-box;

      &.active {
        background: #e6f7ff;
        border-color: #1890ff;
        color: #1890ff;
      }
    }
  }

  .picker {
    margin-top: 16rpx;
    width: 100%;
    box-sizing: border-box;
    
    .picker-value {
      height: 80rpx;
      border: 1rpx solid #ddd;
      border-radius: 8rpx;
      padding: 0 24rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      color: #333;
      background: #fff;
      box-sizing: border-box;

      &:empty::before {
        content: '请选择';
        color: #999;
      }
    }
  }
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  background: #666;
  border-radius: 44rpx;
  color: #fff;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64rpx;
  border: none;
  box-sizing: border-box;

  &:active {
    opacity: 0.9;
  }
}
</style>
