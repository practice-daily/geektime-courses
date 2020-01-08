/// <reference path="./a.ts" />

namespace Shap {
  export function square(x: number) {
    return x ** 2
  }
}

console.log(Shap.circle(1))
console.log(Shap.square(1))

// 使用以下方法起别名，方便变量访问，此处import与模块系统没有关系
import circle = Shap.circle
console.log(circle(2))
