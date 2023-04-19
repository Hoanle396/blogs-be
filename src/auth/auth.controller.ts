import { UserLoginDto } from '@/users/dto/user-login.dto'
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'

@ApiTags('/api/auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: UserLoginDto) {
    return this.authService.google(body)
  }

  @Get('/info')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  logout(@Request() req) {
    return this.authService.infoUser(req.user)
  }

  @Post('/refresh-token')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  refreshToken(@Request() req) {
    return this.authService.exChangeToken(req.user)
  }
}
