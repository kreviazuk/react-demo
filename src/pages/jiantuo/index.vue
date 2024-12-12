<template>
  <view class="page-container">
    <view class="content-wrapper">
      <!-- 顶部区域 -->
      <view class="header">
        <view class="address-section">
          <text class="label">建托地址:</text>
          <view class="select-input" @click="toggleDropdown">
            <text class="placeholder">{{ selectedArea.label || '选择区域' }}</text>
          </view>
          <view v-if="showDropdown" class="dropdown-menu">
            <view v-for="item in areaList[0]" :key="item.value" class="dropdown-item" @click="selectArea(item)">
              {{ item.label }}
            </view>
          </view>
        </view>

        <!-- 婴幼儿数据 -->
        <view class="stats-section">
          <view class="chart-container">
            <v-chart class="chart" :option="option" autoresize />
            <view class="total-stats">
              <text class="total-label">总托位数</text>
              <text class="total-value">59408+</text>
            </view>
          </view>

          <!-- 机构数据 -->
          <view class="institution-stats">
            <view class="stat-item">
              <text class="label">托育机构数</text>
              <text class="number">1589</text>
            </view>
            <view class="stat-item">
              <text class="label">成长驿站数</text>
              <text class="number">767</text>
            </view>
            <view class="stat-item">
              <text class="label">示范性机构数</text>
              <text class="number">65</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 地图区域 -->
      <view id="container" class="map-container"></view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

// Register ECharts components
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

let map = null
let chartInstance = null
const selectedArea = ref({ label: '杭州市', value: '杭州市' })
const showDropdown = ref(false)

