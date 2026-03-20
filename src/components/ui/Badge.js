"use client";

const colorMap = {
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  teal: "bg-teal-100 text-teal-700",
  orange: "bg-orange-100 text-orange-700",
  yellow: "bg-yellow-100 text-yellow-700",
  pink: "bg-pink-100 text-pink-700",
  indigo: "bg-indigo-100 text-indigo-700",
  gray: "bg-gray-100 text-gray-600",
};

const Badge = ({ label, color = "gray", className = "" }) => {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5
        text-xs font-medium
        rounded-full
        ${colorMap[color] || colorMap.gray}
        ${className}
      `}
    >
      {label}
    </span>
  );
};

export default Badge;