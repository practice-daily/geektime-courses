# 工程引用
## build构建
- 解决输出目录结构问题
- 解决单个工程构建问题
- 通过增量编译提升编译速度

```sh
- tsc -b src/client --verbose # 构建客户端
- tsc -b src/server --verbose # 构建服务端
- tsc -b test --verbose # 构建测试
- tsc -b test --clean # 清空构建文件
```
