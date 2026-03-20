"use client";

import Image from "next/image";
import { getInitials } from "@/lib/utils";

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-xl",
};

const Avatar = ({ src, name, size = "md", className = "" }) => {
  if (src) {
    return (
      <div
        className={`
          relative rounded-full overflow-hidden
          ring-2 ring-white flex-shrink-0
          ${sizes[size]} ${className}
        `}
      >
        <Image
          src={src}
          alt={name || "User avatar"}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`
        rounded-full flex-shrink-0
        bg-indigo-100 text-indigo-600
        flex items-center justify-center
        font-semibold ring-2 ring-white
        ${sizes[size]} ${className}
      `}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;