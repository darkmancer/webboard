"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PostModal from "./PostModal";
import DeletePostModal from "./DeleteModal";
import { PostItem } from "../page";

interface PostCardProps {
  id: number;
  avatar?: string;
  name: string;
  community: string;
  title: string;
  content: string;
  commentCount: number;
  searchQuery: string;
  setPosts: React.Dispatch<React.SetStateAction<PostItem[]>>;
  editMode?: boolean;
}

function highlightText(text: string, query: string) {
  if (!query || query.length < 2) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function PostCard({
  id,
  avatar,
  name,
  community,
  title,
  content,
  commentCount,
  searchQuery,
  setPosts,
  editMode = false,
}: PostCardProps) {
  const router = useRouter();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if (showEditModal || showDeleteModal) {
      e.stopPropagation();
      return;
    }
    router.push(`/post/${id}`);
  };

  return (
    <div
      className="bg-white rounded-lg cursor-pointer py-[21.5px] px-[20px]"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={avatar || "/avatar-default.svg"}
            alt={name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div className="text-grey-300 text-sm font-medium">{name}</div>
        </div>

        {editMode && (
          <div className="flex gap-4">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
              }}
            >
              <img src="/edit-icon.svg" alt="Edit" />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
            >
              <img src="/delete-icon.svg" alt="Delete" />
            </div>
          </div>
        )}
      </div>

      <span className="inline-block bg-tag-bg text-gray-600 text-xs px-[8px] py-[4px] rounded-2xl mt-4 mb-[5px]">
        {community}
      </span>

      <h2 className="text-base font-semibold text-gray-900 mb-1">
        {highlightText(title, searchQuery)}
      </h2>

      <p className="text-gray-700 text-sm mb-[10px] break-words line-clamp-2">
        {content}
      </p>

      <div className="text-gray-500 text-xs flex gap-2">
        <img src="/comment.svg" alt="comment icon" />
        <div>{commentCount} Comments</div>
      </div>

      {showEditModal && (
        <PostModal
          mode="edit"
          postId={id}
          initialCommunity={community}
          initialTitle={title}
          initialContent={content}
          onClose={() => setShowEditModal(false)}
          onUpdated={(updatedPost) => {
            setPosts((prev: PostItem[]) =>
              prev.map((p: PostItem) =>
                p.id === updatedPost.id ? updatedPost : p
              )
            );
          }}
        />
      )}

      {showDeleteModal && (
        <DeletePostModal
          postId={id}
          onClose={() => setShowDeleteModal(false)}
          onDeleted={(postId) => {
            setPosts((prev: PostItem[]) =>
              prev.filter((p: PostItem) => p.id !== postId)
            );
          }}
        />
      )}
    </div>
  );
}
