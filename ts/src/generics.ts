/**
 * 泛型：不预先确定的数据类型，具体的类型在使用的时候才能确定
 * 泛型的好处:
 * 1. 函数和类可以轻松支持多种类型，增强程序的可扩展性
 * 2. 不必写多条函数重载，冗长的联合类型声明，增强代码的可读性
 * 3. 灵活控制类型之间的约束
 */

// function log(value: any): any {
//   return value
// }

// 泛型函数
function log<T>(value: T): T {
  console.log(value)
  return value
}
log<string[]>(['1', '2', '3'])
// 利用ts的类型推断进行简写，省略类型
log(['1', '2', 3])

// 使用泛型定义函数类型
// 1. 类型别名
// 1.1
type Log1 = <T>(value: T) => T
let log1: Log1 = log
log1([1])
log1(['1'])
// 1.2
type Log2<T> = (value: T) => T
let log2: Log2<string> = log
log2('2')

// 2. 泛型接口
// 2.1 （与类型别名1.1定义等价，使用时无需指定类型）
interface Log3 {
  <T>(value: T): T
}
let log3: Log3 = log
log3(['3'])
log3('3')
// 2.2 （与类型别名1.2定义等价，使用时必须指定类型）
// 接口的所有成员都受泛型变量约束，这种情况下实现的时候必须指定一种约束类型
interface Log4<T> {
  (value: T): T
}
let log4: Log4<number> = log
log4(4)
// 2.3 接口定义时指定泛型的默认类型
interface Log5<T = number> {
  (value: T): T
}
let log51: Log5 = log
log51(51)
let log52: Log5<string> = log
log52('52')


// 泛型类(类的静态成员不能使用泛型)
class Log6<T> {
  run(value: T) {
    console.log(value)
    return value
  }
  // static v: T = '1.0'
}
let log61 = new Log6()
log61.run(61)
log61.run('61')
let log62 = new Log6<number>()
log62.run(62)

// 泛型约束
interface Length {
  length: number
}
function log7<T extends Length>(value: T) {
  console.log(value, value.length)
  return value
}
log7([1])
log7('12')
log7({length: 3})