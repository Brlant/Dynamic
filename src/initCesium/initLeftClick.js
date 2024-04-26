import * as Cesium from "cesium";
import eventHub from "../until/eventHub";
import {cesiumEvent} from "../until/eventType";

export default class initLeftClick {
  constructor(viewer) {
    this.viewer = viewer;
     // 监听鼠标左键点击事件
     this.viewer.screenSpaceEventHandler.setInputAction((event) => {
        const pickedObject = this.viewer.scene.pick(event.position);
        if (Cesium.defined(pickedObject) && (pickedObject.id instanceof Cesium.Entity)) {
            let entity = pickedObject.id;
            console.log(entity);
            if (entity.scenesElementId) { // 判断是否存在自定义属性
                let data = {
                    id: entity.scenesElementId
                }
                eventHub.emit(cesiumEvent.basicGeoInfo, data)
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
}
