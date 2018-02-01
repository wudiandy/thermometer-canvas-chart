window.onload = function() {
    "use strict";

    var myCanvas = document.getElementById("myCanvas");

    // 设置canvas的宽度为浏览器的宽度
    // myCanvas.style.width = window.innerWidth-30+"px";
    // myCanvas.style.height = window.innerHeight-30+"px";

    // 定义图表属性类
    function ChartProperty(){}
    var chartProperty = new ChartProperty();
    chartProperty.actualValue = 0.3; // 实际值, 即液柱显示的值
    chartProperty.plannedValue = 0.4; // 计划值, 即三角指向的值
    chartProperty.isMouseOver = false; // 鼠标是否在液柱上, true: 在液柱上, false: 不在液柱上
    
    var current = 300; // 液柱当前的值
    var index2 = 330; // 三角形指向的值

    // 取得canvas context对象
    var myCanvasContext = myCanvas.getContext("2d");
    myCanvasContext.save();

    // 动画效果
    var index = 0;
    var endValue = chartProperty.actualValue;
    var id = window.setInterval(function(){
        myCanvasContext.clearRect(0, 0, myCanvasContext.width, myCanvasContext.height);
        chartProperty.actualValue = index;
        draw(myCanvasContext, chartProperty);
        if (index >= endValue) {
            window.clearInterval(id);
        }
        index += 0.01;
    }, 30);

    // 鼠标事件
    myCanvas.addEventListener("mousemove", function(event){
        // 判断鼠标是否在液柱上
        // 获取鼠标坐标
        var x = event.clientX - myCanvas.offsetLeft;
        var y = event.clientY - myCanvas.offsetTop;
        
        if (x>27 && x<369 && y>142 && y<157) { // 如果鼠标在液柱上, 重新绘制图表
            chartProperty.isMouseOver = true;
            chartProperty.mouseX = x;
            chartProperty.mouseY = y;
            myCanvasContext.clearRect(0, 0, myCanvasContext.width, myCanvasContext.height);
            draw(myCanvasContext, chartProperty);
        }else{
            if (chartProperty.isMouseOver == true) { // 如果鼠标从液柱上移开, 重新绘制图表
                chartProperty.isMouseOver = false;
                myCanvasContext.clearRect(0, 0, myCanvasContext.width, myCanvasContext.height);
                draw(myCanvasContext, chartProperty);
            }
        }
    });
};

/**
 * 画出温度计的一帧
 * @param {Object} myCanvasContext canvas context对象
 * @param {Object} chartProperty 图表属性对象
 */
