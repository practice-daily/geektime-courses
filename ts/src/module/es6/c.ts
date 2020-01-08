// 批量导入
import { a, b, c } from './a'

// 导入接口
import { P } from './a'

// 导入时起别名
import { f1 as F1, f2 as F2 } from './a'

// 导入模块中的所有成员，绑定在 All 上
import * as All from './a'

// 不加{}，导入默认
import myFunction from './a'

console.log(a, b, c)

let p: P = {
  x: 'hello',
  y: 1
}

console.log(All)

myFunction()
