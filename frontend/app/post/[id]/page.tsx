"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/SideBar";
import { timeAgo } from "@/app/utils/timeAgo";
import Avatar from "@/app/components/Avatar";
import CommentForm from "@/app/components/CommentForm";
import MobileCommentModal from "@/app/components/MobileComponentModal";
import axiosClient from "@/app/axios/axiosClient";

export interface Comment {
  id: number;
  name: string;
  avatar: string;
  content: string;
  createdAt?: string;
  timeAgo?: string;
}

export interface PostWithComments {
  id: number;
  userId: number;
  name: string;
  avatar: string;
  community: string;
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  comments: Comment[];
}

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<PostWithComments>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPostDetail = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/post/${id}`);
        const postData = response.data;
        console.log(postData);
        const commentList = postData.comments.map((c: Comment) => ({
          timeAgo: c.createdAt ? timeAgo(c.createdAt) : "",
          ...c,
        }));
        console.log(commentList);
        setPost(postData);
        setComments(commentList);
      } catch (error) {
        console.error("Error fetching post detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <div>Loading post detail...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <div>Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full">
      <Navbar />

      <div className="md:flex w-full justify-center px-4 py-6 md:px-0 md:py-0">
        <div className="hidden md:block border-r border-gray-200 bg-grey-100 h-lvh w-[20%] pt-10 pl-7">
          <Sidebar />
        </div>

        <main className="flex justify-center md:p-9 w-[80%]">
          <div className="max-w-2xl w-full">
            <div className="flex items-center mb-10">
              <button
                className="p-2 rounded-full shadow bg-green-100 cursor-pointer w-11 h-11"
                onClick={() => router.back()}
              >
                <img
                  src="/arrow-left.svg"
                  alt="Back"
                  className="w-[14px] h-[14px] mx-auto"
                />
              </button>
            </div>

            <div className="bg-white rounded-lg mb-4">
              <div className="flex items-center gap-2.5">
                <Avatar src={post.avatar} size={48} />
                <div className="flex items-center gap-2.5">
                  <div className="font-semibold text-gray-800">{post.name}</div>
                  <div className="text-sm text-gray-500">
                    {timeAgo(post.createdAt)}
                  </div>
                </div>
              </div>

              <span className="inline-block bg-gray-200 text-gray-700 text-sm font-medium px-2 py-1 rounded-md mb-4 mt-2.5">
                {post.community}
              </span>

              <h2 className="text-[28px] font-semibold text-black mb-1">
                {post.title}
              </h2>
              <p className="text-black text-xs mb-7">{post.content}</p>

              <div className="text-gray-500 text-sm mb-6 flex gap-1">
                <img src="/comment.svg" alt="comment icon" />
                <div>{comments.length} Comments</div>
              </div>

              {!showCommentForm && (
                <button
                  onClick={() => setShowCommentForm(true)}
                  className="bg-white text-success border-success border px-4 py-2 rounded-md"
                >
                  Add Comments
                </button>
              )}

              {/* Desktop Inline Comment Form */}
              {showCommentForm && (
                <div className="hidden md:block mt-4">
                  <CommentForm
                    postId={post.id}
                    onCancel={() => setShowCommentForm(false)}
                    onCommentCreated={(newComment) => {
                      setComments((prev: Comment[]) => [
                        {
                          id: newComment.id,
                          name: newComment.user.name,
                          avatar: newComment.user.avatar,
                          timeAgo: "just now",
                          content: newComment.content,
                        },
                        ...prev,
                      ]);
                      setShowCommentForm(false);
                    }}
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg mt-6">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="mb-8 last:mb-0 last:pb-0 last:border-none"
                >
                  <div className="flex items-center mb-2 gap-2.5">
                    <Avatar src={c.avatar} size={40} />
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">
                        {c.name}
                      </span>
                      <span className="text-sm text-gray-500">{c.timeAgo}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 pl-13">{c.content}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {showCommentForm && (
        <MobileCommentModal
          postId={post.id}
          onClose={() => setShowCommentForm(false)}
          onCommentCreated={(newComment) => {
            setComments((prev) => [
              {
                id: prev.length + 1,
                name: "You",
                avatar: "/default-avatar.png",
                timeAgo: "just now",
                content: newComment.content,
              },
              ...prev,
            ]);
            setShowCommentForm(false);
          }}
        />
      )}
    </div>
  );
}
