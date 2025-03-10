"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function MobileSidebar({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 right-0 h-screen w-64 bg-green-500 text-white transform translate-x-0 transition-transform duration-300 z-50 md:hidden min-w-[280px]">
        <div className="flex justify-start p-6">
          <button onClick={onClose} aria-label="Close menu">
            <Image src="/arrow.svg" alt="Close menu" width={24} height={24} />
          </button>
        </div>
        <div className="flex flex-col mt-8 space-y-6 px-6">
          <a
            href="/"
            onClick={onClose}
            className={`flex items-center gap-3 text-lg ${
              pathname === "/" ? "font-extrabold" : "font-medium"
            }`}
          >
            <Image src="/home.svg" alt="Home" width={24} height={24} />
            <span>Home</span>
          </a>
          <a
            href="/our-blog"
            onClick={onClose}
            className={`flex items-center gap-3 text-lg ${
              pathname === "/our-blog" ? "font-extrabold" : "font-medium"
            }`}
          >
            <Image src="/blog.svg" alt="Our Blog" width={24} height={24} />
            <span>Our Blog</span>
          </a>
        </div>
      </div>
    </>
  );
}
