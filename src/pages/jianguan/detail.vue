<template>
  <view class="container">
    <!-- 基本信息 -->
    <view class="info-section">
      <view class="info-item">
        <text class="label">处罚日期</text>
        <text class="value">{{ detail.punishTime }}</text>
      </view>
      <view class="info-item">
        <text class="label">处罚来源</text>
        <text class="value">{{ detail.source }}</text>
      </view>
      <view class="info-item">
        <text class="label">处罚名称</text>
        <text class="value">{{ detail.title }}</text>
      </view>
      <view class="info-item">
        <text class="label">违法事实</text>
        <text class="value">{{ detail.fact || '无' }}</text>
      </view>
      <view class="info-item">
        <text class="label">处罚类别</text>
        <text class="value warning">{{ detail.type }}</text>
      </view>
      <view class="info-item">
        <text class="label">处罚依据</text>
        <text class="value">{{ detail.basis }}</text>
      </view>
      <view class="info-item">
        <text class="label">处罚结果</text>
        <text class="value">{{ detail.result }}</text>
      </view>
      <view class="info-item">
        <text class="label">实施机构</text>
        <text class="value">{{ detail.institution }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface PunishDetail {
  punishTime: string
  source: string
  title: string
  fact: string
  type: string
  basis: string
  result: string
  institution: string
}

const detail = ref<PunishDetail>({
  punishTime: '2022-09-07 00:00:00',
  source: '杭州市卫健执法队处罚',
  title: '杭州格睿德托育有限公司未按规定进行托育机构备案案',
  fact: '无',
  type: '警告',
  basis: '《中华人民共和国人口与计划生育法》第二十八条第三款',
  result: '完全履行',
  institution: '杭州市拱墅区卫生监督所'
})

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const id = currentPage.$page?.options?.id
  // TODO: 根据id获取详情
  console.log('Detail ID:', id)
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
  box-sizing: border-box;
}

.info-section {
  background: #fff;
  border-radius: 8rpx;
  padding: 0 30rpx;

  .info-item {
    display: flex;
    padding: 30rpx 0;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .label {
      width: 160rpx;
      font-size: 28rpx;
      color: #666;
      flex-shrink: 0;
    }

    .value {
      flex: 1;
      font-size: 28rpx;
      color: #333;

      &.warning {
        color: #ff6b6b;
      }
    }
  }
}
</style> 