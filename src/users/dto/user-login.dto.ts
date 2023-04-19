import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'google id token'
  })
  token: string
}
