<template>
  <view class="container">
    <view class="section">
      <wd-form :model="formData" :rules="rules">
        <wd-form-item label="监护人姓名" prop="parentName" required>
          <wd-input
            v-model="formData.parentName"
            placeholder="请输入监护人姓名"
          />
        </wd-form-item>

        <wd-form-item label="儿童姓名" prop="childName" required>
          <wd-input
            v-model="formData.childName"
            placeholder="请输入儿童姓名"
          />
        </wd-form-item>

        <wd-form-item label="性别" prop="gender" required>
          <wd-radio-group v-model="formData.gender" direction="horizontal">
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

        <wd-form-item label="幼儿园名称" prop="kindergarten" required>
          <wd-input
            v-model="formData.kindergarten"
            placeholder="请输入幼儿园名称"
          />
        </wd-form-item>

        <wd-form-item label="预约到访时间" prop="visitDate" required>
          <wd-datetime-picker
            v-model="formData.visitDate"
            type="date"
            @confirm="handleVisitDateChange"
          >
            <view class="picker-text">{{ formData.visitDate || '请选择' }}</view>
          </wd-datetime-picker>
        </wd-form-item>
      </wd-form>
    </view>

    <wd-button type="primary" block class="submit-btn" @click="handleSubmit">提交</wd-button>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface RutuoFormData {
  parentName: string
  childName: string
  gender: '男' | '女' | ''
  idType: string
  idNumber: string
  birthDate: string
  phone: string
  address: string
  kindergarten: string
  visitDate: string
}

const formData = ref<RutuoFormData>({
  parentName: '',
  childName: '',
  gender: '',
  idType: '',
  idNumber: '',
  birthDate: '',
  phone: '',
  address: '',
  kindergarten: '',
  visitDate: ''
})

const idTypes = ['身份证', '护照', '港澳通行证', '台胞证']

const handleIdTypeChange = (value: string) => {
  formData.value.idType = value
}

const handleBirthDateChange = (e: { detail: { value: string } }): void => {
  formData.value.birthDate = e.detail.value
}

const handleVisitDateChange = (value: string) => {
  formData.value.visitDate = value
}

const childAge = computed(() => {
  if (!formData.value.birthDate) return ''
  const birth = new Date(formData.value.birthDate)
  const now = new Date()
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + 
                (now.getMonth() - birth.getMonth())
  return `${months}个月`
})

const rules = {
  parentName: { required: true, message: '请填写监护人姓名' },
  childName: { required: true, message: '请填写儿童姓名' },
  gender: { required: true, message: '请填写性别' },
  idType: { required: true, message: '请填写证件类型' },
  idNumber: { required: true, message: '请填写证件号码' },
  birthDate: { required: true, message: '请填写出生日期' },
  phone: { required: true, message: '请填写联系电话' },
  address: { required: true, message: '请填写联系地址' },
  kindergarten: { required: true, message: '请填写幼儿园名称' },
  visitDate: { required: true, message: '请填写预约到访时间' }
}

const handleSubmit = (): void => {
  // 表单验证
  const requiredFields = [
    { field: 'parentName', name: '监护人姓名' },
    { field: 'childName', name: '儿童姓名' },
    { field: 'gender', name: '性别' },
    { field: 'idType', name: '证件类型' },
    { field: 'idNumber', name: '证件号码' },
    { field: 'birthDate', name: '出生日期' },
    { field: 'phone', name: '联系电话' },
    { field: 'address', name: '联系地址' },
    { field: 'kindergarten', name: '幼儿园名称' },
    { field: 'visitDate', name: '预约到访时间' }
  ]

  for (const item of requiredFields) {
    if (!formData.value[item.field]) {
      uni.showToast({
        title: `请填写${item.name}`,
        icon: 'none'
      })
      return
    }
  }

  // TODO: 提交表单数据到服务器
  uni.showLoading({ title: '提交中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '提交成功',
      icon: 'success'
    })
    // 延迟返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1000)
}
</script>

<style lang="scss">
.container {
  padding: 30rpx;

  .section {
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    margin-bottom: 120rpx;

    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      padding: 20rpx;
      border-bottom: 2rpx solid #f5f5f5;
      margin-bottom: 20rpx;
    }
  }

  :deep(.wd-form) {
    background-color: #fff;
    margin-top: 20rpx;

    .wd-form-item {
      padding: 8rpx 30rpx;
      min-height: 70rpx;
    }

    .wd-input {
      height: 70rpx;
      line-height: 70rpx;
    }

    .wd-radio-group {
      display: flex;
      align-items: center;
      height: 70rpx;
    }

    .wd-radio {
      margin-right: 40rpx;
      height: 70rpx;
      line-height: 70rpx;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .picker-text {
    height: 70rpx;
    line-height: 70rpx;
    font-size: 28rpx;
    color: #333;
  }

  .age-text {
    height: 70rpx;
    line-height: 70rpx;
    font-size: 28rpx;
    color: #666;
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
