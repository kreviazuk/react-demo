import { defineManifestConfig } from "@uni-helper/vite-plugin-uni-manifest";
import path from "node:path";
import { loadEnv } from "vite";

// 获取环境变量的范例
const env = loadEnv(process.env.NODE_ENV!, path.resolve(process.cwd()));
const {
  VITE_APP_TITLE,
  VITE_UNI_APPID,
  VITE_WX_APPID,
  VITE_APP_PUBLIC_BASE,
  VITE_FALLBACK_LOCALE,
  VITE_AMAP_KEY
} = env;

export default defineManifestConfig({
  name: VITE_APP_TITLE,
  appid: VITE_UNI_APPID,
  description: "",
  versionName: "1.0.0",
  versionCode: "100",
  transformPx: false,
  h5: {
    router: {
      base: VITE_APP_PUBLIC_BASE,
    },
    sdkConfigs: {
      maps: {
        key: VITE_AMAP_KEY
      }
    }
  },
  "app-plus": {
    usingComponents: true,
    nvueStyleCompiler: "uni-app",
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    /* 模块配置 */
    modules: {
      maps: {
        amap: {
          appkey_ios: VITE_AMAP_KEY,
          appkey_android: VITE_AMAP_KEY
        },
        qqmap: {
          appkey_ios: 'YOUR_QQ_MAP_APPKEY_IOS',
          appkey_android: 'YOUR_QQ_MAP_APPKEY_ANDROID'
        },
        baidu: {
          appkey_ios: 'YOUR_BAIDU_MAP_APPKEY_IOS',
          appkey_android: 'YOUR_BAIDU_MAP_APPKEY_ANDROID'
        },
        google: {
          appkey_ios: 'YOUR_GOOGLE_MAP_APPKEY_IOS',
          appkey_android: 'YOUR_GOOGLE_MAP_APPKEY_ANDROID'
        },
        tencent: {
          appkey_ios: 'YOUR_TENCENT_MAP_APPKEY_IOS',
          appkey_android: 'YOUR_TENCENT_MAP_APPKEY_ANDROID'
        }
      }
    },
    /* 应用发布信息 */
    distribute: {
      /* android打包配置 */
      android: {
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>',
          '<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>',
          '<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION"/>'
        ]
      },
      /* ios打包配置 */
      ios: {
        "UIBackgroundModes": ["location"],
        "NSLocationWhenInUseUsageDescription": "需要定位权限",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "需要定位权限",
        "NSLocationAlwaysUsageDescription": "需要定位权限"
      },
      /* SDK配置 */
      sdkConfigs: {},
      /* 图标配置 */
      icons: {
        android: {},
        ios: {},
      },
    },
  },
  /* 快应用特有相关 */
  quickapp: {},
  /* 小程序特有相关 */
  "mp-weixin": {
    appid: VITE_WX_APPID,
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序定位"
      }
    }
  },
  "mp-alipay": {
    usingComponents: true
  },
  "mp-baidu": {
    usingComponents: true,
    appid: "你的百度小程序AppID",
    setting: {
      urlCheck: false
    },
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序定位"
      }
    }
  },
  "mp-toutiao": {
    usingComponents: true,
  },
  uniStatistics: {
    enable: false,
  },
  vueVersion: "3",
});
