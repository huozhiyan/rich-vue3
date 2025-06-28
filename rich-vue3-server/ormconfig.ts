import { DataSource, DataSourceOptions } from "typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { ConfigEnum } from "./src/enum/config.const";

// 通过环境变量读取不同的.env文件
function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {};
}
// 通过 dotenv 来解析不同的配置
function buildConnectionOptions() {
  const defaultConfig = getEnv(".env");
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || "development"}`);
  const config = { ...defaultConfig, ...envConfig };
  const entitiesDir =
    process.env.NODE_ENV === "test"
      ? [__dirname + "/**/*/entity.ts"]
      : [__dirname + "/**/*.entity{.js,.ts}"];
  return {
    type: config[ConfigEnum.DB_TYPE], // 数据库类型
    host: config[ConfigEnum.DB_HOST], // 数据库主机地址
    port: config[ConfigEnum.DB_PORT], // 数据库端口
    username: config[ConfigEnum.DB_USERNAME], // 数据库用户名
    password: config[ConfigEnum.DB_PASSWORD], // 数据库密码
    database: config[ConfigEnum.DB_DATABASE], // 数据库名称
    entities: entitiesDir, // 实体类数组，自动映射到数据库表
    synchronize: true, // 是否自动同步数据库结构（开发环境建议开启，生产环境建议关闭）
    // logging: ["error", "warn"], // 日志级别（可选，记录错误和警告）
    // logging: process.env.NODE_ENV === "development", // 仅开发环境开启日志
    logging: false, // 是否开启 SQL 日志
  } as TypeOrmModuleOptions;
}

/**
 * TypeORM 连接参数配置
 * - 配置数据库连接信息、实体、同步选项等
 */
export const connectionParams = buildConnectionOptions();

/**
 * 导出 DataSource 实例
 * - 用于 TypeORM CLI 和运行时的数据源管理
 * - 包含迁移和订阅者配置
 */
export default new DataSource({
  ...connectionParams, // 继承上面的数据库连接参数
  migrations: ["src/migrations/**"], // 迁移文件路径
  subscribers: [], // 订阅者（可选）
} as DataSourceOptions);
