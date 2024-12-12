import { createSSRApp } from "vue";
import App from "./App.vue";
import "virtual:uno.css";
import { initVConsole } from './utils/debug'

// 初始化 vConsole
initVConsole()

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
