// 一、交叉类型 & (适合对象的混入)
interface DogInterface {
  run(): void
}
interface CatInterface {
  jump(): void
}
let pet: DogInterface & CatInterface = {
  run() {},
  jump() {}
}

// 二、联合类型
let a: number | string = 'a'

// 字面量类型: 限制取值范围
let b: 'b' | 'bb' | 'bbb'
let c: 1 | 2 | 3

// 对象的联合类型
class Dog1 implements DogInterface {
  run() {}
  eat() {}
}
class Cat1 implements CatInterface {
  jump() {}
  eat() {}
}
enum Master { Boy, Girl }
function getPet(master: Master) {
  let pet = master === Master.Boy ? new Dog1() : new Cat1()
  pet.eat() // 只能访问联合类型pet的共有成员
  return pet
}

// 可辨识联合类型：有公共属性(结合字面量类型)
interface Square {
  kind: 'square'
  size: number
}
interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}
interface Circle {
  kind: 'circle'
  radius: number
}
type Shape = Square | Rectangle | Circle
function area(s: Shape) {
  switch(s.kind) {
    case 'square':
      return s.size ** 2
    case 'rectangle':
      return s.width * s.height
    case 'circle':
      return Math.PI * s.radius ** 2
    default:
      // 使用never类型，编译器用它来进行完整性检查
      return ((e: never) => {throw new Error(e)})(s)
  }
}
console.log(area({kind: 'square', size: 100}))
console.log(area({kind: 'circle', radius: 1}))
