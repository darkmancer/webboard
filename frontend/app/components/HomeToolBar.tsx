"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import CommunityDropdown from "./CommunityDropdown";
import PostModal from "./PostModal";
import { PostItem } from "../page";

interface HomeToolbarProps {
  selectedCommunity: string;
  onSelectCommunity: (comm: string) => void;
  search: string;
  setSearch: (s: string) => void;
  setPosts: React.Dispatch<React.SetStateAction<PostItem[]>>;
}

export default function HomeToolbar({
  selectedCommunity,
  onSelectCommunity,
  search,
  setSearch,
  setPosts,
}: HomeToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [showModal, setShowModal] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelectCommunity = (value: string) => {
    onSelectCommunity(value);
    router.push(value ? `${pathname}?community=${value}` : pathname);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <img
            src="/magnifier.svg"
            alt="search icon"
            className="absolute left-2.5 top-2.5"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 pr-2 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <CommunityDropdown
          defaultCommunity={selectedCommunity || "Community"}
          onSelect={handleSelectCommunity}
        />

        <button
          onClick={() => setShowModal(true)}
          className="bg-success text-white px-[25px] py-[10px] rounded-md hover:bg-green-600 ibmplex-small font-semibold"
        >
          Create +
        </button>
        {showModal && (
          <PostModal
            mode="create"
            onClose={() => setShowModal(false)}
            onCreated={(newPost) => {
              setPosts((prev: PostItem[]) => [newPost, ...prev]);
              setShowModal(false);
            }}
          />
        )}
      </div>
    </>
  );
}