const option = ref({
  title: {
    text: '婴幼儿数',
    top: '2%',
    left: 'left',
    textStyle: {
      fontSize: 16,
      color: '#333'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}',
    position: 'right'
  },
  legend: {
    orient: 'vertical',
    right: '5%',
    top: 'middle',
    itemWidth: 10,
    itemHeight: 10,
    icon: 'circle',
    textStyle: {
      color: '#666'
    }
  },
  color: ['#73D3FF', '#9FE6B8', '#FFADD2'],
  series: [
    {
      name: '年龄分布',
      type: 'pie',
      radius: ['25%', '40%'],
      center: ['35%', '45%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'outside',
        formatter: '{c}+',
        color: '#666'
      },
      labelLine: {
        show: true,
        length: 10,
        length2: 10,
        lineStyle: {
          color: '#ccc'
        }
      },
      data: [
        { value: 68809, name: '0-12月' },
        { value: 80337, name: '13-24月' },
        { value: 89415, name: '25-36月' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

// 杭州市区县数据
const areaList = [
  [
    { label: '杭州市', value: '杭州市' },
    { label: '上城区', value: '上城区' },
    { label: '下城区', value: '下城区' },
    { label: '江干区', value: '江干区' },
    { label: '拱墅区', value: '拱墅区' },
    { label: '西湖区', value: '西湖区' },
    { label: '滨江区', value: '滨江区' },
    { label: '萧山区', value: '萧山区' },
    { label: '余杭区', value: '余杭区' },
    { label: '富阳区', value: '富阳区' },
    { label: '临安区', value: '临安区' },
    { label: '钱塘区', value: '钱塘区' },
    { label: '临平区', value: '临平区' }
  ]
]

// 托育机构数据
const institutionsData = {
  '上城区': [
    { name: '上城区托育中心', position: [120.169847, 30.242849], address: '杭州市上城区中河中路222号' },
    { name: '上城区示范托育所', position: [120.176356, 30.246572], address: '杭州市上城区清波街道' },
    { name: '上城区第三托育所', position: [120.172356, 30.244572], address: '杭州市上城区清泰街128号' }
  ],
  '拱墅区': [
    { name: '拱墅区托育中心', position: [120.142184, 30.319416], address: '杭州市拱墅区莫干山路' },
    { name: '拱墅区示范托育所', position: [120.150681, 30.321563], address: '杭州市拱墅区大关街道' },
    { name: '拱墅区第三托育所', position: [120.146681, 30.320563], address: '杭州市拱墅区康桥路88号' }
  ],
  '西湖区': [
    { name: '西湖区托育中心', position: [120.130484, 30.259416], address: '杭州市西湖区文三路' },
    { name: '西湖区示范托育所', position: [120.135681, 30.261563], address: '杭州市西湖区古荡街道' }
  ]
}

let markers = [] // 存储当前地图上的标记

const areaCoordinates = {
  '杭州市': [120.153576, 30.287459],
  '上城区': [120.169329, 30.242312],
  '下城区': [120.180895, 30.310229],
  '江干区': [120.205001, 30.257012],
  '拱墅区': [120.142172, 30.319037],
  '西湖区': [120.130203, 30.259324],
  '滨江区': [120.211555, 30.208332],
  '萧山区': [120.264253, 30.183806],
  '余杭区': [120.299375, 30.419025],
  '富阳区': [119.960076, 30.048692],
  '临安区': [119.724733, 30.233873],
  '钱塘区': [120.498476, 30.318697],
  '临平区': [120.301596, 30.419152]
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectArea = (item) => {
  selectedArea.value = item
  showDropdown.value = false

  if (!map) {
    console.error('Map not initialized')
    return
  }

  // 清除现有的标记
  markers.forEach(marker => {
    marker.setMap(null)
  })
  markers = []

  // 获取选中区域的托育机构数据
  const institutions = institutionsData[item.value] || []
  console.log('Institutions for area:', institutions)

  // 添加新的标记
  institutions.forEach(inst => {
    try {
      const marker = new AMap.Marker({
        position: new AMap.LngLat(inst.position[0], inst.position[1]),
        title: inst.name,
        map: map,
        icon: new AMap.Icon({
          size: new AMap.Size(25, 34),
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          imageSize: new AMap.Size(25, 34)
        })
      })

      const infoWindow = new AMap.InfoWindow({
        content: `
          <div class="info-window">
            <h4>${inst.name}</h4>
            <p>${inst.address}</p>
          </div>
        `,
        offset: new AMap.Pixel(0, -30)
      })

      marker.on('click', () => {
        infoWindow.open(map, marker.getPosition())
      })

      markers.push(marker)
      console.log('Added marker for:', inst.name)
    } catch (e) {
      console.error('Error adding marker:', e)
    }
  })

  // 如果有机构数据，将地图中心设置到第一个机构的位置
  if (institutions.length > 0) {
    const center = institutions[0].position
    console.log('Setting map center to:', center)
    map.setCenter(center)
    map.setZoom(13)
  } else {
    // 如果没有机构数据，使用区域坐标
    const coordinates = areaCoordinates[item.value]
    if (coordinates && map) {
      map.setCenter(coordinates)
      map.setZoom(12)
    }
  }
  
  // 更新图表数据
  updateChartData(item.value)
}

const updateChartData = (area) => {
  // Update the chart data based on the selected area
  // This is a placeholder function, you need to implement the actual logic
  console.log('Update chart data for area:', area)
}

// 点击其他地方关闭下拉菜单
const closeDropdown = (e) => {
  const dropdown = document.querySelector('.dropdown-menu')
  const select = document.querySelector('.select-input')
  if (dropdown && !dropdown.contains(e.target) && !select.contains(e.target)) {
    showDropdown.value = false
  }
}

onMounted(async () => {
  try {
    // 初始化高德地图
    const AMap = await AMapLoader.load({
      key: import.meta.env.VITE_AMAP_KEY,
      version: '2.0',
      plugins: ['AMap.ToolBar', 'AMap.Scale']
    })

    map = new AMap.Map('container', {
      zoom: 11,
      center: [120.153576, 30.287459],
      viewMode: '3D'
    })

    map.addControl(new AMap.ToolBar())
    map.addControl(new AMap.Scale())

  } catch (e) {
    console.error('地图加载失败：', e)
  }

  // Initialize ECharts after a short delay to ensure DOM is ready
  setTimeout(() => {
    const chartDom = document.getElementById('myChart')
    if (chartDom) {
      chartInstance = echarts.init(chartDom)
      chartInstance.setOption(option.value)
    }
  }, 300)

  // 添加点击事件监听器
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  // Clean up chart instance
  if (chartInstance) {
    chartInstance.dispose()
  }
  // Clean up resize listener
  window.removeEventListener('resize', () => {
    chartInstance?.resize()
  })
  if (map) {
    map.destroy()
  }
  // 移除点击事件监听器
  document.removeEventListener('click', closeDropdown)
})
</script>

<style lang="scss" scoped>
@import '@/styles/layout.scss';

.page-container {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
  box-sizing: border-box;
}

.content-wrapper {
  background: #fff;
  padding: 20rpx;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.header {
  padding: 20rpx;
  background: #fff;
  border-bottom: 1rpx solid #eee;
}

.address-section {
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  position: relative;
}

.label {
  font-size: 28rpx;
  margin-right: 10rpx;
  white-space: nowrap;
}

.select-input {
  width: 200rpx;
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 15rpx;
  background-color: #fff;
  border: 1rpx solid #dcdfe6;
  border-radius: 10rpx;
  cursor: pointer;
  position: relative;
}

.select-input:hover {
  border-color: #c0c4cc;
}

.placeholder {
  color: #606266;
  font-size: 26rpx;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 95rpx;
  width: 200rpx;
  max-height: 300rpx;
  overflow-y: auto;
  background: #fff;
  border: 1rpx solid #e4e7ed;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 12rpx 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-item {
  padding: 0 15rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 26rpx;
  color: #606266;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f7fa;
}

.stats-section {
  padding: 20rpx 0;
}

.chart-container {
  width: 100%;
  height: 400rpx;
  padding: 20rpx;
  box-sizing: border-box;
  background: #fff;
  position: relative;
}

.chart {
  width: 100%;
  height: 300rpx;
}

.total-stats {
  position: absolute;
  bottom: 10rpx;
  left: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.total-label {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 4rpx;
}

.total-value {
  font-size: 36rpx;
  color: #333;
  font-weight: bold;
}

.institution-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 30rpx;
  padding: 20rpx;
  background: #f8f8f8;
  border-radius: 10rpx;
}

.stat-item {
  text-align: center;
}

.stat-item .label {
  display: block;
  font-size: 24rpx;
  color: #666;
  margin: 5rpx 0;
}

.stat-item .number {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.map-container {
  width: 100%;
  height: 600rpx;
  margin-top: 20rpx;
}
</style>