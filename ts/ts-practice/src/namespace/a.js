"use strict";
/**
 * namespace 命名空间
 * 变量只在命名空间下有效
 * 想要在全局有效，需要使用export进行导出
 */
var Shap;
(function (Shap) {
    var pi = Math.PI;
    function circle(r) {
        return pi * Math.pow(r, 2);
    }
    Shap.circle = circle;
})(Shap || (Shap = {}));
