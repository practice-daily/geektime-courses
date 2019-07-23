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
