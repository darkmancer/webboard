import React from "react";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
}

export default function Avatar({
  src,
  alt = "Avatar",
  size = 40,
}: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="rounded-full object-cover"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}