function draw(myCanvasContext, chartProperty) {
    var index = chartProperty.actualValue*342;
    var index2 = chartProperty.plannedValue*342;

    // 参数验证
    if (!myCanvasContext) return;
    if (index < 0) index = 0;
    if (index > 342) index = 342;
    if (index2 < 27) index2 = 27;
    if (index2 > 369) index2 = 369;

    // Layer 1 圆角矩形背景
    // 颜色
    var linearGradient = myCanvasContext.createLinearGradient(0, 110, 0, 191);
    linearGradient.addColorStop(0, 'rgb(222, 222, 222)');
    linearGradient.addColorStop(0.5, 'rgb(255, 255, 255)');
    linearGradient.addColorStop(1, "rgb(187, 187, 187)");
    myCanvasContext.fillStyle = linearGradient;
    myCanvasContext.strokeStyle = "rgb(0, 0, 0)";
    myCanvasContext.lineWidth = 1;

    // 形状
    myCanvasContext.beginPath();
    myCanvasContext.moveTo(10, 110);
    myCanvasContext.lineTo(387, 110);
    myCanvasContext.bezierCurveTo(391, 110, 394, 113, 393, 117);
    myCanvasContext.lineTo(394, 184);
    myCanvasContext.bezierCurveTo(394, 188, 391, 191, 387, 191);
    myCanvasContext.lineTo(10, 191);
    myCanvasContext.bezierCurveTo(6, 191, 3, 188, 3, 183);
    myCanvasContext.lineTo(3, 117);
    myCanvasContext.bezierCurveTo(3, 113, 6, 110, 10, 110);
    myCanvasContext.fill();
    myCanvasContext.stroke();

    // Layer 2 液柱背景
    // 颜色
    myCanvasContext.restore();
    myCanvasContext.save();
    linearGradient = myCanvasContext.createLinearGradient(0, 144, 0, 157);
    linearGradient.addColorStop(0, 'rgb(128, 128, 128)');
    linearGradient.addColorStop(1, 'rgb(102, 102, 102)');
    myCanvasContext.fillStyle = linearGradient;

    // 形状
    myCanvasContext.beginPath();
    myCanvasContext.moveTo(27, 144);
    myCanvasContext.lineTo(369, 144);
    myCanvasContext.bezierCurveTo(373, 144, 376, 146, 376, 150);
    myCanvasContext.lineTo(376, 151);
    myCanvasContext.bezierCurveTo(376, 154, 373, 157, 369, 157);
    myCanvasContext.lineTo(27, 157);
    myCanvasContext.bezierCurveTo(23, 157, 20, 154, 20, 151);
    myCanvasContext.lineTo(20, 150);
    myCanvasContext.bezierCurveTo(20, 146, 23, 144, 27, 144);
    myCanvasContext.fill();

    // Layer 3 液柱
    // 颜色
    myCanvasContext.restore();
    myCanvasContext.save();
    linearGradient = myCanvasContext.createLinearGradient(0, 144, 0, 157);
    if(chartProperty.isMouseOver) {
        linearGradient.addColorStop(0, 'rgb(235, 222, 11)');
        linearGradient.addColorStop(0.3, 'rgb(232, 185, 0)');
        linearGradient.addColorStop(0.6, 'rgb(221, 128, 26)');
        linearGradient.addColorStop(1, 'rgb(235, 106, 66)');
    }else{
        linearGradient.addColorStop(0, 'rgb(255, 242, 31)');
        linearGradient.addColorStop(0.3, 'rgb(252, 205, 0)');
        linearGradient.addColorStop(0.6, 'rgb(241, 148, 46)');
        linearGradient.addColorStop(1, 'rgb(255, 126, 86)');
    }
    myCanvasContext.fillStyle = linearGradient;

    // 形状
    // 0%: 0, 100%: 342
    myCanvasContext.beginPath();
    myCanvasContext.moveTo(27, 144);
    myCanvasContext.lineTo(27+index, 144);
    myCanvasContext.bezierCurveTo(27+index+4, 144, 27+index+7, 146, 27+index+7, 150);
    myCanvasContext.lineTo(27+index+7, 151);
    myCanvasContext.bezierCurveTo(27+index+7, 154, 27+index+4, 157, 27+index, 157);
    myCanvasContext.lineTo(27, 157);
    myCanvasContext.bezierCurveTo(23, 157, 20, 154, 20, 151);
    myCanvasContext.lineTo(20, 150);
    myCanvasContext.bezierCurveTo(20, 146, 23, 144, 27, 144);
    myCanvasContext.fill();

    // Layer 4 三角形
    // 颜色
    myCanvasContext.restore();
    myCanvasContext.save();
    myCanvasContext.fillStyle = "rgb(16, 128, 243)";

    // 形状
    // 0%: 0, 100%: 342
    myCanvasContext.beginPath();
    myCanvasContext.moveTo(27+index2-8, 120);
    myCanvasContext.lineTo(27+index2+8, 120);
    myCanvasContext.lineTo(27+index2, 129);
    myCanvasContext.fill();

    // Layer 5 刻度
    myCanvasContext.restore();
    myCanvasContext.save();

    // 颜色
    myCanvasContext.fillStyle = "rgb(238, 46, 59)";

    // 形状
    for (var i = 0; i <= 100; i+=2) {
        // 刻度线的高度
        var scopeHeight = 0;
        // 上刻度线基准高度
        var upScopeBaseHeight = 142;
        // 下刻度线基准高度
        var downScopeBaseHeight = 157;

        // 计算刻度线的高度
        if(i%10 == 0) {
            scopeHeight = 14;

            // 绘制刻度值
            myCanvasContext.fillText(i, 34+i*3.42-2, downScopeBaseHeight+scopeHeight+10);
        }else{
            scopeHeight = 7;
        }

        // 绘制上刻度线
        myCanvasContext.beginPath();
        myCanvasContext.moveTo(34+i*3.42, upScopeBaseHeight);
        myCanvasContext.lineTo(34+i*3.42, upScopeBaseHeight-scopeHeight);
        myCanvasContext.lineTo(36+i*3.42, upScopeBaseHeight-scopeHeight);
        myCanvasContext.lineTo(36+i*3.42, upScopeBaseHeight);
        myCanvasContext.closePath();
        myCanvasContext.fill();

        // 绘制下刻度线
        myCanvasContext.beginPath();
        myCanvasContext.moveTo(34+i*3.42, downScopeBaseHeight);
        myCanvasContext.lineTo(34+i*3.42, downScopeBaseHeight+scopeHeight);
        myCanvasContext.lineTo(36+i*3.42, downScopeBaseHeight+scopeHeight);
        myCanvasContext.lineTo(36+i*3.42, downScopeBaseHeight);
        myCanvasContext.closePath();
        myCanvasContext.fill();

        // Layer 6 提示框
        myCanvasContext.restore();
        myCanvasContext.save();

        // 颜色
        // 形状
        myCanvasContext.beginPath();
        myCanvasContext.moveTo();
    }
}