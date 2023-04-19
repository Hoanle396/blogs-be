import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Permissions } from './permission.entity'
import { Roles } from './role.entity'

@Entity()
export class RolePermissions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Roles, role => role.roles)
  role: Roles

  @ManyToOne(() => Permissions, per => per.id)
  permission: Permissions

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
