"use client";

import { useState } from "react";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";

const FollowList = ({ followers, following }) => {
  const [activeTab, setActiveTab] = useState("followers");

  const list = activeTab === "followers" ? followers : following;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab("followers")}
          className={`
            flex-1 py-3 text-sm font-medium transition-colors
            ${activeTab === "followers"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
            }
          `}
        >
          Followers ({followers?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`
            flex-1 py-3 text-sm font-medium transition-colors
            ${activeTab === "following"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
            }
          `}
        >
          Following ({following?.length || 0})
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100">
        {!list || list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500 font-medium">
              No {activeTab} yet
            </p>
          </div>
        ) : (
          list.map((user) => (
            <Link
              key={user._id}
              href={`/profile/${user._id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <Avatar
                src={user.avatar}
                name={user.name}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                {user.bio && (
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {user.bio}
                  </p>
                )}
              </div>
              <Badge
                label={user.role}
                color={user.role === "coach" ? "indigo" : "gray"}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowList;