"use client";

export default function Sidebar() {
  return (
    <aside className="h-full ">
      <nav className="space-y-4">
        <a href="/" className="flex items-center space-x-2">
          <img src="/home-black.svg" />
          <span>Home</span>
        </a>

        <a href="/blog" className="flex items-center space-x-2">
          <img src="/blog-black.svg" />
          <span>Our Blog</span>
        </a>
      </nav>
    </aside>
  );
}
