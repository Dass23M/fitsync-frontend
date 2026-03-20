"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";
import api from "@/lib/api";

export default function SearchPage() {
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState({});
  const [searched, setSearched] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (role) params.append("role", role);
      const res = await api.get(`/users/search?${params.toString()}`);
      const filtered = res.data.users.filter(
        (u) => u._id !== currentUser?._id
      );
      setUsers(filtered);
      setSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  }, [search, role, currentUser]);

  useEffect(() => {
    fetchUsers();
  }, [role]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const isFollowing = (userId) => {
    return currentUser?.following?.some(
      (f) => f._id === userId || f === userId
    );
  };

  const handleFollow = async (userId) => {
    try {
      setFollowLoading((prev) => ({ ...prev, [userId]: true }));
      if (isFollowing(userId)) {
        await api.post(`/users/${userId}/unfollow`);
      } else {
        await api.post(`/users/${userId}/follow`);
      }
      await fetchUsers();
      window.location.reload();
    } catch (error) {
      console.error("Follow error:", error);
    } finally {
      setFollowLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Find People
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Search for athletes and coaches to follow
        </p>
      </div>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="bg-white border border-gray-200 rounded-xl p-4"
      >
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search input */}
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white"
            />
          </div>

          {/* Role filter */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All roles</option>
            <option value="user">Athletes</option>
            <option value="coach">Coaches</option>
          </select>

          {/* Search button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
          >
            Search
          </Button>
        </div>
      </form>

      {/* Results */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-40" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-64" />
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      ) : users.length === 0 && searched ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-gray-200 rounded-xl">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <svg
              className="w-7 h-7 text-gray-400"
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
          <p className="text-sm font-semibold text-gray-700 mb-1">
            No users found
          </p>
          <p className="text-xs text-gray-400">
            Try a different name or filter
          </p>
        </div>
      ) : users.length > 0 ? (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-gray-400 font-medium">
            {users.length} user{users.length !== 1 ? "s" : ""} found
          </p>
          {users.map((user) => {
            const following = isFollowing(user._id);
            return (
              <div
                key={user._id}
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
              >
                {/* Avatar */}
                <Link href={`/main/profile/${user._id}`}>
                  <Avatar
                    src={user.avatar}
                    name={user.name}
                    size="lg"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      href={`/main/profile/${user._id}`}
                      className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      {user.name}
                    </Link>
                    <Badge
                      label={user.role === "coach" ? "Coach" : "Athlete"}
                      color={user.role === "coach" ? "emerald" : "indigo"}
                    />
                    {following && (
                      <Badge label="Following" color="gray" />
                    )}
                  </div>
                  {user.bio && (
                    <p className="text-xs text-gray-500 mt-1 truncate max-w-sm">
                      {user.bio}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-1.5">
                    <span className="text-xs text-gray-400">
                      <span className="font-semibold text-gray-700">
                        {user.followers?.length || 0}
                      </span>{" "}
                      followers
                    </span>
                    <span className="text-xs text-gray-400">
                      <span className="font-semibold text-gray-700">
                        {user.following?.length || 0}
                      </span>{" "}
                      following
                    </span>
                  </div>
                </div>

                {/* Follow button */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant={following ? "outline" : "primary"}
                    size="sm"
                    loading={followLoading[user._id]}
                    onClick={() => handleFollow(user._id)}
                  >
                    {following ? "Unfollow" : "Follow"}
                  </Button>
                  <Link
                    href={`/main/profile/${user._id}`}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-gray-200 rounded-xl">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            <svg
              className="w-7 h-7 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Search for athletes and coaches
          </p>
          <p className="text-xs text-gray-400">
            Type a name above to find people to follow
          </p>
        </div>
      )}
    </div>
  );
}