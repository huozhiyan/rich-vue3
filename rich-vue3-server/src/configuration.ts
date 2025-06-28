import { readFileSync } from "fs"; // 用于同步读取文件内容
import * as yaml from "js-yaml"; // 用于解析 YAML 文件
import { join } from "path"; // 用于处理文件路径
import * as _ from "lodash"; // 用于对象的深度合并等操作

// 定义通用配置文件的文件名
const YAML_COMMON_CONFIG_FILENAME = "config.yml";

// 构建通用配置文件的路径
const filePath = join(__dirname, "../config", YAML_COMMON_CONFIG_FILENAME);

// 根据当前环境（NODE_ENV）构建环境配置文件的路径，默认为 "development"
const envPath = join(
  __dirname,
  "../config",
  `config.${process.env.NODE_ENV || "development"}.yml`
);

// 加载通用配置文件内容
const commonConfig = yaml.load(readFileSync(filePath, "utf8"));

// 加载环境配置文件内容
const envConfig = yaml.load(readFileSync(envPath, "utf8"));

// 导出一个函数，返回合并后的配置对象
export default () => {
  // 使用 lodash 的 merge 方法，将通用配置和环境配置深度合并
  return _.merge(commonConfig, envConfig);
};
