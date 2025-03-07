"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // or next/router if using Pages Router

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative">
      <nav className="bg-green-500 text-white px-4 py-3 md:px-6 flex items-center justify-between">
        <div
          className="text-xl font-serif cursor-pointer"
          onClick={() => router.push("/")}
        >
          a Board
        </div>

        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <img src="/hamburger.svg" />
        </button>

        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:underline flex items-center space-x-1">
            <span>Home</span>
          </a>
          <a
            href="/blog"
            className="hover:underline flex items-center space-x-1"
          >
            <span>Our Blog</span>
          </a>
        </div>
      </nav>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-green-500 text-white transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        <div className="flex justify-start p-6">
          <button onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <img src="/arrow.svg" />
          </button>
        </div>

        <div className="flex flex-col mt-8 space-y-6 px-6">
          <a
            href="/"
            className="flex items-center space-x-2 text-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <img src="/home.svg" />
            <span>Home</span>
          </a>
          <a
            className="flex items-center space-x-2 text-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <img src="/blog.svg" />
            <span>Our Blog</span>
          </a>
        </div>
      </div>
    </div>
  );
}
