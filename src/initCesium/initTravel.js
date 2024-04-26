import * as Cesium from "cesium";
import {getCcs3dScenesElementAllInfo} from "../request/api";

export default function initTravel(viewer) {
    let params = {
        scenesId: '37P3jwctv3ixQmlceDZ',
        activeFlag: '1',
        elementType: '3'
    }
    let vehicleModels = []; // 保存车辆模型的数组

    function getDataFromAPI() {
        getCcs3dScenesElementAllInfo(params).then(data => {
            // 清除之前的车辆模型
            vehicleModels.forEach(function (model) {
                viewer.entities.remove(model);
            });
            vehicleModels = [];
            data.forEach(function (item,index) {
                let vehicleModelId = item.scenesElementId; //从数据中获取车辆的id
                let lon = item.longitude ; // 从数据中获取车辆的经度
                let lat = item.latitude ; // 从数据中获取车辆的纬度
                let height = item.altitude ; // 从数据中获取车辆的高度
                let heading = item.bearing ; // 从数据中获取车辆的旋转角度
                let speed = item.speed; // 从数据中获取车辆的速度
                // 将角度从度转换为弧度
                let headingRadians = Cesium.Math.toRadians(heading);
                let position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
                let orientation = Cesium.Transforms.headingPitchRollQuaternion(
                    position,
                    new Cesium.HeadingPitchRoll(headingRadians, 0, 0)
                );
                let vehicleModel = viewer.entities.add({
                    name: 'Vehicle',
                    model: {
                        uri: './public/model/geo_rook.glb',
                        minimumPixelSize: 100,
                        maximumScale: 100,
                        clampAnimations: true,
                    },
                    vehicleModelId:vehicleModelId,
                    position: position,
                    orientation: orientation
                });
                vehicleModels.push(vehicleModel);
            });
        })
    }
    getDataFromAPI();
    setInterval(function () {
        getDataFromAPI();
    }, 20000);

}
