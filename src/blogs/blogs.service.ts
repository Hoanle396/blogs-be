import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { Users } from '@/models/users.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Blogs } from '@/models/blogs.entity'
import { Repository } from 'typeorm'
import { Comments } from '@/models/comments.entity'
import { CreateCommentDto } from './dto/create-comment.dto'

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blogs) private blogsRepository: Repository<Blogs>,
    @InjectRepository(Comments) private commentRepository: Repository<Comments>
  ) {}
  async create(createBlogDto: CreateBlogDto, user: Users) {
    const blogs = new Blogs()
    blogs.createdBy = user
    blogs.description = createBlogDto.description
    blogs.name = createBlogDto.name
    blogs.image = createBlogDto.image
    blogs.slugs = createBlogDto.slugs || createBlogDto.name.replace(' ', '-').toLowerCase()

    return await this.blogsRepository.save(blogs)
  }

  async findAll(take, skip) {
    const [rows, count] = await this.blogsRepository.findAndCount({
      relations: {
        createdBy: true,
        comments: true
      },
      take,
      skip
    })
    return { rows, count }
  }

  async findOne(id: number) {
    const blog = await this.blogsRepository.findOne({
      where: { id },
      relations: {
        createdBy: true,
        comments: {
          createBy: true
        }
      }
    })
    if (blog) {
      return blog
    }
    throw new NotFoundException()
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogsRepository.findOneBy({ id })
    if (blog) {
      return await this.blogsRepository.update(+id, updateBlogDto)
    }
    throw new NotFoundException()
  }

  async remove(id: number) {
    const blog = await this.blogsRepository.findOneBy({ id })
    if (blog) {
      return await this.blogsRepository.delete(+id)
    }
    throw new NotFoundException()
  }

  async comments(id: number, { text }: CreateCommentDto, user: Users) {
    const blog = await this.blogsRepository.findOneBy({ id })
    if (blog) {
      const comments = new Comments()
      comments.blogs = blog
      comments.createBy = user
      comments.text = text
      return await this.commentRepository.save(comments)
    }
    throw new NotFoundException()
  }

  async findComment(id: number, take, skip) {
    const blog = await this.blogsRepository.findOneBy({ id })
    if (blog) {
      return await this.commentRepository.findAndCount({
        where: { blogs: { id: blog.id } },
        relations: { createBy: true },
        take,
        skip
      })
    }
    throw new NotFoundException()
  }
}
