// 基本类型
let str: string | undefined | null = 'str'
let num: number = 1
let bool: boolean = false

// 数组
let arr1: number[] = [1, 2]
let arr2: Array<number | string> = [1, 2, '3']

// 元组
let tuple: [number, string] = [0, '1']
// tuple.push(2)
// console.log(tuple)
// console.log(tuple[2])

// 函数
let add1 = (x: number, y: number): number => x + y
let add2: (x: number, y: number) => number
add2 = (a, b) => a + b

// 对象
let obj1: object = { x: 1, y: '2' }
// obj1.x = '1'
let obj2: { x: number, y: string } = { x: 1, y: '2' }
// obj2.x = '1'

// symbol
let symbol1: symbol = Symbol()
let symbol2 = Symbol()
console.log(symbol1 === symbol2)

// undefined, null
let un: undefined = undefined
let nu: null = null
str = undefined
str = null

// void
let noReturn1 = () => {}
let noReturn2 = (): void => {}
let noReturn3: () => {}

// any
let any1
let any2: any

// never
let error = () => {
  throw new Error('this is an error')
}
let endless = () => {
  while(true) {}
}
