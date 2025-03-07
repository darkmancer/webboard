import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    content: string,
    userId: number,
    postId: number,
  ): Promise<Comment> {
    return this.prisma.comment.create({
      data: {
        content,
        userId,
        postId,
      },
    });
  }
}
