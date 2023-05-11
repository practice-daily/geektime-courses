[Node.js net 建立多路复用的 RPC 通道](https://gitee.com/geektime-geekbang/geek-nodejs/tree/master/section25)

## RPC
Remote Procedure Call(远程过程调用)

## TCP 通信方式
- 单工通信
- 半双工通信
- 全双工通信

## 全双工的通信通道搭建
- 关键在于应用层协议需要有标记包号的字段
- 处理以下情况，需要有标记包长的字段
  - 粘包
  - 不完整包
- 错误处理
