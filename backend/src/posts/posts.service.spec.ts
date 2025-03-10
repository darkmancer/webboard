import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repostiory';

import {
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

describe('PostsService', () => {
  let service: PostsService;
  let postsRepo: Partial<PostsRepository>;

  beforeEach(async () => {
    postsRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByUserId: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PostsRepository, useValue: postsRepo },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  describe('createPost', () => {
    it('should create and return a serialized post when dto is valid', async () => {
      const dto = {
        community: 'history',
        title: 'Test Title',
        content: 'Test content',
        userId: 1,
      };

      const repoPost = {
        id: 1,
        title: dto.title,
        content: dto.content,
        community: dto.community.toUpperCase(),
        createdAt: new Date('2025-03-10T12:00:00.000Z'),
        updatedAt: new Date('2025-03-10T12:00:00.000Z'),
        userId: dto.userId,
        user: {
          id: dto.userId,
          name: 'John Doe',
          avatar: 'avatar.png',
          username: 'john@example.com',
        },
        comments: [],
      };

      (postsRepo.create as jest.Mock).mockResolvedValue(repoPost);

      const result = await service.createPost(dto);
      expect(result).toEqual({
        id: repoPost.id,
        title: repoPost.title,
        content: repoPost.content,
        community: 'History',
        commentCount: 0,
        createdAt: repoPost.createdAt,
        name: repoPost.user.name,
        avatar: repoPost.user.avatar,
        userId: repoPost.user.id,
        comments: [],
      });
    });

    it('should throw BadRequestException if community is invalid', async () => {
      const dto = {
        community: 'invalid',
        title: 'Test Title',
        content: 'Test content',
        userId: 1,
      };

      await expect(service.createPost(dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should throw BadRequestException for invalid community string', async () => {
      await expect(service.findAll('invalid')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return serialized posts when no community filter is provided', async () => {
      const repoPosts = [
        {
          id: 1,
          title: 'Test Title',
          content: 'Test content',
          community: 'HISTORY',
          createdAt: new Date('2025-03-10T12:00:00.000Z'),
          updatedAt: new Date('2025-03-10T12:00:00.000Z'),
          userId: 1,
          user: {
            id: 1,
            name: 'John Doe',
            avatar: 'avatar.png',
            username: 'john@example.com',
          },
          comments: [],
        },
      ];
      (postsRepo.findAll as jest.Mock).mockResolvedValue(repoPosts);
      const result = await service.findAll();
      expect(result[0]).toEqual({
        id: repoPosts[0].id,
        title: repoPosts[0].title,
        content: repoPosts[0].content,
        community: 'History',
        commentCount: 0,
        createdAt: repoPosts[0].createdAt,
        name: repoPosts[0].user.name,
        avatar: repoPosts[0].user.avatar,
        userId: repoPosts[0].user.id,
      });
    });
  });

  describe('findOne', () => {
    it('should return a serialized post', async () => {
      const repoPost = {
        id: 1,
        title: 'Test Title',
        content: 'Test content',
        community: 'HISTORY',
        createdAt: new Date('2025-03-10T12:00:00.000Z'),
        updatedAt: new Date('2025-03-10T12:00:00.000Z'),
        userId: 1,
        user: {
          id: 1,
          name: 'John Doe',
          avatar: 'avatar.png',
          username: 'john@example.com',
        },
        comments: [],
      };
      (postsRepo.findOne as jest.Mock).mockResolvedValue(repoPost);
      const result = await service.findOne(1);
      expect(result).toEqual({
        id: repoPost.id,
        title: repoPost.title,
        content: repoPost.content,
        community: 'History',
        comments: [],
        commentCount: 0,
        createdAt: repoPost.createdAt,
        name: repoPost.user.name,
        avatar: repoPost.user.avatar,
        userId: repoPost.user.id,
      });
    });
  });

  describe('findByUserId', () => {
    it('should throw BadRequestException for invalid community', async () => {
      await expect(service.findByUserId(1, 'invalid')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return serialized posts when community is not provided', async () => {
      const repoPosts = [
        {
          id: 1,
          title: 'Test Title',
          content: 'Test content',
          community: 'HISTORY',
          createdAt: new Date('2025-03-10T12:00:00.000Z'),
          updatedAt: new Date('2025-03-10T12:00:00.000Z'),
          userId: 1,
          user: {
            id: 1,
            name: 'John Doe',
            avatar: 'avatar.png',
            username: 'john@example.com',
          },
          comments: [],
        },
      ];
      (postsRepo.findByUserId as jest.Mock).mockResolvedValue(repoPosts);
      const result = await service.findByUserId(1);
      expect(result[0].community).toEqual('History');
    });
  });

  describe('update', () => {
    it('should throw BadRequestException for invalid community', async () => {
      await expect(
        service.update(1, 1, { community: 'invalid' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should update and return a serialized post', async () => {
      const partial = { title: 'Updated Title', community: 'history' };
      const repoPost = {
        id: 1,
        title: partial.title,
        content: 'Test content',
        community: partial.community.toUpperCase(),
        createdAt: new Date('2025-03-10T12:00:00.000Z'),
        updatedAt: new Date('2025-03-10T12:00:00.000Z'),
        userId: 1,
        user: {
          id: 1,
          name: 'John Doe',
          avatar: 'avatar.png',
          username: 'john@example.com',
        },
        comments: [],
      };

      (postsRepo.update as jest.Mock).mockResolvedValue(repoPost);
      const result = await service.update(1, 1, partial);
      expect(result.title).toEqual(partial.title);
      expect(result.community).toEqual('History');
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if post not found', async () => {
      (postsRepo.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.remove(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if userId does not match', async () => {
      const repoPost = {
        id: 1,
        title: 'Test Title',
        content: 'Test content',
        community: 'HISTORY',
        createdAt: new Date('2025-03-10T12:00:00.000Z'),
        updatedAt: new Date('2025-03-10T12:00:00.000Z'),
        userId: 2,
        user: {
          id: 2,
          name: 'Jane Doe',
          avatar: 'avatar.png',
          username: 'jane@example.com',
        },
        comments: [],
      };
      (postsRepo.findOne as jest.Mock).mockResolvedValue(repoPost);
      await expect(service.remove(1, 1)).rejects.toThrow(ForbiddenException);
    });

    it('should call postsRepo.remove if post exists and userId matches', async () => {
      const repoPost = {
        id: 1,
        title: 'Test Title',
        content: 'Test content',
        community: 'HISTORY',
        createdAt: new Date('2025-03-10T12:00:00.000Z'),
        updatedAt: new Date('2025-03-10T12:00:00.000Z'),
        userId: 1,
        user: {
          id: 1,
          name: 'John Doe',
          avatar: 'avatar.png',
          username: 'john@example.com',
        },
        comments: [],
      };
      (postsRepo.findOne as jest.Mock).mockResolvedValue(repoPost);
      (postsRepo.remove as jest.Mock).mockResolvedValue(undefined);
      await service.remove(1, 1);
      expect(postsRepo.remove).toHaveBeenCalledWith(1);
    });
  });
});
