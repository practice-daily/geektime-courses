# 编译工具：从ts-loader到babel
- babel >= 7 版本支持typescript，但在编译时不支持类型检查
- 类型检查需要额外安装 @babel/preset-typescript typescript（利用tsc进行类型检查, 在 tsconfig.json 中将 noEmit 设置为 true）

注意：babel目前暂不支持以下语法
- 命名空间
- 常量枚举
- export = 进行默认导出
