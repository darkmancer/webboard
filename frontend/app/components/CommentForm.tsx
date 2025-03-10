"use client";

import React, { useState } from "react";
import axiosClient from "../axios/axiosClient";

interface CommentFormProps {
  postId: number;
  onCancel: () => void;
  onCommentCreated: (newComment: any) => void;
}

export default function CommentForm({
  postId,
  onCancel,
  onCommentCreated,
}: CommentFormProps) {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    try {
      const response = await axiosClient.post("/comment", { postId, content });
      const data = response.data;
      onCommentCreated(data);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div>
      <textarea
        placeholder="What's on your mind..."
        className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end mt-2 space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-success ibmplex-small rounded-lg bg-white text-success font-semibold min-w-[105px]"
        >
          Cancel
        </button>
        <button
          onClick={handlePost}
          className="px-4 py-2 bg-success text-white rounded-lg ibmplex-small font-semibold min-w-[105px]"
        >
          Post
        </button>
      </div>
    </div>
  );
}
