"use client"; 

import { useState } from "react";
import CommunityDropdown from "./CommunityDropdown";

export default function HomeToolbar() {
  const [search, setSearch] = useState("");
  const [community, setCommunity] = useState("All Communities");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCommunity(e.target.value);
  };

  const handleCreate = () => {
    
    alert("Navigate to create post or open modal...");
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1">
        <img src="/magnifier.svg" className="absolute left-2.5 top-2.5" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-8 pr-2 py-2 border border-gray-200 rounded-md text-gray-800 focus:outline-none "
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <CommunityDropdown />
      
      <button
        onClick={handleCreate}
        className="bg-success text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Create +
      </button>
    </div>
  );
}
