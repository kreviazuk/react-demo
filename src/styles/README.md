# 样式变量速查表

## 颜色
- `$primary-color: #2979ff` - 主色（蓝色）
- `$warning-color: #ff6b6b` - 警告色（红色）
- `$success-color: #52c41a` - 成功色（绿色）
- `$error-color: #ff4d4f` - 错误色（红色）

### 文字颜色
- `$text-color: #333` - 主要文字
- `$text-color-secondary: #666` - 次要文字
- `$text-color-light: #999` - 浅色文字

## 字体大小
- `$font-size-small: 24rpx` - 小号字体
- `$font-size-base: 28rpx` - 基础字体
- `$font-size-large: 32rpx` - 大号字体
- `$font-size-xlarge: 36rpx` - 特大号字体

## 间距
- `$spacing-mini: 4rpx` - 最小间距
- `$spacing-small: 8rpx` - 小间距
- `$spacing-base: 12rpx` - 基础间距
- `$spacing-large: 16rpx` - 大间距
- `$spacing-xlarge: 20rpx` - 特大间距
- `$spacing-xxlarge: 24rpx` - 超大间距
- `$spacing-huge: 30rpx` - 巨大间距

## 圆角
- `$border-radius-small: 4rpx` - 小圆角
- `$border-radius-base: 8rpx` - 基础圆角
- `$border-radius-large: 12rpx` - 大圆角
- `$border-radius-circle: 50%` - 圆形

## 常用组合

### 标准文本
```scss
font-size: $font-size-base;
color: $text-color;
```

### 次要文本
```scss
font-size: $font-size-base;
color: $text-color-light;
```

### 标题文本
```scss
font-size: $font-size-large;
color: $text-color;
font-weight: 500;
```

### 卡片间距
```scss
padding: $spacing-huge;
margin-bottom: $spacing-xlarge;
border-radius: $border-radius-large;
```

### 列表项间距
```scss
padding: $spacing-xlarge $spacing-huge;
gap: $spacing-base;
``` 