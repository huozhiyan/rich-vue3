import { Injectable, Post } from "@nestjs/common"; // 导入 Injectable 装饰器，用于标记服务类
import { InjectRepository } from "@nestjs/typeorm"; // 用于注入 TypeORM 仓库
import { Repository } from "typeorm"; // 导入 TypeORM 的 Repository 类
import { User } from "./user.entity"; // 导入用户实体
import { Logs } from "../logs/logs.entity"; // 导入日志实体

/**
 * 用户服务类
 * - 提供用户相关的业务逻辑
 * - 使用 TypeORM 操作数据库中的 `User` 表
 */
@Injectable()
export class UserService {
  /**
   * 构造函数
   * - 注入用户实体的 TypeORM 仓库
   * @param userRepository 用户实体的仓库
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>
  ) {}

  /**
   * 查询所有用户
   * @returns 所有用户的列表
   */
  findAll() {
    return this.userRepository.find(); // 使用 TypeORM 的 `find` 方法查询所有用户
  }

  /**
   * 根据用户名查询用户
   * @param username 用户名
   * @returns 匹配的用户对象或 null
   */
  find(username: string) {
    return this.userRepository.findOne({ where: { username } }); // 根据条件查询单个用户
  }

  /**
   * 根据 ID 查询用户
   * @param id 用户 ID
   * @returns 匹配的用户对象或 null
   */
  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } }); // 根据 ID 查询单个用户
  }

  /**
   * 创建新用户
   * @param user 用户对象
   * @returns 保存后的用户对象
   */
  async create(user: User) {
    const newUser = await this.userRepository.create(user); // 创建用户实例
    return this.userRepository.save(newUser); // 保存用户到数据库
  }

  /**
   * 更新用户信息
   * @param id 用户 ID
   * @param user 部分用户信息
   * @returns 更新结果
   */
  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user); // 根据 ID 更新用户信息
  }

  /**
   * 删除用户
   * @param id 用户 ID
   * @returns 删除结果
   */
  remove(id: number) {
    return this.userRepository.delete(id); // 根据 ID 删除用户
  }

  /**
   * 查询用户的个人资料
   * @param id 用户 ID
   * @param profile 个人资料对象
   * @returns 保存后的个人资料对象
   */
  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true, // 关联查询个人资料
      },
    });
  }

  /**
   * 查询用户的日志
   * @param id 用户 ID
   * @returns 用户的日志列表
   */
  async findUserLogs(id: number) {
    const user = await this.findOne(id);
    return this.logsRepository.find({
      where: { user }, // 根据用户 ID 查询日志
      relations: {
        user: true, // 关联查询用户
      },
    });
  }

  /**
   * 查询用户的日志
   * @param id 用户 ID
   * @returns 用户的日志
   */
  async findLogsByGroup(id: number) {
    return this.logsRepository
      .createQueryBuilder("logs") // 创建查询构造器，指定查询的表别名为 "logs"
      .select("logs.result", "result") // 选择日志的结果字段，并将其别名为 "result"
      .addSelect('Count("logs.result")', "count") // 统计每种结果的数量，并将其别名为 "count"
      .leftJoinAndSelect("logs.user", "user") // 左连接 "logs" 表中的 "user" 字段，指定别名为 "user"
      .where("user.id = :id", { id }) // 添加条件，筛选出指定用户 ID 的日志
      .groupBy("logs.result") // 按 "logs.result" 字段分组
      .orderBy("result", "DESC") // 按 "result" 字段降序排序
      .offset(2) // 跳过前两个分组结果
      .addOrderBy("count", "DESC") // 按 "count" 字段降序排序
      .limit(3) // 限制返回的分组数量为 3
      .getRawMany(); // 执行查询并返回原始结果数组
  }
}
