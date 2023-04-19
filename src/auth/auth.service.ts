import { ALLOWED_DOMAINS, Common } from '@/constants/constants'
import { Role } from '@/enums/role'
import { Users } from '@/models/users.entity'
import { UserLoginDto } from '@/users/dto/user-login.dto'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { google } from 'googleapis'
import { Repository } from 'typeorm'
const { OAuth2 } = google.auth
const client = new OAuth2(Common.GOOGLE_CLIENT_ID)
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>
  ) {}

  async verifyGGToken(token) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token
        // audience: Common.GOOGLE_CLIENT_ID // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      })
      const payload = ticket.getPayload()
      const domain = payload.hd
      if (!domain || !ALLOWED_DOMAINS.includes(domain)) {
        return false
      }
      return payload
    } catch (e) {
      Logger.error(e)
      return false
    }
  }

  async google(google: UserLoginDto) {
    const ggPayload = await this.verifyGGToken(google.token)
    if (!ggPayload) {
      throw new BadRequestException({
        statusCode: 400,
        message: ['token is invalid'],
        error: 'Bad Request'
      })
    }
    const user = await this.userRepository.findOne({
      where: {
        email: ggPayload.email,
        roles: Role.Admin
      }
    })
    let data: Users = null
    if (!user) {
      const newUser = new Users()
      newUser.fullname = ggPayload.name
      newUser.email = ggPayload.email
      newUser.avatar = ggPayload.picture
      newUser.isVerify = true
      data = await this.userRepository.save(newUser)
    }

    const res = await this.generateJwtToken(user ?? data)
    return res
  }

  async infoUser(users: Users) {
    const user = await this.userRepository.findOne({ where: { email: users.email } })
    if (!user) {
      throw new BadRequestException({
        statusCode: 401,
        message: ['token is invalid'],
        error: 'Authorization'
      })
    }
    return user
  }

  async exChangeToken(users: Users) {
    const user = await this.userRepository.findOne({ where: { email: users.email } })
    if (!user) {
      throw new BadRequestException({
        statusCode: 401,
        message: ['token is invalid'],
        error: 'Authorization'
      })
    }
    return await this.generateJwtToken(user)
  }

  sign(data, expiresIn = Common.jwtExpired) {
    return this.jwtService.sign(data, { expiresIn })
  }

  signRefreshToken(data, expiresIn = Common.jwtRefreshExpired) {
    return this.jwtService.sign(data, { expiresIn })
  }

  verify(token: string) {
    let data = null
    let success = true
    try {
      data = this.jwtService.verify(token)
    } catch (e) {
      success = false
    }
    return { success, data }
  }

  decrypt(token: string) {
    return this.jwtService.decode(token)
  }

  async generateJwtToken(user: Users) {
    const payload = {
      id: user.id,
      email: user.email,
      isVerify: user.isVerify,
      roles: user.roles
    }

    return {
      token: this.sign(payload),
      refreshToken: this.signRefreshToken(payload),
      user: payload
    }
  }
}
