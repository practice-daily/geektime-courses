interface List {
  readonly id: number; // 只读属性
  name: string;
  age?: number; // 可选属性
  [x: string]: any; // 索引签名
}
interface Result {
  // data: List[]
  data: Array<List>
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.name)
    if (value.age) {
      console.log(value.age)
    }
    // value.id++
  })
}
let result = {
  data: [
    { id: 1, name: 'A', age: 18 },
    { id: 2, name: 'B', sex: 'male' },
  ]
}
render(result)

// 使用类型断言绕开检查
render({
  data: [
    { id: 1, name: 'A', sex: 'male' },
    { id: 2, name: 'B' },
  ]
} as Result)

render(<Result>{
  data: [
    { id: 1, name: 'A', sex: 'male' },
    { id: 2, name: 'B' },
  ]
})

// 索引签名(当不确定接口中属性个数时可以使用索引签名，索引签名包括字符串索引签名和数字索引签名)
interface NumSign {
  // 数字索引签名
  [index: number]: string;
}
let chars: NumSign = ['A', 'B']

interface StrSign {
  /**
   * 字符串索引签名，含义：
   * 1. StrSign 可以有任意多个属性
   * 2. StrSign 可以用字符串索引，即 StrSign['xxx']，或 StrSign.xxx（也可以用数字索引 StrSign[number]，因为数字会被转换成字符串)
   * 
   * 字符串索引签名一般用来定义一个成员数量不确定的对象类型接口
   */
  [x: string]: string;
  // y: number;
}
let names: StrSign = {
  hello: '你好',
  world: '世界'
}

/**
 * 可以同时使用两种类型的索引签名，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
 * 因为js会发生类型转换，数字索引会转化为字符串索引，所以 数字索引的返回值类型 必须是 字符串索引签名返回值类型 的子类型。
 */
interface Names1 {
  [x: string]: string;
  [y: number]: string;
}
interface Names2 {
  [x: string]: any;
  [y: number]: string;
}
let name1: Names1 = {
  '1': '2',
  3: '4'
}
let name2: Names2 = {
  'a': true,
  1: '2'
}


// interface Person {
//   readonly id: number; // 只读属性
//   name: string; // 确定属性
//   age?: number; // 可选属性
//   [propName: string]: string; // 字符串索引
//   [index: number]: string; // 数字索引,类似数组
//   (name: string, age: number): void; // 函数
//   getName(id: number): string; // 方法
//   new(name: string, age: number): Person; // 构造函数
// }
