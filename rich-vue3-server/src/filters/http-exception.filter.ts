import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from "@nestjs/common"; // 导入相关装饰器和类型

/**
 * 自定义 HTTP 异常过滤器
 * - 捕获所有 `HttpException` 类型的异常
 * - 记录异常日志并返回标准化的响应
 */
@Catch(HttpException) // 捕获 HttpException 类型的异常
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 构造函数
   * - 注入日志服务，用于记录异常日志
   * @param logger 日志服务
   */
  constructor(private logger: LoggerService) {}

  /**
   * 异常捕获处理方法
   * - 捕获异常并返回标准化的响应
   * @param exception 捕获的异常对象
   * @param host 参数上下文
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取 HTTP 上下文
    const response = ctx.getResponse(); // 获取响应对象
    const request = ctx.getRequest(); // 获取请求对象
    const status = exception.getStatus(); // 获取异常状态码

    // 使用日志服务记录错误信息
    this.logger.error(exception.message, exception.stack);

    // 返回标准化的 JSON 响应
    response.status(status).json({
      code: status, // HTTP 状态码
      timestamp: new Date().toISOString(), // 当前时间戳
      path: request.url, // 请求的 URL
      method: request.method, // 请求的方法（GET、POST 等）
      message: exception.message || exception.name, // 异常信息
    });
  }
}
