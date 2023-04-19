import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'google email address'
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'profile name'
  })
  fullname: string
}
