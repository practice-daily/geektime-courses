// 数字枚举 反向映射
enum Role {
  Reporter = 1,
  Developer,
  Mantainer = 2,
  Owner,
  Guest
}
console.log(Role.Reporter)
console.log(Role)

// 字符串枚举
enum Str {
  Success = '成功',
  Fail = '失败'
}

// 异构枚举（数字与字符串混用，容易引起混淆不建议使用）
enum Answer {
  N,
  Y = 'Yes'
}

// 枚举成员
enum Char {
  // 常量成员 constant members (编译时就会确定值)
  a, // 它是枚举的第一个成员且没有初始化器，这种情况下它被赋予值0
  b, // 它不带有初始化器且它之前的枚举成员是一个数字常量。这种情况下，当前枚举成员的值为它上一个枚举成员的值加1
  c = Char.a, // 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
  d = 1 + 2, // 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
  // 计算成员 computed member (运行时才会确定值)
  e = Math.random(),
  f = '123'.length
}

// 常量枚举(在编译阶段会被删除，作用：当我们不需要对象，只需要对象的值时，可以使用常量枚举减少编译时的代码)
const enum Month {
  Jan,
  Feb,
  Mar
}
let month = [Month.Jan, Month.Feb, Month.Mar]
console.log(month)


// 枚举类型: 枚举和枚举成员都可以作为类型单独存在
enum E { a, b }
enum F { a = 0, b = 1 }
enum G { a = 'apple', b = 'banana' }

// 可以把任意的 number 类型赋值给成员都是 number 的枚举类型，取值也可以超出枚举成员的定义
let e: E = 3
let f: F = 3
// 数字枚举类型和数字类型是兼容的，枚举类型之间是不兼容的
// e === f // 两种不同类型的枚举不能进行比较

// 枚举成员类型
// 数字枚举类型与number类型相互兼容，可以相互赋值
let e1: E.a = 1
let e2: E.b = 2
let e3: E.a = 1
// 同一枚举类型的不同成员属于不同类型，但都与number类型兼容，所以它们可以被赋值number，但不能比较（因为类型永远不同，没有比较的必要）
// e1 === e2 // 两个枚举成员的类型不同，不能进行比较
// e1 === e3 // 两个枚举成员的类型相同，可以进行比较


// 字符串枚举的取值只能是枚举成员的类型
let g1: G   = G.a
let g2: G.b = G.b

type TypeKey1 = keyof typeof G
type TypeKey2 = keyof Record<G, string>
type TypeVal1 = `${G}`

function getKeyByVal(value: string) {
  let key: keyof typeof G
  for (key in G) {
    if (value === G[key]) return key
  }
  return null
}