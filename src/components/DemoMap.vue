<!--
  OpenLayers地图演示组件
  功能：
  1. 展示基于OpenLayers的交互式地图
  2. 动态加载GeoServer图层和图层组
  3. 提供图层控制、缩放、上下文菜单等地图控件
-->
<template>
  <!-- OpenLayers地图容器 -->
  <Map.OlMap id="map" ref="mapRef" :controls="[]">
    <!-- 地图视图配置：中心点、投影、缩放级别 -->
    <Map.OlView
        ref="view"
        :center="center"
        :projection="projection"
        :zoom="zoom"
    />

    <!-- 动态图层组：通过GeoServer API获取的图层组 -->
    <Layers.OlLayerGroup v-for="group in dynamicLayerGroupList" :key="group.name" :title="group.name"
                         :visible="group.visible">
      <!-- 图层组内的瓦片图层 -->
      <Layers.OlTileLayer v-for="layer in group.layers" :key="layer.name" :title="layer.name" :visible="layer.visible">
        <Sources.OlSourceTileWms :layers="layer.name" :url="layer.url"/>
      </Layers.OlTileLayer>
    </Layers.OlLayerGroup>

    <!-- 动态图层：通过GeoServer API获取的单独图层 -->
    <Layers.OlTileLayer v-for="layer in dynamicLayerList" :key="layer.name" :title="layer.name"
                        :visible="layer.visible">
      <Sources.OlSourceTileWms :layers="layer.name" :url="layer.url"/>
    </Layers.OlTileLayer>

    <!-- 地图控件：图层切换器（展开状态） -->
    <MapControls.OlLayerswitcherControl :collapsed="false"/>

    <!-- 地图控件：缩放控制 -->
    <MapControls.OlZoomControl/>

    <!-- 地图控件：右键上下文菜单 -->
    <MapControls.OlContextMenuControl/>

    <!-- 地图控件：比例尺 -->
    <MapControls.OlScalelineControl/>

  </Map.OlMap>
</template>

<script lang="ts" setup>
// 导入Vue组合式API函数
import {onMounted, ref} from "vue";
// 导入OpenLayers Map类型定义
import type MapRef from "ol/Map";
// 导入Vue3-OpenLayers组件
import {Layers, Map, MapControls, Sources} from "vue3-openlayers";
// 导入GeoServer REST API类
import GeoServerRestApi from '../geoserver/GeoServerRestApi';

// ========== 响应式数据定义 ==========

/** 地图中心点坐标 [经度, 纬度] */
const center = ref([40, 40]);

/** 地图投影坐标系 */
const projection = ref("EPSG:4326");

/** 地图初始缩放级别 */
const zoom = ref(0);

/** 动态图层列表：存储从GeoServer获取的单独图层 */
const dynamicLayerList = ref([]);

/** 动态图层组列表：存储从GeoServer获取的图层组 */
const dynamicLayerGroupList = ref([]);

/** 地图实例引用 */
const mapRef = ref<MapRef | null>(null);

// ========== 生命周期钩子 ==========

/**
 * 组件挂载后执行
 * 主要功能：从GeoServer加载图层和图层组数据
 */
onMounted(async () => {
  try {
    // 创建GeoServer REST API实例
    let geoServerRestApi = new GeoServerRestApi();

    // ========== 加载单独图层 ==========
    
    // 获取所有图层列表
    let layers = await geoServerRestApi.layers.getLayers();
    let layerList = layers.layers.layer;
    
    // 遍历图层列表，配置每个图层
    layerList.forEach((layer: any) => {
      let layerName = layer.name;
      
      // 特殊处理：ne:countries图层默认显示，其他图层默认隐藏
      if (layerName === 'ne:countries') {
        dynamicLayerList.value.push({
          name: layerName,                 // 图层名称
          url: `/geoserver/wms`,          // WMS服务URL
          visible: true,                  // 默认可见
        });
      } else {
        dynamicLayerList.value.push({
          name: layerName,                 // 图层名称
          url: `/geoserver/wms`,          // WMS服务URL
          visible: false,                 // 默认隐藏
        });
      }
    });

    // ========== 加载图层组 ==========
    
    // 获取所有图层组列表
    let groups = await geoServerRestApi.layers.getLayerGroups();
    
    // 遍历图层组列表
    for (let group of groups.layerGroups.layerGroup) {
      let groupName = group.name;
      
      // 获取图层组详细信息
      let groupLayers = await geoServerRestApi.layers.getLayerGroup(groupName);
      
      // 创建图层组对象
      let layerGroups = {
        name: groupName,                  // 图层组名称
        layers: [],                       // 图层组内的图层列表
        visible: false,                   // 默认隐藏
      };
      
      // 遍历图层组内的已发布对象
      groupLayers.layerGroup.publishables.published.forEach((layer: any) => {
        // 只处理类型为"layer"的对象，跳过其他类型
        if (layer["@type"] !== "layer") return;

        // 添加图层到图层组
        layerGroups.layers.push({
          name: layer.name,               // 图层名称
          url: `/geoserver/wms`,         // WMS服务URL
          visible: false,                // 默认隐藏
        });
      });
      
      // 将配置好的图层组添加到列表
      dynamicLayerGroupList.value.push(layerGroups);
    }
  } catch (error) {
    // 错误处理：记录加载失败信息
    console.error("Failed to load layers:", error);
  }
});
</script>

<style scoped>
/* 地图容器样式 */
#map {
  width: 100%;      /* 宽度占满父容器 */
  height: 100%;     /* 高度占满父容器 */
  position: absolute; /* 绝对定位 */
  top: 0;           /* 顶部对齐 */
  left: 0;          /* 左侧对齐 */
}
</style>