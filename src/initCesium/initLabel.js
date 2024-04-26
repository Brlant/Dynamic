import * as Cesium from "cesium";

export default function initLabel(viewer) {
    let data = [
        {
            id: '20230601',
            name: 'Label 1',
            position: [121.50139, 31.23537, 650],
        },
        {
            id: '20230602',
            name: 'Label 2',
            position: [121.49475, 31.23872, 300],
        },
        {
            id: '20230603',
            name: 'Label 2',
            position: [121.48087, 31.24058, 300],
        },
        {
            id: '20230604',
            name: 'Label 2',
            position: [121.49214, 31.22979, 300],
        },
        {
            id: '20230605',
            name: 'Label 2',
            position: [121.50519, 31.24473, 300],
        },
        {
            id: '20230606',
            name: 'Label 2',
            position: [121.47498, 31.23203, 500],
        },
        {
            id: '20230607',
            name: 'Label 2',
            position: [121.49793, 31.22265, 500],
        },
    ];
    for (let i = 0; i < data.length; i++) {
        let label = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(data[i].position[0], data[i].position[1], data[i].position[2]),
            myId: data[i].id,
            label: {
                font: "16px sans-serif",
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 4,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new Cesium.Cartesian2(0, -24),
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            },
            billboard: {
                width:35,
                height: 35,
                image: './icon/定位.png',
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(0, -20),
            }
        });
    }
}
