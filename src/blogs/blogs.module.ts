import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { BlogsService } from './blogs.service'
import { BlogsController } from './blogs.controller'
import { Blogs } from '@/models/blogs.entity'
import { Comments } from '@/models/comments.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Blogs, Comments])],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
