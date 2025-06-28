import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
  Post,
} from "@nestjs/common"; // 导入控制器和 HTTP 请求装饰器
import { UserService } from "./user.service"; // 导入用户服务
import { User } from "./user.entity"; // 导入用户实体
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

/**
 * 用户控制器类
 * - 定义与用户相关的 HTTP 路由和处理逻辑
 * - 使用 `UserService` 提供的业务逻辑操作用户数据
 */
@Controller("user") // 定义控制器的路由前缀为 "user"
export class UserController {
  // private logger = new Logger(UserController.name); // 创建 Logger 实例，用于记录日志
  /**
   * 构造函数
   * - 注入用户服务
   * @param userService 用户服务
   */
  constructor(
    private userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {
    this.logger.log("UserController initialized"); // 控制器初始化时记录日志
  }

  @Get("/:id")
  getUser(): any {
    return "hello world"; // 示例方法，返回简单字符串
  }

  /**
   * 获取所有用户
   * - 路由：GET /user/getAll
   * @returns 所有用户的列表
   */
  @Get("getAll")
  getUsers(): any {
    const user = { isAdmin: false };
    if (!user.isAdmin) {
      throw new HttpException("User is not admin", HttpStatus.FORBIDDEN);
    }
    this.logger.log("Fetching all users"); // 记录获取所有用户的日志
    this.logger.warn("Fetching all users");
    this.logger.error("Fetching all users");
    return this.userService.findAll(); // 调用服务层方法查询所有用户
  }

  /**
   * 获取单个用户
   * - 路由：GET /user/getOne
   * - 示例中固定查询用户名为 "test" 的用户
   * @returns 匹配的用户对象或 null
   */
  @Get("getOne")
  getOneUser(): any {
    const username = "test"; // 示例用户名
    return this.userService.find(username); // 调用服务层方法查询用户
  }

  /**
   * 添加新用户
   * - 路由：POST /user/add
   * - 示例中固定添加用户名为 "test" 的用户
   * @returns 保存后的用户对象
   */
  @Post("add")
  addUser(): any {
    const user = { username: "test", password: "123456" } as User; // 示例用户数据
    return this.userService.create(user); // 调用服务层方法创建用户
  }

  /**
   * 更新用户信息
   * - 路由：POST /user/update
   * - 示例中固定更新 ID 为 1 的用户
   * @returns 更新结果
   */
  @Post("update")
  updateUser(): any {
    const id = 1; // 示例用户 ID
    const user = { username: "zahuopu", password: "654321" } as User; // 示例更新数据
    return this.userService.update(id, user); // 调用服务层方法更新用户
  }

  /**
   * 删除用户
   * - 路由：GET /user/remove
   * - 示例中固定删除 ID 为 1 的用户
   * @returns 删除结果
   */
  @Get("remove")
  removeUser(): any {
    const id = 1; // 示例用户 ID
    return this.userService.remove(id); // 调用服务层方法删除用户
  }

  /**
   * 获取用户的个人资料
   * - 路由：GET /user/profile
   * @returns 用户的个人资料
   */
  @Get("profile")
  getUserProfile(): any {
    return this.userService.findProfile(2); // 调用服务层方法查询用户个人资料
  }

  /**
   * 获取用户的日志
   * @returns 用户的日志
   * - 路由：GET /user/logs
   * @description 获取用户的日志信息
   */
  @Get("logs")
  getUserLogs(): any {
    return this.userService.findUserLogs(2); // 调用服务层方法查询用户日志
  }

  /*
   * 获取用户的日志
   * @returns 用户的日志
   * - 路由：GET /user/logsByGroup
   * @description 获取用户的日志信息
   */
  @Get("logsByGroup")
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2); // 调用服务层方法查询用户日志按组

    // 处理查询结果
    return res.map((o) => ({
      result: o.result,
      count: o.count,
    }));
  }
}
