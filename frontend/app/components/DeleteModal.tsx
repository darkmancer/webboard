"use client";

import React from "react";
import axiosClient from "../axios/axiosClient";

interface DeletePostModalProps {
  postId: number;
  onClose: () => void;
  onDeleted: (postId: number) => void;
}

export default function DeletePostModal({
  postId,
  onClose,
  onDeleted,
}: DeletePostModalProps) {
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/post/${postId}`);
      onDeleted(postId);
      onClose();
    } catch (error: any) {
      console.error("Error deleting post:", error);
      alert(
        `Failed to delete post: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center text-center">
        <div className="bg-white w-11/12 max-w-md p-4 rounded-lg shadow-lg relative py-[30px] px-[24px]">
          <div className="flex justify-center items-center mb-4">
            <h2 className="text-xl font-semibold">
              Please confirm if you wish to <br />
              delete the post
            </h2>
          </div>

          <p className="text-sm text-gray-700 mb-4">
            Are you sure you want to delete the post? Once deleted, it cannot be
            recovered.
          </p>

          <div className="flex flex-col gap-2.5 justify-end mt-[30px] md:flex-row-reverse md:justify-center md:gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-error text-white rounded-lg ibmplex-small min-h-[40px] font-semibold md:w-[170px]"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-tag ibmplex-small rounded-lg bg-white text-tag min-h-[40px] font-semibold md:w-[170px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
