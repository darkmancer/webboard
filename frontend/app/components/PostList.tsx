"use client"; // if using Next.js App Router

import React from "react";
import PostCard from "./PostCard"; // The single-item card from before

interface Post {
  id: number;
  avatarUrl?: string;
  authorName: string;
  community: string;
  title: string;
  excerpt: string;
  commentCount: number;
}

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden divide-y divide-gray-200 mt-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4">
          <PostCard
            avatarUrl={post.avatarUrl}
            authorName={post.authorName}
            community={post.community}
            title={post.title}
            excerpt={post.excerpt}
            commentCount={post.commentCount}
          />
        </div>
      ))}
    </div>
  );
}
