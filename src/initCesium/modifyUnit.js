import * as Cesium from "cesium";
import {getCcs3dScenesElementAllInfo} from "../request/api";

export default function modifyUnit(viewer) {
    let params = {
        scenesId: '37P3jwctv3ixQmlceDZ',
        activeFlag: '1',
        elementType: '2'
    }
    getCcs3dScenesElementAllInfo(params).then(res=>{
        for (let i = 0; i < res.length; i++){
            let label =  viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees( res[i].longitude,  res[i].latitude,  res[i].altitude),
                scenesElementId: res[i].scenesElementId,
                label: {
                    text: res[i].scenesElementName,
                    font: "10px sans-serif",
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 4,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 标签水平方向以中心为基准
                    verticalOrigin: Cesium.VerticalOrigin.TOP, // 标签垂直方向以顶部为基准
                    pixelOffset: new Cesium.Cartesian2(0, -50) // 在图标上方偏移30个像素
                },
                billboard: {
                    width:40,
                    height: 40,
                    image: './icon/定位.png',
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                },
            })
        }
    })
}

