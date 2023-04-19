import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The name blog'
  })
  name: string

  @IsString()
  @ApiProperty({
    type: String,
    description: 'The slugs'
  })
  slugs: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The image link'
  })
  image: string

  @IsString()
  @ApiProperty({
    type: String,
    description: 'The description'
  })
  description: string
}
