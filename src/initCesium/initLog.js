import * as Cesium from "cesium";

export default function initLog(viewer){
    let startPosition = new Cesium.Cartesian3.fromDegrees(121.04313, 31.03090);
    let endPosition = new Cesium.Cartesian3.fromDegrees(121.87643, 31.04129);
    let factor = 15;

    // 添加模型
    let vehicleEntity = viewer.entities.add({
        position: new Cesium.CallbackProperty(function() {
            if (factor > 1500) {
                factor = 0;
            }
            factor++;
            // 动态更新位置
            return Cesium.Cartesian3.lerp(startPosition, endPosition, factor / 1500.0, new Cesium.Cartesian3());
        }, false),
        model: {
            uri: "./public/model/geo_rook.glb",
            scale: 500.0,
        },
    });
    // viewer.trackedEntity = vehicleEntity;
}
