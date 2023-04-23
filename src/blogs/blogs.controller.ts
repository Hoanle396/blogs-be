import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Roles } from '@/enums/decorator'
import { Role } from '@/enums/role'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { BlogsService } from './blogs.service'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { CreateCommentDto } from './dto/create-comment.dto'

@ApiTags('/api/blogs')
@Controller('/api/blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    return await this.blogsService.create(createBlogDto, req.user)
  }

  @Get()
  async findAll(@Query() { take, skip }) {
    return await this.blogsService.findAll(take, skip)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async comments(@Param('id') id: number, @Body() createBlogDto: CreateCommentDto, @Req() req) {
    return await this.blogsService.comments(id, createBlogDto, req.user)
  }

  @Get('comments/:id')
  async findComment(@Param('id') id: string, @Query() { take, skip }) {
    return await this.blogsService.findComment(+id, take, skip)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.blogsService.findOne(+id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return await this.blogsService.update(+id, updateBlogDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.blogsService.remove(+id)
  }
}
