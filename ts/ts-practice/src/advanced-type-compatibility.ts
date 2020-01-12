/**
 * 类型兼容性
 * 当一个类型Y可以被赋值给另一个类型X时，我们就可以说类型X兼容类型Y
 * X兼容Y: X(目标类型) = Y(源类型)
 * 口诀：
 *  结构之间：成员少的兼容成员多的
 *  函数之间：参数多的兼容参数少的
 */

// 一、接口兼容性（成员个数少的兼容成员个数多的）
interface X {
  a: any;
  b: any;
}
interface Y {
  a: any;
  b: any;
  c: any;
}
let x: X = { a: 1, b: 2 }
let y: Y = { a: 1, b: 2, c: 3 }
x = y
// y = x // ❌

// 二、函数兼容性
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
  return handler
}

// 1.参数个数（参数个数多的兼容参数个数少的）
let handler1 = (a: number) => {}
hof(handler1)

// 可选参数 剩余参数
let handler2 = (p1: number, p2: number) => {}
let handler3 = (p1?: number, p2?: number) => {}
let handler4 = (...args: number[]) => {}
// 固定参数可以兼容可选参数、剩余参数
handler2 = handler3
handler2 = handler3
// 可选参数不兼容固定参数、剩余参数（可设置 strictFunctionTypes: false 进行关闭）
// handler3 = handler2 // ❌
// handler3 = handler4 // ❌
// 剩余参数可以兼容固定参数、可选参数
handler4 = handler2
handler4 = handler3

// 2.参数类型需要匹配
let handler5 = (a: string) => {}
// hof(handler5) // ❌

interface Print3d {
  x: number;
  y: number;
  z: number;
}
interface Print2d {
  x: number;
  y: number;
}
let p3d = (print: Print3d) => {}
let p2d = (print: Print2d) => {}
p3d = p2d
// p2d = p3d // ❌

// 3.返回值类型：源函数的返回值类型 必须与 目标函数的返回值类型相同，或者是目标函数返回值类型的子类型
let fn1 = () => ({ name: 'hello' })
let fn2 = () => ({ name: 'world', age: 28 })
fn1 = fn2
// fn2 = fn1 // ❌

// 三、枚举兼容性
enum Fruit { Apple, Banana }
enum Color { Red, Green, Blue}
// 枚举与数字相互兼容
let fruit: Fruit.Apple = 9
let number: number = Fruit.Apple
// 枚举间不兼容
// let color: Color.Red = Fruit.Banana // ❌

// 四、类兼容性
// 构造函数、静态方法不参与比较
class A1 {
  constructor(p: number, q: number) {}
  id: number = 2
}
class B1 {
  constructor(p: number) {}
  static s = 1
  id: number = 2
}
let a1 = new A1(1, 2)
let b1 = new B1(3)
a1 = b1
b1 = a1

// 如果含有私有成员变量，只有父子类间可以兼容
class A2 {
  constructor(p: number, q: number) {}
  id: number = 2
  private name: string = ''
}
class B2 {
  constructor(p: number) {}
  static s = 1
  id: number = 2
  private name: string = ''
}
class A2Sub extends A2 {}

let a2 = new A2(1, 2)
let b2 = new B2(3)
let a2sub = new A2Sub(3, 4)
// a2 = b2 // ❌
// b2 = a2 // ❌
a2 = a2sub
a2sub = a2

// 五、泛型兼容性
interface Empty<T> {}
let empty1: Empty<number> = {}
let empty2: Empty<string> = {}
empty1 = empty2
empty2 = empty1

interface IValue<T> {
  value: T
}
let value1: IValue<number> = { value: 1 }
let value2: IValue<string> = { value: '2' }
// value1 = value2 // ❌
// value2 = value1 // ❌

// function myLog1<T>(x: T):T {
//   return x
// }
// function myLog2<U>(x: U): U {
//   return x
// }
let myLog1 = <T>(x: T):T => {
  return x
}
let myLog2 = <U>(x: U): U => {
  return x
}
myLog1 = myLog2
