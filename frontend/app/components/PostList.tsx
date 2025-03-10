"use client";

import React from "react";
import PostCard from "./PostCard";
import { PostItem } from "../page";

interface PostListProps {
  posts: PostItem[];
  searchQuery: string;
  setPosts: React.Dispatch<React.SetStateAction<PostItem[]>>;
  editMode?: boolean;
}

export default function PostList({
  posts,
  searchQuery,
  setPosts,
  editMode,
}: PostListProps) {
  const filteredPosts =
    searchQuery.length >= 2
      ? posts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : posts;

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden divide-y divide-gray-200 mt-5 md:mt-4">
      {filteredPosts.map((post, index) => (
        <div key={`${post.id}-${index}`}>
          <PostCard
            {...post}
            searchQuery={searchQuery}
            setPosts={setPosts}
            editMode={editMode}
          />
        </div>
      ))}
    </div>
  );
}
