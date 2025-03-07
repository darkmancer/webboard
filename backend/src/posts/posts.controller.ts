// src/posts/posts.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Headers,
  Query,
  BadRequestException,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Community } from '@prisma/client';
import { PostsService } from 'src/posts/posts.service';
import { UpdatePostDto } from './posts.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('posts')
  findAll(@Query('community') community?: string) {
    return this.postsService.findAll(community);
  }

  @Get('post/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('post')
  async createPost(
    @Body() body: { community: string; title: string; content: string },
    @Request() req,
  ) {
    const userId = req.user.id;

    if (!body.community || !body.title || !body.content) {
      throw new BadRequestException(
        'Missing fields: community, title, content',
      );
    }

    return this.postsService.createPost({
      userId,
      community: body.community,
      title: body.title,
      content: body.content,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('post/:postId')
  async updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: { community?: string; title?: string; content?: string },
    @Request() req,
  ) {
    return this.postsService.update(postId, req.user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('post/:postId')
  async deletePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Request() req,
  ) {
    const userId = req.user.id;

    await this.postsService.remove(postId, userId);

    return { message: `Post #${postId} deleted successfully` };
  }
}
