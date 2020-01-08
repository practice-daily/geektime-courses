"use strict";
/// <reference path="./a.ts" />
var Shap;
(function (Shap) {
    function square(x) {
        return Math.pow(x, 2);
    }
    Shap.square = square;
})(Shap || (Shap = {}));
console.log(Shap.circle(1));
console.log(Shap.square(1));
// 使用以下方法起别名，方便变量访问，此处import与模块系统没有关系
var circle = Shap.circle;
console.log(circle(2));
