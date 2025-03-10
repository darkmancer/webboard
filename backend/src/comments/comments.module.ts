import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentsRepository } from './comments.repostiory';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [PostsModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, PrismaService],
  exports: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
