// 声明合并

/**
 * 接口之间的合并
 * 1. 非函数成员需保证唯一性，如果不唯一需要保证其类型一致
 * 2. 函数成员会被声明为函数重载
 *  2.1 函数重载需要注意函数的声明顺序，因为编译器会按照顺序进行匹配
 *  2.2 在接口内部，声明顺序按照代码书写顺序；接口之间，后面书写的会排在前面
 *  2.3 如果函数的参数是一个字符串字面量时，那么这个声明会被提升到整个函数声明的最顶端
 */
interface A {
  x: number;
  y: number;
  f (bar: number): number; // 5
  f (bar: 'hello'): string; // 2
}
interface A {
  y: number;
  f (bar: string): string; // 3
  f (bar: number[]): number[]; // 4
  f (bar: 'typescript'): string; // 1
}
let ia: A = {
  x: 1,
  y: 2,
  f (bar: any) {
    return bar
  }
}

/**
 * 注意：
 * 1. 命名空间不能导出同名的成员
 * 2. 命名空间声明不能位于与之合并的类或函数前
 * 3. 命名空间与枚举合并时没有顺序之分
 */

// 命名空间之间的合并

// 命名空间和函数的合并
function Lib() {}
namespace Lib {
  export const version = '1.2.3' // 相当于给函数添加了一个属性
}

console.log(Lib.version)

// 命名空间和类的合并
class C {}
namespace C {
  // 相当于给类添加了静态属性
  export function say() {
    console.log('namespace merge class')
  }
}
C.say()

// 命名空间和枚举的合并
enum Colors {
  Red,
  Green,
  Blue
}
namespace Colors {
  // 相当于给枚举添加了属性
  export function mix() {}
  export const test = 'namespace merge enum'
}
console.log(Colors)
