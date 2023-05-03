# 模块规范

## node 模块加载过程
1. 加载模块: `require('<module>');` 
2. 加载模块会运行模块代码
3. 模块导入支持绝对路径和相对路径, 相对路径永远是该文件对应的路径开始
4. 加载模块建议都带上后缀
5. 加载时, 有两种情况:
  - a. `<module>` 是路径名, 如: `./index2` , 如果没值指定后缀名, 那么会按下面顺序一次加载, 直到抛出异常 MODULE_NOT_FOUND
    - ① `.js`
    - ② `.json`
    - ③ `.node`
    - ④ `<module>` 文件夹 -> `package.json` 文件 ->  `main` 字段(入口文件) -> `index.js` / `index.json` / `index.node`
  - b. `<module>` 不是路径, 直接就是一个模块名称, 如: `http`
    - ① 先在核心模块查找, 是否有和给定名字一样的模块
    - ② 如果核心模块没有, 那就认为是第三方模块
    - ③ 在当前 js 文件所在目录找 `node_modules` 文件夹, 如果没有, 会去上一级目录找, 以此类推, 直到磁盘根目录停止查找, 若还找不到, 则抛出异常(PS: 这个查找目录顺序可以打印 `process.mainModule['paths']` 进行查看:  `console.log(process.mainModule['paths']`)
    - ④ 如果在某一级 `node_modules` 文件夹下找到相应模块, 则进行加载
