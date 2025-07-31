/**
 * 应用程序入口文件
 * 初始化Vue3应用并配置OpenLayers地图组件
 */

import {createApp} from "vue";
import App from "./App.vue";

// 导入Vue3-OpenLayers插件
import OpenLayersMap from "vue3-openlayers";

// 创建Vue应用实例
const app = createApp(App);

// 注册OpenLayers地图插件
app.use(OpenLayersMap);

// 将应用挂载到DOM元素#app上
app.mount("#app");