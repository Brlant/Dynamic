import * as Cesium from "cesium";
import {getCcs3dScenesElementAllInfo} from "../request/api";
import {TWEEN} from "../plugins/libs/tween.module.min";

export default function initVehicle(viewer) {
    let params = {
        scenesId: '37P3jwctv3ixQmlceDZ',
        activeFlag: '1',
        elementType: '3'
    }

    // 创建Tween集合对象
    const tweenCollection = new Cesium.TweenCollection();

    class VehicleModel {
        constructor(vehicleModelId, position, heading, speed) {
            this.vehicleModelId = vehicleModelId;
            this.position = position;
            this.heading = heading;
            this.speed = speed;
            // 将角度从度转换为弧度
            let headingRadians = Cesium.Math.toRadians(this.heading);
            this.entity = viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude, position.height),
                orientation: Cesium.Transforms.headingPitchRollQuaternion(
                    Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude, position.height),
                    new Cesium.HeadingPitchRoll(headingRadians, 0, 0)
                ),
                model: {
                    uri: './public/model/geo_rook.glb', // 车辆模型的路径
                    scale: 1.0,
                    minimumPixelSize: 150,
                    maximumScale: 100,
                    clampAnimations: true,
                },
                vehicleModelId: this.vehicleModelId,
            });
            this.moveAnimation = null; // 保存移动动画对象
        }

        updatePositionAndRotation(position) {
            this.position = position
        }

        moveVehicle(targetPosition, speed) {
            // this.entity.position = Cesium.Cartesian3.fromDegrees(targetPosition.longitude, targetPosition.latitude, targetPosition.height);
            // console.log(this.entity.position,'坐标');
            const currentVehicle = this.position;
            const targetVehicle = targetPosition;
            const duration = 15
            // 根据当前位置和目标位置创建插值器
            // var interpolator = new Cesium.SampledPositionProperty();
            // interpolator.addSample(Cesium.JulianDate.now(), Cesium.Cartesian3.fromDegrees(currentVehicle.longitude, currentVehicle.latitude, currentVehicle.altitude));
            // var nextTime = Cesium.JulianDate.addSeconds(Cesium.JulianDate.now(), 15, new Cesium.JulianDate());
            // interpolator.addSample(nextTime, Cesium.Cartesian3.fromDegrees(targetVehicle.longitude, targetVehicle.latitude, targetVehicle.altitude));
            // console.info('插值推送数据', interpolator);
            // this.entity.position = interpolator;
            // 根据WebSocket返回的对象中的位置信息更新车辆模型的位置

            //使用Tween 计算车辆位置
            this.moveAnimation = new TWEEN.Tween(currentVehicle)
                .to(targetPosition, duration * 1000)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(() => {
                    // 更新车辆实体的位置
                    this.updatePositionAndRotation(targetVehicle);
                })
                .start();
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update(); // 更新动画状态
    }

    animate();


    let socket = new WebSocket(import.meta.env.VITE_WS_PATH + `/ws/map3d`, ['37P3jwctv3ixQmlceDZ'])
    socket.addEventListener('open', (event) => {
        console.log('websocket连接成功')
    })
    socket.addEventListener('error', (event) => {
    })
    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        if (!data) {
            return
        }
        const vehicleModelId = data.scenesElementId; //从数据中获取车辆的id
        const longitude = data.longitude; // 从数据中获取车辆的经度
        const latitude = data.latitude; // 从数据中获取车辆的纬度
        const heading = data.bearing; // 从数据中获取车辆的旋转角度
        const height = data.altitude; // 从数据中获取车辆的高度
        const speed = data.speed; // 从数据中获取车辆的速度
        if (vehicleModels.hasOwnProperty(vehicleModelId)) {
            // 更新已存在的车辆模型的位置和姿态
            vehicleModels[vehicleModelId].updatePositionAndRotation({longitude, latitude,height});
            // 移动车辆到目标位置
            // const targetPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
            vehicleModels[vehicleModelId].moveVehicle({longitude, latitude, height}, speed);
        }

    })


    // 创建车辆模型字典
    let vehicleModels = {};

    getCcs3dScenesElementAllInfo(params).then(function (data) {
        console.log(data, '创建车辆');
        data.forEach(item => {
            const vehicleModelId = item.scenesElementId; //从数据中获取车辆的id
            const longitude = item.longitude; // 从数据中获取车辆的经度
            const latitude = item.latitude; // 从数据中获取车辆的纬度
            const heading = item.bearing; // 从数据中获取车辆的旋转角度
            const height = item.altitude; // 从数据中获取车辆的高度
            const speed = item.speed; // 从数据中获取车辆的速度
            if (!vehicleModels.hasOwnProperty(vehicleModelId)) {
                const vehicleModel = new VehicleModel(vehicleModelId, {longitude, latitude, height}, heading, speed)
                vehicleModels[vehicleModelId] = vehicleModel
            }
        })
    })


}
