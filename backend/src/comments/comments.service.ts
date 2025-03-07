import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { CommentsRepository } from 'src/comments/comments.repostiory';
import { PostsRepository } from 'src/posts/posts.repostiory';

interface CreateCommentInput {
  postId: number;
  userId: number;
  content: string;
}

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepo: CommentsRepository,
    private readonly postsRepo: PostsRepository,
  ) {}

  async createComment(input: CreateCommentInput) {
    const post = await this.postsRepo.findOne(input.postId);
    if (!post) {
      throw new NotFoundException(`Post #${input.postId} not found`);
    }

    return this.commentsRepo.create(input.content, input.userId, input.postId);
  }
}
