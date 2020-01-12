# 基于jest的TypeScript单元测试

## ts-jest 会有类型检查
- npm i -D jest @types/jest ts-jest
- npx ts-jest config:init (生成jest配置文件)

## babel-jest 没有类型检查
- npm i -D jest @types/jest babel-jest
- 类型检查可以借助tsc（参照ts-babel项目）
