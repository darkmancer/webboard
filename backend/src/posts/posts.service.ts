import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { PostsRepository } from 'src/posts/posts.repostiory';
import { Community, Post, User, Comment } from '@prisma/client';
import { UpdatePostDto } from './posts.dto';

type PostWithUserComments = Post & {
  user: User;
  comments: Comment[];
};

@Injectable()
export class PostsService {
  constructor(private readonly postsRepo: PostsRepository) {}

  async createPost(dto: any): Promise<Post> {
    return this.postsRepo.create(
      dto.title,
      dto.content,
      dto.userId,
      dto.community,
    );
  }

  async findAll(communityString?: string) {
    let posts: Post[] | PostWithUserComments[];

    if (!communityString) {
      posts = await this.postsRepo.findAll();
    } else {
      if (!Object.values(Community).includes(communityString as Community)) {
        throw new BadRequestException(`Invalid community: ${communityString}`);
      }
      posts = await this.postsRepo.findAll(communityString as Community);
    }

    return this.serializePosts(posts);
  }

  async findOne(id: number) {
    const post = await this.postsRepo.findOne(id);
    return this.serializePost(post);
  }

  // findByCommunity(community: Community): Post[] {
  //   return this.postsRepo.findByCommunity(community);
  // }

  async update(
    postId: number,
    userId: number,
    partial: { community?: string; title?: string; content?: string },
  ) {
    if (partial.community) {
      if (!Object.values(Community).includes(partial.community as Community)) {
        throw new BadRequestException(
          `Invalid community: ${partial.community}`,
        );
      }
    }

    const communityEnum = partial.community
      ? (partial.community as Community)
      : undefined;

    return this.postsRepo.update(postId, userId, {
      ...partial,
      community: communityEnum,
    });
  }

  async remove(postId: number, userId: number) {
    const post = await this.postsRepo.findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post #${postId} not found`);
    }

    if (post.userId !== userId) {
      throw new ForbiddenException('You cannot delete someone else’s post');
    }

    await this.postsRepo.remove(postId);
  }

  private serializePosts(posts: Post[] | PostWithUserComments[]) {
    return posts.map((p) => ({
      title: p.title,
      content: p.content,
      community: p.community,
      comment: p.comments.length, // total number of comments
      timeStamp: p.createdAt, // or p.updatedAt if you prefer
      user: {
        name: p.user?.name || null,
        avatar: p.user?.avatar || null,
      },
    }));
  }

  private serializePost(
    post: Post & {
      user: User | null;
      comments: Array<Comment & { user: User }>;
    },
  ) {
    return {
      title: post.title,
      content: post.content,
      community: post.community,
      comment: post.comments.map((c) => ({
        name: c.user?.name || null,
        timestamp: c.createdAt,
        content: c.content,
        avatar: c.user?.avatar || null,
      })),
      timeStamp: post.createdAt,
      user: {
        name: post.user?.name || null,
        avatar: post.user?.avatar || null,
      },
    };
  }
}
