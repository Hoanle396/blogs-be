import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Blogs } from './blogs.entity'
import { Users } from './users.entity'

@Entity()
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  text: string

  @ManyToOne(() => Blogs, blogs => blogs.comments)
  blogs: Blogs

  @ManyToOne(() => Users, users => users.id)
  createBy: Users

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
