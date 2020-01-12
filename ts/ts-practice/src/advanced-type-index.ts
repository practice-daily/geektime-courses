// 索引类型
let obj = {
  a: 1,
  b: 2,
  c: 3
}
function getValues1(obj: any, keys: string[]) {
  return keys.map(k => obj[k])
}
console.log(getValues1(obj, ['a', 'b']))
console.log(getValues1(obj, ['d', 'e'])) // ts不会检查

// keyof T，索引类型查询操作符：对于任何类型T，keyof T的结果为T上已知的公共属性名的字面量的联合类型。
interface Obj {
  a: number;
  b: string;
}
let aa: keyof Obj

// T[K]，索引访问操作符：表示对象T的属性K所代表的类型
let aaa: Obj['a']

// 改造目的：keys的成员是obj的属性
function getValues2<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(k => obj[k])
}
console.log(getValues2(obj, ['a', 'b']))
// console.log(getValues2(obj, ['d', 'e'])) // ts会检查进行报错提示
