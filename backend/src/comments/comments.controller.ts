import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from './comments.dto';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('comment')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createComment(@Body() dto: CreateCommentDto, @Request() req) {
    const userId = req.user.id;

    return this.commentsService.createComment({
      postId: dto.postId,
      userId,
      content: dto.content,
    });
  }
}
