import * as Cesium from "cesium";

export default function modifyBuild(viewer) {
    /**
    * 上海市地理信息模型
    * **/
    const buildingCity = new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId((96188))
    })
    buildingCity.readyPromise.then((response)=>{
        let defaultStyle = new Cesium.Cesium3DTileStyle();
        // 设置样式属性，去除边框
        defaultStyle.color = {
            conditions: [
                ['true', 'color("#62A5F7")'],
            ],
        };
        // 设置样式属性，去除边框
        defaultStyle.skipLevels = 0;
        buildingCity.style = defaultStyle;
    })
    // 将模型与地面贴合
    viewer.scene.primitives.add(buildingCity)
    buildingCity.maximumScreenSpaceError = 8;

    //获取初始位置
    var initialPosition = buildingCity.modelMatrix;
    // 移动地理模型
    function moveTileset(positionOffset) {
        var newMatrix = Cesium.Matrix4.fromTranslation(positionOffset);
        buildingCity.modelMatrix = Cesium.Matrix4.multiply(
            newMatrix,
            initialPosition,
            new Cesium.Matrix4()
        );
    }
    // 调用移动地理模型函数进行位置偏移
    moveTileset(new Cesium.Cartesian3(0, 0, -10)); // 将模型向 x 轴正方向移动 1000 米

    let option = {
            stroke: Cesium.Color.BLACK,
            fill: Cesium.Color.BLACK.withAlpha(0.32)
        }
    let dataSourcePromise = Cesium.GeoJsonDataSource.load('./json/geo_full.json',option);
    dataSourcePromise.then((dataSource)=> {
        viewer.dataSources.add(dataSource);
        let entities = dataSource.entities.values;
        for (let i = 0; i < entities.length; i++) {
            entities[i].polygon.extrudedHeight = 0;  // 设置突起的高度，单位为米
            entities[i].polygon.material = Cesium.Color.BLACK.withAlpha(0.32);  // 设置填充颜色
            entities[i].polygon.outlineColor = Cesium.Color.BLACK;  // 设置边框颜色
            entities[i].polygon.outlineWidth = 20;  // 设置边框宽度
        }
    });
}
