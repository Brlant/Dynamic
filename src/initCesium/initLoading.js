import * as Cesium from "cesium";

export default function initLoading(viewer) {
    /**
     * loading加载场景模型
     * **/
    const loadingDom = document.createElement("div");
    loadingDom.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
        font-size: 24px;
        z-index: 1000;
    `
    document.body.appendChild(loadingDom);

    let img = document.createElement('img');
    img.src = `./assets/ajax-loader.gif`


    // 创建包裹元素
    var wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.top = "60%"; // 设置相对于父元素垂直居中
    wrapper.style.left = "51%"; // 设置相对于父元素水平居中
    wrapper.style.transform = "translate(-60%, -51%)"; // 设置相对于自身中心居中

    // 创建一个新的 div 元素
    var textElement  = document.createElement("div");
    textElement.textContent = "加载中，请稍后......";
    textElement.style.fontSize = '0.12rem';
    textElement.style.textAlign = "center"; // 居中文本
    wrapper.appendChild(textElement);


    var tilesLoaded = 0;
    viewer.scene.globe.tileLoadProgressEvent.addEventListener(function (tilesLoadedCount) {
        tilesLoaded = tilesLoadedCount;
        if (viewer.scene.globe.tilesLoaded) {
            loadingDom.style.display = 'none';
        } else {
            loadingDom.appendChild(img);
            // loadingDom.appendChild(wrapper);
            // loadingDom.innerHTML = '加载 ' + tilesLoaded  + '/' + viewer.scene.globe.tilesLoaded + ', 请稍后.....';
        }
    });
}
