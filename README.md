<div align="center">
  <img alt="Rich-Vue3 Logo" width="320" height="120" src="../rich-vue3/rich-vue3-webapp/src/assets/layouts/logo-text-1.png">
  <h1>Rich-Vue3</h1>
  <span><a href="./README.zh-CN.md">中文</a></span>
</div>

## ⚡ 简介

rich-vue3 是一个免费开源的致力于提供一系列 **有趣且实用** 功能的解决方案。

前端基于 Vue3、TypeScript、Element Plus、Pinia 和 Vite 等技术。

后端基于 Spring、Spring Boot、SpringCloud 等技术。

数据库基于 MySQL、MongoDB、Redis 等。

"站在巨人的肩膀上"。

基于不重复造轮子的理念，本项目前端基于 [v3-admin-vite](https://github.com/un-pany/v3-admin-vite) 进行开发"。

---
**作者想说：**

虽然主流的框架（如 Vue、React、Spring全家桶等）一定程度上简化了我们开发的难度，为我们提供了很多便利。

但是我们在跟进前沿技术使用的同时，也要 **注重原生和基础**，毕竟万变不离其宗，原生才是真正的根基！

---

## 📚 文档

- 中文文档：[链接](https://zahuopu.blog.csdn.net//category_12676615.html)
- 手摸手教程：[链接](https://blog.csdn.net/qq_45902692/category_12676615.html)

## 📺 在线预览

| 位置         | 账号            | 链接                                            |
| ------------ | --------------- | ----------------------------------------------- |
| github-pages | admin 或 editor | [链接](https://huozhiyan.github.io/) |

## ❤️ 用爱发电

- **完全免费**：但欢迎且希望你点一个 star （这是我们持续维护的核心动力）！
- **非常简洁**：没有复杂的封装，没有复杂的类型体操，开箱即用
- **详细的注释**：各个功能都写有尽可能详细的注释，并且配备 [手膜手教程](https://blog.csdn.net/qq_45902692/category_12676615.html)
- **格式规整**: 规范代码风格、规范命名风格、规范注释风格，对标企业级要求

## 特性

- **Vue3**：采用 Vue3 + script setup 最新的 Vue3 组合式 API
- **Element Plus**：Element UI 的 Vue3 版本
- **Pinia**: 传说中的 Vuex5
- **Vite**：真的很快
- **Vue Router**：路由路由
- **TypeScript**：JavaScript 语言的超集
- **PNPM**：更快速的，节省磁盘空间的包管理工具
- **Scss**：和 Element Plus 保持一致
- **CSS 变量**：主要控制项目的布局和颜色
- **ESlint**：代码校验
- **Prettier**：代码格式化
- **Axios**：发送网络请求（已封装好）
- **UnoCSS**：具有高性能且极具灵活性的即时原子化 CSS 引擎
- **兼容移动端**: 布局兼容移动端页面分辨率
---
- **Spring**: 控制反转IOC、依赖注入DI、面向切面编程AOP，简化 Java 应用程序的开发
- **Spring Boot**: 简化 Spring 应用的初始搭建和开发过程。
- **Spring Cloud**: 提供构建微服务架构和分布式系统。
---
- **MySQL**: 关系型数据库，支持各种数据类型，提供了高效的数据存储和检索机制。
- **MongoDB**: 基于分布式文件存储的数据库，旨在为WEB应用提供可扩展的高性能数据存储解决方案。
- **Redis**: 内存中的数据结构存储系统，用于数据库、缓存和消息中间件。

## 基础功能

- **用户管理**：登录、登出演示
- **权限管理**：页面级权限（动态路由）、按钮级权限（指令权限、权限函数）、路由守卫
- **多环境**：开发环境（development）、预发布环境（staging）、正式环境（production）
- **多主题**：普通、黑暗、深蓝, 三种主题模式
- **多布局**：左侧、顶部、混合, 三种布局模式
- **错误页面**: 403、404
- **Dashboard**：根据不同用户显示不同的 Dashboard 页面
- **其他内置功能**：SVG、动态侧边栏、动态面包屑、标签页快捷导航、Screenfull 全屏、自适应收缩侧边栏、Hook（Composables）

## 扩展功能（持续更新中...）
- **Canvas视频录制**：在 Canvas 画布上实现媒体流的录制和输出
- **FFmpeg处理视频**：处理在 Canvas 画布中生成的视频流，进行分辨率、帧率和视频格式等的设置
- 其余功能在规划开发中，敬请期待...

## 🚀 开发

```bash
# 配置
1. node 版本 18.x 或 20+
2. npm 版本 8.x 或最新版

# 克隆项目
git clone https://github.com/huozhiyan/rich-vue3.git

# 进入项目目录
cd rich-vue3

# 安装依赖
npm i

# 启动服务
npm run dev
```


## Git 提交规范参考

- `feat` 增加新的业务功能
- `fix` 修复业务问题/BUG
- `perf` 优化性能
- `style` 更改代码风格, 不影响运行结果
- `refactor` 重构代码
- `revert` 撤销更改
- `test` 测试相关, 不涉及业务代码的更改
- `docs` 文档和注释相关
- `chore` 更新依赖/修改脚手架配置等琐事
- `workflow` 工作流改进
- `ci` 持续集成相关
- `types` 类型定义文件更改
- `wip` 开发中

## 项目预览图

![video.png](../rich-vue3/rich-vue3-webapp/src/assets/docs/video.png)
![preview1.png](../rich-vue3/rich-vue3-webapp/src/assets/docs/preview.png)

## 💕 贡献者

感谢所有的贡献者！

<a href="https://github.com/huozhiyan/rich-vue3/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=huozhiyan/rich-vue3" />
</a>

## 💕 感谢 Star

小项目获取 star 不易，如果你喜欢这个项目的话，欢迎支持一个 star！这是作者持续维护的唯一动力（小声：毕竟是免费的）

## ☕ Donate

如果你觉得本项目对你提供了一些帮助，欢迎打赏一杯咖啡~~

<img alt="Rich-Vue3 Logo" width="300" height="400" src="../rich-vue3/rich-vue3-webapp/src/assets/docs/donate.png">
<img alt="Rich-Vue3 Logo" width="300" height="400" src="../rich-vue3/rich-vue3-webapp/src/assets/docs/donate2.png">

## 提供答疑和行业交流的群

QQ 群：642562939

![qq.png](../rich-vue3/rich-vue3-webapp/src/assets/docs/qq.png)

## 📄 License

[MIT](./LICENSE)

Copyright (c) 2024-present [huozhiyan](https://github.com/huozhiyan)
