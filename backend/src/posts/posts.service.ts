import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { Community, Post, User, Comment } from '@prisma/client';
import { PostsRepository } from './posts.repostiory';

type PostWithUserComments = Post & {
  user: User;
  comments: Comment[];
};

@Injectable()
export class PostsService {
  constructor(private readonly postsRepo: PostsRepository) {}

  async createPost(dto: any) {
    const upperCaseCommunity = dto.community.toUpperCase();
    if (!Object.values(Community).includes(upperCaseCommunity)) {
      throw new BadRequestException(`Invalid community: ${dto.community}`);
    }
    const createdPost = await this.postsRepo.create(
      dto.title,
      dto.content,
      dto.userId,
      upperCaseCommunity,
    );
    return this.serializePost(createdPost);
  }

  async findAll(communityString?: string) {
    let posts: Post[] | PostWithUserComments[];
    if (
      communityString &&
      !Object.values(Community).includes(communityString as Community)
    ) {
      throw new BadRequestException(`Invalid community: ${communityString}`);
    }
    if (!communityString) {
      posts = await this.postsRepo.findAll();
    } else {
      posts = await this.postsRepo.findAll(communityString as Community);
    }

    return this.serializePosts(posts);
  }

  async findOne(id: number) {
    const post = await this.postsRepo.findOne(id);
    return this.serializePost(post);
  }

  async findByUserId(userId: number, communityString?: string) {
    let posts: Post[];
    if (
      communityString &&
      !Object.values(Community).includes(communityString as Community)
    ) {
      throw new BadRequestException(`Invalid community: ${communityString}`);
    }
    if (!communityString) {
      posts = await this.postsRepo.findByUserId(userId);
    } else {
      posts = await this.postsRepo.findByUserId(
        userId,
        communityString as Community,
      );
    }
    return this.serializePosts(posts);
  }

  async update(
    postId: number,
    userId: number,
    partial: { community?: string; title?: string; content?: string },
  ) {
    let upperCaseCommunity = '';
    if (partial.community) {
      upperCaseCommunity = partial.community.toUpperCase();
      if (!Object.values(Community).includes(upperCaseCommunity as Community)) {
        throw new BadRequestException(
          `Invalid community: ${upperCaseCommunity}`,
        );
      }
    }

    const communityEnum = upperCaseCommunity
      ? (upperCaseCommunity as Community)
      : undefined;

    const updatedPost = await this.postsRepo.update(postId, userId, {
      ...partial,
      community: communityEnum,
    });
    return this.serializePost(updatedPost);
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
      id: p.id,
      title: p.title,
      content: p.content,
      community: this.titleCase(p.community),
      commentCount: p.comments.length,
      createdAt: p.createdAt,
      name: p.user?.name || null,
      avatar: p.user?.avatar || null,
      userId: p.user?.id || null,
    }));
  }

  private serializePost(
    post: Post & {
      user: User | null;
      comments: Array<Comment & { user: User }>;
    },
  ) {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      community: this.titleCase(post.community),
      comments: post.comments.map((c) => ({
        id: c.id,
        name: c.user?.name || null,
        createdAt: c.createdAt,
        content: c.content,
        avatar: c.user?.avatar || null,
      })),
      commentCount: post.comments.length,
      createdAt: post.createdAt,
      name: post.user?.name || null,
      avatar: post.user?.avatar || null,
      userId: post.user?.id || null,
    };
  }

  private titleCase(str: string): string {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }
}
