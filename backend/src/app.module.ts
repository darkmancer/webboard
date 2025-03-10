import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { CommentsController } from './comments/comments.controller';
import { PostsController } from './posts/posts.controller';
import { UsersModule } from './users/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, PostsModule, CommentsModule],
  controllers: [
    AppController,
    UsersController,
    CommentsController,
    PostsController,
  ],
  providers: [AppService],
})
export class AppModule {}
