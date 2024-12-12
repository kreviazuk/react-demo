import VConsole from 'vconsole'

// 根据环境决定是否启用 vConsole
let vConsole: any = null

// 在开发环境下初始化 vConsole
export const initVConsole = () => {
  // #ifdef H5
  // H5环境下只在开发环境启用
  if (process.env.NODE_ENV === 'development') {
    vConsole = new VConsole()
  }
  // #endif

  // #ifdef APP-PLUS
  // APP环境下总是启用
  vConsole = new VConsole()
  // #endif
}

export const destroyVConsole = () => {
  if (vConsole) {
    vConsole.destroy()
    vConsole = null
  }
} 