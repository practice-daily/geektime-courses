/**
 * namespace 命名空间
 * 变量只在命名空间下有效
 * 想要在全局有效，需要使用export进行导出
 */
namespace Shap {
  const pi = Math.PI
  export function circle (r: number) {
    return pi * r ** 2
  }
}
