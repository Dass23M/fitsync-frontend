"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const navItems = [
  {
    href: "/main/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/main/workouts",
    label: "Workouts",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    href: "/main/plans",
    label: "Plans",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    href: "/main/search",
    label: "Find People",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
];

const coachItems = [
  {
    href: "/main/plans/create",
    label: "Create Plan",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    href: "/main/workouts/create",
    label: "Log Workout",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-200 min-h-screen pt-6 px-3">

      {/* Main nav */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
          Main
        </p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-3 px-3 py-2.5
              rounded-lg text-sm font-medium
              transition-all duration-200
              ${pathname.startsWith(item.href)
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>

      {/* Coach section */}
      {user?.role === "coach" && (
        <div className="flex flex-col gap-1 mt-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
            Coach
          </p>
          {coachItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5
                rounded-lg text-sm font-medium
                transition-all duration-200
                ${pathname.startsWith(item.href)
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* User info at bottom */}
      <div className="mt-auto mb-6 flex flex-col gap-2">
        <Link
          href="/main/workouts/create"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Log Workout
        </Link>

        <Link
          href="/main/search"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Find People
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;