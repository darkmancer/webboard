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

interface CommunityDropdownProps {
  defaultCommunity?: string;
  onSelect?: (community: string) => void;
  variant?: "default" | "outlined";
}

export default function CommunityDropdown({
  defaultCommunity = "Community",
  onSelect,
  variant = "default",
}: CommunityDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    defaultCommunity === "Community" ? null : defaultCommunity
  );

  const handleSelect = (community: string) => {
    setSelectedCommunity(community);
    setOpen(false);
    if (onSelect) {
      onSelect(community);
    }
  };

  const baseButtonClass =
    "inline-flex items-center gap-2 ibmplex-small font-semibold justify-center";
  const variantClass =
    variant === "outlined"
      ? "border border-success bg-white text-success px-4 py-2.5 rounded-md ibmplex-small w-full mx-auto"
      : "text-black";

  const finalButtonClass = `${baseButtonClass} ${variantClass}`;

  return (
    <div
      className={`relative inline-block ${variant === "outlined" ? "w-full md:w-auto" : ""} text-left`}
    >
      <button
        className={finalButtonClass}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedCommunity || "Community"}
        {variant === "outlined" ? (
          <img src="/chevron-green.svg" alt="chevron" />
        ) : (
          <img src="/chevron.svg" alt="chevron" />
        )}
      </button>

      {open && (
        <>
          <div
            className={`fixed inset-0 ${variant === "outlined" ? "" : "bg-black/50"} z-40`}
            onClick={() => setOpen(false)}
          ></div>

          <div
            className={`${variant === "outlined" ? "w-full" : "w-[202px] md:w-[320px]"} absolute mt-2 rounded-md bg-white z-50 ${variant === "outlined" ? "left-0.5" : "right-1.5"} font-semibold`}
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
                    {isSelected ? (
                      <img src="/check.svg" alt="selected" />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
