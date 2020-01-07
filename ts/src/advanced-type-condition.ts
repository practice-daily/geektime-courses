// T extends U ? X : Y
// 解释：如果T可以被赋值为U，那么返回X否则返回Y
type TypeName<T> = 
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  T extends undefined ? 'undefined' :
  T extends Function ? 'function' :
  'object';

type T1 = TypeName<string>   // type T1 = "string"
type T2 = TypeName<null>     // type T2 = "object"
type T3 = TypeName<number[]> // type T3 = "object"


// (A | B) extends U ? X : Y
// 拆解为：A extends U ? X : Y | B extends U ? X : Y
type T4 = TypeName<number | string[]> // type T4 = "number" | "object"

// 实现过滤
type Diff<T, U> = T extends U ? never : T
type T5 = Diff<'a' | 'b' | 'c', 'a' | 'd'> // type T5 = "b" | "c"
// Diff<'a', 'a' | 'd'> | Diff<'b', 'a' | 'd'> | Diff<'c', 'a' | 'd'>
//         never        |          'b'         |           'c'
// 'b' | 'c'

// 过滤掉undefined/null
type NotNull<T> = Diff<T, undefined | null>
type T6 = NotNull<string | number | boolean | undefined | null> // type T6 = string | number | boolean

/**
 * 官方内置的：
 * Exclude<T, U>
 * NonNullable<T>
 * Extract<T, U>
 */
type T7 = Exclude<'a' | 'b' | 'c', 'a' | 'd'> // type T7 = "b" | "c"
type T8 = NonNullable<string | number | boolean | undefined | null> // type T8 = string | number | boolean

// ReturnType<T> 获取函数返回值类型
type T9 = ReturnType<() => string> // type T9 = string
