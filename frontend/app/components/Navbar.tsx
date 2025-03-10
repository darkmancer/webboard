"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="relative">
      <nav className="bg-green-500 text-white px-4 py-3 md:px-6 flex items-center justify-between">
        <div
          className="text-xl castoro-regular-italic cursor-pointer"
          onClick={() => router.push("/")}
        >
          a Board
        </div>

        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <img src="/hamburger.svg" alt="Menu" />
        </button>

        <div className="hidden md:flex space-x-6 items-center">
          {currentUser ? (
            <div
              className="flex items-center gap-2 cursor-pointer font-medium"
              onClick={() => router.push("/profile")}
            >
              <span>{currentUser.name}</span>
              <Avatar src={currentUser.avatar} alt="John Doe" size={40} />
            </div>
          ) : (
            <button
              onClick={() => router.push("/sign-in")}
              className="bg-success text-white font-ibmplex py-[10px] px-[30px] rounded-md"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {sidebarOpen && <MobileSidebar onClose={() => setSidebarOpen(false)} />}
    </div>
  );
}
