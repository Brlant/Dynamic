import {
    WebMapTileServiceImageryProvider,
    ArcGisMapServerImageryProvider,
    WebMercatorTilingScheme,
    Math as CesiumMath,
    Cartographic,
    UrlTemplateImageryProvider,
} from "cesium";
import {wgs84togcj02, gcj02towgs84} from "coordtransform";

export function getGaodeVector() {
    let provider = new UrlTemplateImageryProvider({
        url: "http://webst02.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}",
        tilingScheme: new WebMercatorTilingScheme(),
        maximumLevel: 20,
    });
    provider.readyPromise.then(() => {
        transformProjection(provider);
    });
    return provider;
}

export function getGaodeImageLabel() {
    let provider = new UrlTemplateImageryProvider({
        url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
        tilingScheme: new WebMercatorTilingScheme(),
        maximumLevel: 20,
    });
    provider.readyPromise.then(() => {
        transformProjection(provider);
    });
    return provider;
}

export function getGaodeStreet() {
    let provider = new UrlTemplateImageryProvider({
        url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        tilingScheme: new WebMercatorTilingScheme(),
        maximumLevel: 20,
    });
    provider.readyPromise.then(() => {
        transformProjection(provider);
    });
    return provider;
}

function transformProjection(provider) {
    let webMercatorTilingScheme = provider.tilingScheme;
    let projection = webMercatorTilingScheme._projection;
    projection.x_project = projection.project;
    projection.project = function (cartographic) {
        let point;
        return (
            (point = wgs84togcj02(CesiumMath.toDegrees(cartographic.longitude), CesiumMath.toDegrees(cartographic.latitude))),
                projection.x_project(new Cartographic(CesiumMath.toRadians(point[0]), CesiumMath.toRadians(point[1])))
        );
    };
    projection.x_unproject = projection.unproject;
    projection.unproject = function (cartesian) {
        let point,
            cartographic = projection.x_unproject(cartesian);
        return (
            (point = gcj02towgs84(CesiumMath.toDegrees(cartographic.longitude), CesiumMath.toDegrees(cartographic.latitude))),
                new Cartographic(CesiumMath.toRadians(point[0]), CesiumMath.toRadians(point[1]))
        );
    };
    return provider;
}
