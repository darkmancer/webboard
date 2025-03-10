"use client";

import React, { useState } from "react";
import CommunityDropdown from "./CommunityDropdown";
import axiosClient from "../axios/axiosClient";

interface PostModalProps {
  mode: "create" | "edit";
  postId?: number;
  initialCommunity?: string;
  initialTitle?: string;
  initialContent?: string;
  onClose: () => void;
  onCreated?: (newPost: any) => void;
  onUpdated?: (updatedPost: any) => void;
}

export default function PostModal({
  mode,
  postId,
  initialCommunity,
  initialTitle,
  initialContent,
  onClose,
  onCreated,
  onUpdated,
}: PostModalProps) {
  const [community, setCommunity] = useState(initialCommunity || "");
  const [title, setTitle] = useState(initialTitle || "");
  const [content, setContent] = useState(initialContent || "");

  const headingText = mode === "create" ? "Create Post" : "Edit Post";
  const buttonText = mode === "create" ? "Post" : "Confirm";

  const handleSubmit = async () => {
    try {
      if (community === "") {
        alert("Community must be chosen");
        return;
      }
      let endpoint = "/post";
      let method: "POST" | "PATCH" = "POST";

      if (mode === "edit" && postId) {
        endpoint = `/post/${postId}`;
        method = "PATCH";
      }

      let response;
      if (method === "POST") {
        response = await axiosClient.post(endpoint, {
          community,
          title,
          content,
        });
      } else {
        response = await axiosClient.patch(endpoint, {
          community,
          title,
          content,
        });
      }
      const data = response.data;

      if (mode === "create" && onCreated) {
        onCreated(data);
      } else if (mode === "edit" && onUpdated) {
        onUpdated(data);
      }
      onClose();
    } catch (error) {
      console.error(`Error on ${mode}:`, error);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 w-full"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center pl-4 pr-4">
        <div className="bg-white rounded-lg max-w-[685px] w-full px-[30px] py-[30px] shadow-lg relative">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[24px] md:text-[28px] font-semibold">
              {headingText}
            </h2>
            <button onClick={onClose} aria-label="Close">
              <img src="/close.svg" alt="Close" className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-3">
            <CommunityDropdown
              defaultCommunity={community || "Choose a community"}
              onSelect={(val) => setCommunity(val)}
              variant="outlined"
            />
          </div>

          <input
            type="text"
            placeholder="Title"
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="What's on your mind..."
            className="w-full h-[234px] mb-2.5 p-2 border border-gray-300 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-success ibmplex-small rounded-lg bg-white text-success min-h-[40px] font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-success text-white rounded-lg ibmplex-small min-h-[40px] font-semibold"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
