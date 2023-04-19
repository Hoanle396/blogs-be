import { Users } from '@/models/users.entity'
import { UsersModule } from '@/users/users.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Common } from './../constants/constants'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: Common.jwtkey,
      signOptions: { expiresIn: Common.jwtExpired }
    })
  ],
  providers: [JwtStrategy, AuthService],
  exports: [AuthModule],
  controllers: [AuthController]
})
export class AuthModule {}
