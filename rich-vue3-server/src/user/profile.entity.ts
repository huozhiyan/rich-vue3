import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity"; // 导入用户实体

/**
 * 个人资料实体类，映射到数据库中的 `Profile` 表
 */
@Entity()
export class Profile {
  /**
   * 主键字段，自动生成唯一 ID
   */
  @PrimaryGeneratedColumn()
  id: number; // 主键

  /**
   * 性别字段
   * - 使用数字表示性别（如 0 表示未知，1 表示男性，2 表示女性）
   */
  @Column()
  gender: number;

  /**
   * 头像字段
   * - 存储用户头像的 URL 或路径
   */
  @Column()
  photo: string;

  /**
   * 地址字段
   * - 存储用户的居住地址
   */
  @Column()
  address: string;

  /**
   * 一对一关系：
   * - 一个用户对应一个个人资料
   * - `user` 字段表示与 `User` 实体的关联
   * - 使用 `@JoinColumn` 指定外键关系
   */
  @OneToOne(() => User) // 定义一对一关系
  @JoinColumn() // 指定外键关联，外键会存储在 `Profile` 表中
  user: User; // 关联的用户实体
}
