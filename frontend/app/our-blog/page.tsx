"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import HomeToolbar from "../components/HomeToolBar";
import PostList from "../components/PostList";
import { PostItem } from "../page";
import axiosClient from "../axios/axiosClient";

export default function OurBlogPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [community, setCommunity] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const endpoint = community
          ? `/posts/mine?community=${community.toUpperCase()}`
          : `/posts/mine`;
        const response = await axiosClient.get(endpoint);
        const data = response.data;
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [community]);

  return (
    <div className="w-full min-h-screen">
      <Navbar />

      <div className="md:flex pt-12 md:pt-8 pl-4 pr-4 w-full">
        <div className="hidden md:block md:w-[22.5%] md:flex-1">
          <Sidebar />
        </div>

        <div className="md:w-[55%] max-w-[798px]">
          <HomeToolbar
            selectedCommunity={community}
            onSelectCommunity={(val) => setCommunity(val)}
            search={search}
            setSearch={setSearch}
            setPosts={setPosts}
          />

          {loading ? (
            <div className="mt-4">Loading posts...</div>
          ) : (
            <PostList
              posts={posts}
              searchQuery={search}
              setPosts={setPosts}
              editMode={true}
            />
          )}
        </div>

        <div className="hidden md:block md:w-[22.5%] md:flex-1"></div>
      </div>
    </div>
  );
}
