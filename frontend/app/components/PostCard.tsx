"use client";

import React from "react";

interface PostCardProps {
  avatarUrl?: string;
  authorName: string;
  community: string;
  title: string;
  excerpt: string;
  commentCount: number;
}

export default function PostCard({
  avatarUrl,
  authorName,
  community,
  title,
  excerpt,
  commentCount,
}: PostCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 mt-5 md:mt-4">
      <div className="flex items-center mb-2">
        <img
          src={avatarUrl || "/avatar-default.svg"}
          alt={authorName}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />

        <div className="text-gray-800 font-semibold">{authorName}</div>
      </div>

      <span className="inline-block bg-gray-200 text-gray-600 text-sm font-medium px-2 py-1 rounded-md mb-2">
        {community}
      </span>

      <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>

      <p className="text-gray-700 text-sm mb-2">{excerpt}</p>

      <div className="text-gray-500 text-sm flex gap-2">
        <img src="/comment.svg" />
        <div>{commentCount} Comments</div>
      </div>
    </div>
  );
}
