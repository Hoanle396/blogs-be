import { Role } from '@/enums/role'
import { Users } from '@/models/users.entity'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>) {}

  async create(users: CreateUserDto) {
    const exits = await this.userRepository.findOneBy({ email: users.email })
    if (exits) {
      throw new BadRequestException()
    }
    const user = new Users()
    user.email = users.email
    user.fullname = users.fullname
    user.roles = Role.User
    return this.userRepository.save(user)
  }
  async findAll(skip = 0, take = 10) {
    const [rows, count] = await this.userRepository.findAndCount({
      skip,
      take
    })
    return { rows, count }
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id: id } })
  }

  async remove(id: number) {
    return await this.userRepository.delete(id)
  }
}
