import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Community, Post, User } from '@prisma/client'; // or define your own TS type if you prefer
import { UpdatePostDto } from './posts.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new Post with Prisma.
   */
  async create(
    title: string,
    content: string,
    userId: number,
    community: Community,
  ) {
    return this.prisma.post.create({
      data: {
        title,
        content,
        userId,
        community,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findAll(community?: Community) {
    const whereClause = community ? { community } : {};

    return this.prisma.post.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true, // to get user info
        comments: true, // to count or display comments
      },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        comments: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  async update(
    postId: number,
    userId: number,
    partial: { community?: Community; title?: string; content?: string },
  ) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException(`Post #${postId} not found`);
    if (post.userId !== userId)
      throw new ForbiddenException('You cannot update another user’s post');

    return this.prisma.post.update({
      where: { id: postId },
      data: partial,
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }

  async findByCommunity(community: Community): Promise<Post[]> {
    if (!Object.values(Community).includes(community)) {
      throw new BadRequestException(`Invalid community: ${community}`);
    }

    return this.prisma.post.findMany({
      where: { community },
    });
  }

  async findByUserId(userId: number, community?: Community): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        userId,
        ...(community ? { community } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        comments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }
}
