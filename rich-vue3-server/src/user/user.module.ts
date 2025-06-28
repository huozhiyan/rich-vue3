import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Logs } from "../logs/logs.entity"; // 导入日志实体

@Module({
  imports: [TypeOrmModule.forFeature([User, Logs])], // 注册 User、Logs 实体
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
