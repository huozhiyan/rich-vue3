import { Logs } from "../logs/logs.entity"; // 导入日志实体
import { Roles } from "../roles/roles.entity"; // 导入角色实体
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"; // 从 TypeORM 导入装饰器
import { Profile } from "./profile.entity";

/**
 * 用户实体类，映射到数据库中的 `User` 表
 */
@Entity()
export class User {
  /**
   * 主键字段，自动生成唯一 ID
   */
  @PrimaryGeneratedColumn()
  id: number; // 主键

  /**
   * 用户名字段
   */
  @Column()
  username: string;

  /**
   * 密码字段
   */
  @Column()
  password: string;

  /**
   * 一对多关系：
   * - 一个用户可以有多个日志
   * - `Logs` 表中的 `user` 字段表示反向关系
   */
  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[]; // 一对多关系，一个用户对应多个日志

  /**
   * 多对多关系：
   * - 一个用户可以拥有多个角色
   * - 使用 `user_roles` 作为连接表
   * - `Roles` 表中的 `users` 字段表示反向关系
   */
  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable({ name: "user_roles" }) // 指定连接表的名称为 `user_roles`
  roles: Roles[]; // 多对多关系，一个用户可能拥有多个角色

  /**
   * 一对一关系：
   * - 一个用户对应一个个人资料
   * - `Profile` 表中的 `user` 字段表示反向关系
   */
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile; // 一对一关系，一个用户对应一个个人资料
}
