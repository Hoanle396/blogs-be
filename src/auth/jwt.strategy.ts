import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Common } from '@/constants/constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Common.jwtkey
    })
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      roles: payload.roles,
      isVerify: payload.isVerify
    }
  }
}
