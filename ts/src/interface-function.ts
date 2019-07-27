// 函数类型接口(1,2,3只是定义了函数类型，需要自己具体实现)

// 0. 函数声明
function add11(x: number, y: number) {
  return x + y
}

// 1. 通过变量声明
let add22: (x: number, y: number) => number
add22 = (a, b) => a + b

// 2. 通过接口声明
interface Add33 {
  (x: number, y: number): number
}

// 3. 通过类型别名声明
type Add44 = (x: number, y: number) => number
let add44: Add44 = (a, b) => a + b

// 混合接口
interface Lib {
  (): void;
  version: string;
  doSomething(): void;
}
function getLib() {
  let lib: Lib = (() => {}) as Lib // 类型断言
  lib.version = '1.0.0'
  lib.doSomething = () => {}
  return lib
}
let lib1 = getLib()
lib1()
lib1.doSomething()
let lib2 = getLib()
lib2.doSomething()


// 函数可选参数
function add10(x: number, y?: number) {
  return y ? x + y : x
}
// 函数默认参数
function add12(x: number, y = 0, z: number, q = 1) {
  return x + y + z + q
}
console.log('add12:', add12(1, 2, 3))
// 必选参数前面的默认参数不想填时必须传undefined；必选参数后面的默认参数可不填
console.log('add12:', add12(1, undefined, 3))

// 剩余参数
function add13(x: number, ...rest: number[]) {
  return x + rest.reduce((prev, curr) => prev + curr)
}
console.log('add13:', add13(1, 2, 3, 4, 5))

// 函数重载
/**
 * 在C++或者java等静态语言中，两个函数名称相同，但是参数类型不同或者参数个数不同，实现了函数重载。
 * 函数重载的好处是：不需要为功能相似的函数起不同的名称。
 * ts实现函数重载的时候，要求定义一系列的函数声明，在类型最宽泛的版本中实现重载。
 */
function add14(...rest: number[]): number
function add14(...rest: string[]): string
function add14(...rest: any[]): any {
  let first = rest[0]
  if (typeof first === 'number') {
    return rest.reduce((prev, curr) => prev + curr)
  }
  if (typeof first === 'string') {
    return rest.join('')
  }
}
console.log('add14:', add14(1, 2, 3, 4, 5))
console.log('add14:', add14('1', '2', '3', '4', '5'))
