import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Roles } from '@/enums/decorator'
import { Role } from '@/enums/role'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.usersService.create(user)
  }

  @Get()
  async findAll(@Query() { take, skip }) {
    return await this.usersService.findAll(skip, take)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
