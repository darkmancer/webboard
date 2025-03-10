"use client";

import React, { useState } from "react";
import axiosClient from "../axios/axiosClient";

interface MobileCommentModalProps {
  postId: number;
  onClose: () => void;
  onCommentCreated: (newComment: any) => void;
}

export default function MobileCommentModal({
  postId,
  onClose,
  onCommentCreated,
}: MobileCommentModalProps) {
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
    <div className="md:hidden fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full h-full flex items-center justify-center px-4 py-8">
        <div className="bg-white w-full rounded-lg shadow-lg py-7 px-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-system-grey font-medium text-xl pb-5">
              Add Comments
            </h3>
            <button onClick={onClose}>
              <img src="/close.svg" alt="Close" className="w-4 h-4" />
            </button>
          </div>
          <textarea
            placeholder="What's on your mind..."
            className="w-full h-24 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex flex-col gap-2.5 justify-end mt-[30px]">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-success ibmplex-small rounded-lg bg-white text-success min-h-[40px]"
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              className="px-4 py-2 bg-green-500 text-white rounded-lg ibmplex-small min-h-[40px]"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
