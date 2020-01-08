// 单独导出
export let a = 1

// 批量导出
let b = 2
let c = 3
export { b, c }

// 导出接口
export interface P {
  x: string;
  y: number;
}

// 导出函数
export function f1() {}
export const f2 = () => {}

// 导出时起别名
function g() {}
export { g as G }

// 默认导出(无需函数名，有函数名也不会起作用)
export default function () {
  console.log("I'm default")
}

// 引入外部模块后重新导出
export { str as hello } from './b'
