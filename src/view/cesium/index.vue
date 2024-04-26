<template>
  <div>
    <div id="cesiumContainer" ref="cesiumContainer"></div>
    <div v-if="dialogContentShow">
      <dia-log :element="dataSource.currentClickElement" @closeDialog="closeDialog"></dia-log>
    </div>
  </div>
</template>

<script setup>
import {onMounted,reactive,ref,toRef} from 'vue';
import CesiumNavigaion from "cesium-navigation-es6";
import initViewer from "../../initCesium/initViewer";
import MousePosition from "../../initCesium/mousePosition";
import modifyBuild from "../../initCesium/modifyBuild";
import initLoading from "../../initCesium/initLoading";
import modifyMap from "../../initCesium/modifyMap";
import modifyUnit from "../../initCesium/modifyUnit";
import initLeftClick from "../../initCesium/initLeftClick";
import cameraController from "../../initCesium/cameraController";
import createRoad from "../../initCesium/createRoad";
import initTravel from "../../initCesium/initTravel";
import initVehicle from "../../initCesium/initVehicle";
import eventHub from "../../until/eventHub";
import {cesiumEvent} from "../../until/eventType";
import initLog from "../../initCesium/initLog";
import diaLog from "../../components/dialog/index.vue"

// 设置导航罗盘的配置
let options = {
  // 启用罗盘
  enableCompass: true,
  // 是否启用缩放
  enableZoomControls: false,
  // 是否启用指南针外环
  enableCompassOuterRing: true,
  // 是否启用距离的图例
  enableDistanceLegend: true,
};

const dialogContentShow = ref(true)

const dataSource = reactive({
  currentClickElement:''
})

eventHub.on(cesiumEvent.basicGeoInfo, (status) => {
  dataSource.currentClickElement = status
  dialogContentShow.value = true
})

const initDialog=()=>{
  dialogContentShow.value = false;
}

const  closeDialog=()=>{
  dialogContentShow.value = false;
}

const initCesium = ()=>{
  let ws = import.meta.env.VITE_WS_PATH
  //初始化cesium
  let viewer = initViewer();
  // 根据鼠标位置生成经纬度值
  new MousePosition(viewer);
  // 初始化导航罗盘
  new CesiumNavigaion(viewer, options);
  // 创建鼠标点击事件
  new initLeftClick(viewer);
  //初始化道路轨迹运输
  // initTravel(viewer);
  //车辆动画效果
  initVehicle(viewer);
  //初始化地理模型
  modifyBuild(viewer);
  // 修改地图的底色
  modifyMap(viewer);
  //加载模型
  initLoading(viewer);
  //通过经纬度给坐标打点
  modifyUnit(viewer);
  //地图滚动距离
  cameraController(viewer);
  //创建道路线条
  // createRoad(viewer);
  //案例
  initLog(viewer);

}

onMounted(() => {
  //初始化cesium
  initCesium()
  //初始化弹框内容
  initDialog()
})


</script>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

</style>
