import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { CommentsController } from './comments/comments.controller';
import { PostsController } from './posts/posts.controller';
import { CommentsService } from './comments/comments.service';
import { PostsService } from './posts/posts.service';
import { CommentsRepository } from './comments/comments.repostiory';
import { PostsRepository } from './posts/posts.repostiory';
import { UsersModule } from './users/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule],
  controllers: [
    AppController,
    UsersController,
    CommentsController,
    PostsController,
  ],
  providers: [
    AppService,
    CommentsService,
    PostsService,
    CommentsRepository,
    PostsRepository,
  ],
})
export class AppModule {}
