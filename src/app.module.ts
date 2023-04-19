import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './models/users.entity'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { Permissions } from './models/permissions/permission.entity'
import { RolePermissions } from './models/permissions/role-permission.entity'
import { Roles } from './models/permissions/role.entity'
import { Blogs } from './models/blogs.entity'
import { Comments } from './models/comments.entity'
import { BlogsModule } from './blogs/blogs.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'postgre',
      password: process.env.DATABASE_PASSWORD || 'postgre',
      database: process.env.DATABASE_DBNAME || 'postgre',
      entities: [Users, Permissions, RolePermissions, Roles, Blogs, Comments],
      synchronize: true,
      autoLoadEntities: true
    }),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: Number(process.env.REDIS_PORT) || 6379,
        db: Number(process.env.REDIS_DB) || 0
        // username: process.env.REDIS_USER || 'default',
        // password: process.env.REDIS_PASSWORD || 'redis',
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public')
    }),
    AuthModule,
    UsersModule,
    BlogsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
