import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsRepository } from './posts.repostiory';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, PrismaService],
  exports: [PostsService, PostsRepository],
})
export class PostsModule {}
