import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Users } from './users.entity'
import { Comments } from './comments.entity'

@Entity()
export class Blogs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  slugs: string

  @Column({
    nullable: true
  })
  image: string

  @Column({ nullable: true })
  description: string

  @ManyToOne(() => Users, user => user.blogs)
  createdBy: Users

  @OneToMany(() => Comments, cmt => cmt.blogs)
  comments: Comments[]

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
