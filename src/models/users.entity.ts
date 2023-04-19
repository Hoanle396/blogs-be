import { Role } from '@/enums/role'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Blogs } from './blogs.entity'
import { Comments } from './comments.entity'

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  fullname: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  password: string

  @Column({
    nullable: true,
    default: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  })
  avatar: string

  @Column({ type: 'enum', enum: Role, default: Role.User })
  roles: Role

  @Column({ default: false })
  isVerify: boolean

  @OneToMany(() => Blogs, blog => blog.createdBy)
  blogs: Blogs[]

  @OneToMany(() => Comments, cmt => cmt.blogs)
  comments: Comments[]

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
