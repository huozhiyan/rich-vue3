import { NestFactory } from "@nestjs/core"; // 导入 NestFactory，用于创建 Nest 应用实例
import { AppModule } from "./app.module"; // 导入应用的根模块
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

/**
 * 应用程序的入口文件
 * - 使用 NestFactory 创建应用实例
 * - 配置全局设置并启动应用
 */
async function bootstrap() {
  // 创建应用实例，并可选配置日志级别
  const app = await NestFactory.create(AppModule, {
    // 日志级别配置（可选）
    // logger: ["error", "warn"], // 仅记录错误和警告日志
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)); // 使用 Winston 日志记录器
  // 设置全局路由前缀
  app.setGlobalPrefix("api"); // 所有路由将以 "api" 为前缀，例如 /api/user
  const port = 3000; // 定义应用监听的端口号

  // 启动应用并监听指定端口
  await app.listen(port);
}

// 启动应用
bootstrap();
