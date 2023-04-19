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
import { RolePermissions } from './role-permission.entity'

@Entity()
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: Role, default: Role.User })
  name: Role

  @OneToMany(() => RolePermissions, rp => rp.role)
  roles: RolePermissions[]

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
