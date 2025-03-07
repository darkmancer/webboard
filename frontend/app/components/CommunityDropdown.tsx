"use client"; 

import React, { useState } from "react";

const communityOptions = [
  "History",
  "Food",
  "Pets",
  "Health",
  "Fashion",
  "Exercise",
  "Others",
];

export default function CommunityDropdown() {
  const [open, setOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null
  );

  const handleSelect = (community: string) => {
    setSelectedCommunity(community);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex items-center gap-2 font-medium text-black hover:text-gray-700"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedCommunity || "Community"}
        <img src="/chevron.svg" />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-black/50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {open && (
        <div
          className="w-[202px] md:w-[320px] absolute mt-2 rounded-md bg-white z-50 right-1.5"
          role="menu"
          aria-orientation="vertical"
        >
          <ul className="py-1">
            {communityOptions.map((community) => {
              const isSelected = community === selectedCommunity;
              return (
                <li
                  key={community}
                  className={`flex justify-between px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 ${
                    isSelected ? "bg-green-100" : ""
                  }`}
                  onClick={() => handleSelect(community)}
                  role="menuitem"
                >
                  {community}
                  {isSelected ? <img src="/check.svg" /> : null}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
