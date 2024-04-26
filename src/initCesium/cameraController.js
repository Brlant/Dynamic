import * as Cesium from "cesium";

export default function cameraController(viewer) {
    const minZoomDistance = 50; // 设置最小缩放距离，单位为米
    const maxZoomDistance = 5000000; // 设置最小缩放距离，单位为米
    // 获取默认的相机控制器
    const cameraController = viewer.scene.screenSpaceCameraController;
    // 设置滚动限制
    cameraController.minimumZoomDistance = minZoomDistance; // 设置最小缩放距离
    cameraController.maximumZoomDistance = maxZoomDistance; // 设置最大缩放距离
}
