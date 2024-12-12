<template>
    <view class="container">
      <view class="section">
        <wd-form :model="formData" :rules="rules">
          <wd-form-item label="儿童姓名" prop="childName" required>
            <wd-input
              v-model="formData.childName"
              placeholder="请输入儿童姓名"
            />
          </wd-form-item>
  
          <wd-form-item label="性别" prop="gender" required>
            <wd-radio-group v-model="formData.gender" direction="row">
              <wd-radio value="男">男</wd-radio>
              <wd-radio value="女">女</wd-radio>
            </wd-radio-group>
          </wd-form-item>
  
          <wd-form-item label="证件类型" prop="idType" required>
            <wd-picker
              v-model="formData.idType"
              :columns="idTypes"
              @confirm="handleIdTypeChange"
            >
              <view class="picker-text">{{ formData.idType || '请选择' }}</view>
            </wd-picker>
          </wd-form-item>
  
          <wd-form-item label="证件号码" prop="idNumber" required>
            <wd-input
              v-model="formData.idNumber"
              placeholder="请输入证件号码"
            />
          </wd-form-item>
  
          <wd-form-item label="儿童出生日期" prop="birthDate" required>
            <wd-datetime-picker
              v-model="formData.birthDate"
              type="date"
              @confirm="handleBirthDateChange"
            >
              <view class="picker-text">{{ formData.birthDate || '请选择' }}</view>
            </wd-datetime-picker>
          </wd-form-item>
  
          <wd-form-item label="儿童月龄" prop="childAge">
            <text class="age-text">{{ childAge }}</text>
          </wd-form-item>
  
          <wd-form-item label="联系电话" prop="phone" required>
            <wd-input
              v-model="formData.phone"
              type="number"
              placeholder="请输入联系电话"
            />
          </wd-form-item>
  
          <wd-form-item label="联系地址" prop="address" required>
            <wd-input
              v-model="formData.address"
              placeholder="请输入联系地址"
            />
          </wd-form-item>
        </wd-form>
      </view>
  
      <wd-button type="primary" block class="submit-btn" @click="handleSubmit">提交</wd-button>
    </view>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  
  interface FormData {
    childName: string
    gender: '男' | '女' | ''
    idType: string
    idNumber: string
    birthDate: string
    phone: string
    address: string
  }
  
  const formData = ref<FormData>({
    childName: '',
    gender: '',
    idType: '',
    idNumber: '',
    birthDate: '',
    phone: '',
    address: ''
  })
  
  const idTypes: string[] = ['身份证', '护照', '港澳通行证', '台胞证']
  
  const rules = {
    childName: { required: true, message: '请填写儿童姓名' },
    gender: { required: true, message: '请选择性别' },
    idType: { required: true, message: '请选择证件类型' },
    idNumber: { required: true, message: '请填写证件号码' },
    birthDate: { required: true, message: '请选择出生日期' },
    phone: { required: true, message: '请填写联系电话' },
    address: { required: true, message: '请填写联系地址' }
  }
  
  const childAge = computed(() => {
    if (!formData.value.birthDate) return ''
    const birth = new Date(formData.value.birthDate)
    const now = new Date()
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth()
    return `${months}个月`
  })
  
  const handleIdTypeChange = (value: string): void => {
    formData.value.idType = value
  }
  
  const handleBirthDateChange = (value: string): void => {
    formData.value.birthDate = value
  }
  
  const handleSubmit = (): void => {
    console.log('提交表单', formData.value)
    uni.showToast({
      title: '提交成功',
      icon: 'success'
    })
  }
  </script>
  
  <style lang="scss" scoped>
  .container {
    padding: 30rpx;
  
    .section {
      background: #fff;
      border-radius: 16rpx;
      padding: 20rpx;
      margin-bottom: 120rpx;
    }
  
    :deep(.wd-form) {
      .wd-form-item {
        margin-bottom: 20rpx;
        padding: 0 20rpx;
      }
  
      .wd-radio-group {
        display: flex;
        flex-direction: row;
        gap: 40rpx;
        padding: 20rpx 0;
      }
  
      .picker-text {
        height: 88rpx;
        line-height: 88rpx;
        color: #333;
  
        &:empty::before {
          content: attr(placeholder);
          color: #999;
        }
      }
    }
  
    .age-text {
      height: 88rpx;
      line-height: 88rpx;
      color: #333;
    }
  
    .submit-btn {
      margin-top: 80rpx;
      position: fixed;
      bottom: 40rpx;
      left: 20rpx;
      right: 20rpx;
      width: auto;
      z-index: 100;
    }
  }
  </style>
  