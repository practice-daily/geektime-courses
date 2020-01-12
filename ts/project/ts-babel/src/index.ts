class A {
  a: number = 1
}

let { x1, y1, ...z } = { x1: 1, y1: true, a: 2, b: 3 }
let n = { x1, y1, ...z }
// n = 1


// babel目前不支持以下4种语法

// 1. 命名空间
// SyntaxError: Namespace not marked type-only declare. Non-declarative namespaces are only supported experimentally in Babel. To enable and review caveats see: https://babeljs.io/docs/en/babel-plugin-transform-typescript
// namespace NTest {
//   export const a = 2
// }

// 2. 类型断言(实测发现babel可以支持)
// let s = {} as A
let s = <A>{}
s.a = 2

// 3. 常量枚举
// SyntaxError: 'const' enums are not supported.
// const enum E { A }

// 4. export = 进行默认导出
// SyntaxError: `export =` is not supported by @babel/plugin-transform-typescript Please consider using `export <value>;`.
// export = s

