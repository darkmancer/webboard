"use client";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full">
      <nav className="pl-7 mt-3">
        <div className="mb-4">
          <a
            href="/"
            className={`flex items-center gap-3 ${
              pathname === "/" ? "font-extrabold" : "font-medium"
            }`}
          >
            <img src="/home-black.svg" alt="Home" />
            <span>Home</span>
          </a>
        </div>
        <div className="pl-1">
          <a
            href="/our-blog"
            className={`flex items-center gap-3 ${
              pathname === "/our-blog" ? "font-extrabold" : "font-medium"
            }`}
          >
            <img src="/blog-black.svg" alt="Our Blog" />
            <span>Our Blog</span>
          </a>
        </div>
      </nav>
    </aside>
  );
}
