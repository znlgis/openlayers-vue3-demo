<!--
  应用程序根组件
  作为整个应用的入口点，加载并显示主要的地图演示组件
-->
<script setup>
// 导入地图演示组件
import DemoMap from './components/DemoMap.vue'
</script>

<template>
  <!-- 渲染地图演示组件 -->
  <DemoMap/>
</template>