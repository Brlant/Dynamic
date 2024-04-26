import * as Cesium from "cesium";
import {getGaodeImageLabel,getGaodeVector,getGaodeStreet} from "../until/loadProvider"

export default function initViewer() {
    // 设置cesium token
    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlY2FhYzg2NC00MGVkLTRhZjgtYjNjMy01YzMwYzg2OWU3OGQiLCJpZCI6MTQ5NTU4LCJpYXQiOjE2ODc4NDU3NTV9.2IlAeWX5tOUV2v7nO2oxCJqNL4CKOIRSCd6U1W5Q4bA";
    var viewer = new Cesium.Viewer("cesiumContainer", {
        shouldAnimate: false,
        infoBox: false,
        geocoder: true,//搜索
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        shadows: true,
        terrainProvider: Cesium.createWorldTerrain(), //地形
    });
    viewer.imageryLayers.addImageryProvider(getGaodeVector())
    // 隐藏logo
    viewer.cesiumWidget.creditContainer.style.display = "none";
    viewer.scene.globe.enableLighting = true;
    // 取消天空盒显示
    viewer.scene.skyBox.show = false;
    // 获取默认的全局亮度调整
    let brightness = viewer.scene.globe.baseColor.brightness;
    // 将全局亮度调整设置为较低的值
    viewer.scene.globe.baseColor.brightness = 0.5;
    // 设置地球背景色为暗色
    viewer.scene.backgroundColor = new Cesium.Color(0, 0, 0);
    // 设置背景为黑色
    // viewer.scene.backgroundColor = Cesium.Color.BLACK;
    // 设置抗锯齿
    viewer.scene.postProcessStages.fxaa.enabled = true;
    /**
     * 摄像头指向目标
     * **/
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
            121.47387, 31.19181, 1000.00
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-15.0), //-15
            roll: 0.0
        }
    });

    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            121.47387, 31.19181, 1000.00
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-15.0), //-15
            roll: 0,
        },
    });

    return viewer;
}
