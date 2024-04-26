import * as Cesium from "cesium";

export default function createRoad(viewer) {
    function CustomMaterialLine(options) {
        let Color = Cesium.Color,
            defaultValue = Cesium.defaultValue,
            defined = Cesium.defined,
            defineProperties = Object.defineProperties,
            Event = Cesium.Event,
            createPropertyDescriptor = Cesium.createPropertyDescriptor,
            Property = Cesium.Property,
            Material = Cesium.Material,
            defaultColor = Color.WHITE,
            currentTime = window.performance.now(),
            MaterialType = options.MaterialType || 'wallType' + parseInt(Math.random() * 1000);
        function PolylineCustomMaterialProperty(options) {
            options = defaultValue(options, defaultValue.EMPTY_OBJECT);
            this._definitionChanged = new Event();
            this._color = undefined;
            this._colorSubscription = undefined;
            this.color = options.color || Cesium.Color.BLUE;
            this.duration = options.duration || 1000;
            this._time = currentTime;
        }
        defineProperties(PolylineCustomMaterialProperty.prototype, {
            isvarant: {
                get: function () {
                    return false;
                }
            },
            definitionChanged: {
                get: function () {
                    return this._definitionChanged;
                }
            },
            color: createPropertyDescriptor('color')
        });
        PolylineCustomMaterialProperty.prototype.getType = function (time) {
            return MaterialType;
        };
        PolylineCustomMaterialProperty.prototype.getValue = function (time, result) {
            if (!defined(result)) {
                result = {};
            }
            window.m3d = true;
            result.color = Property.getValueOrClonedDefault(this._color, time, defaultColor, result.color);
            result.image = options.image;
            result.time = ((window.performance.now() - this._time) % this.duration) / this.duration;
            return result;
        };
        PolylineCustomMaterialProperty.prototype.equals = function (other) {
            return this === other ||
                (other instanceof PolylineCustomMaterialProperty &&
                    Property.equals(this._color, other._color));
        };
        Material._materialCache.addMaterial(MaterialType, {
            fabric: {
                type: MaterialType,
                uniforms: {
                    color: options.color || new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                    image: options.image,
                    time: 0
                },
                source: `czm_material czm_getMaterial(czm_materialInput materialInput)
                {
                    czm_material material = czm_getDefaultMaterial(materialInput);
                    vec2 st = materialInput.st;
                    if(texture(image, vec2(0.0, 0.0)).a == 1.0){
                        discard;
                    }else{
                        material.alpha = texture(image, vec2(1.0 - fract(time - st.s), st.t)).a * color.a;
                    }
                    material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb);
                    return material;
                }
                `,
            },
            translucent: function (material) {
                return true;
            }
        })
        return new PolylineCustomMaterialProperty(options);
    }
    // 创建材质线
    let getCustomMaterialLine = (image, color) => {
        return new CustomMaterialLine({
            image: image,
            color: color,
            duration: 1000
        })
    }
    const createRoad = (url) => {
        let promise = Cesium.GeoJsonDataSource.load(url);
        promise.then((dataSource) => {
            viewer.dataSources.add(dataSource)
            let entities = dataSource.entities.values;
            for (let o = 0; o < entities.length; o++) {
                entities[o].polyline.width = 3;
                entities[o].polyline.clampToGround = true;
                entities[o].polyline.material =
                    getCustomMaterialLine("./road/line.png", Cesium.Color.fromRandom())
            }
        })
    }

    createRoad("./road/road.json")
    createRoad("./road/road2.json")
}
