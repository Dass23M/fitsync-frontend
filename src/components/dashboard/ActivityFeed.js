"use client";

import { useState, useEffect } from "react";
import FeedItem from "@/components/dashboard/FeedItem";
import useSocket from "@/hooks/useSocket";
import api from "@/lib/api";

const ActivityFeed = () => {
  const { notifications, clearNotifications } = useSocket();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      fetchFeed(true);
      clearNotifications();
    }
  }, [notifications]);

  const fetchFeed = async (refresh = false) => {
    try {
      if (refresh) {
        setPage(1);
        const res = await api.get("/users/feed?page=1&limit=10");
        setActivities(res.data.activities);
        setTotalPages(res.data.totalPages);
        return;
      }
      setLoading(true);
      const res = await api.get("/users/feed?page=1&limit=10");
      setActivities(res.data.activities);
      setTotalPages(res.data.totalPages);
      setPage(1);
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const res = await api.get(`/users/feed?page=${nextPage}&limit=10`);
      setActivities((prev) => [...prev, ...res.data.activities]);
      setPage(nextPage);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to load more:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-col divide-y divide-gray-100">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3 p-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-gray-800">Activity Feed</h2>
          {notifications.length > 0 && (
            <span className="w-2 h-2 bg-red-500 rounded-full" />
          )}
        </div>
        <button
          onClick={() => fetchFeed(true)}
          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Feed items */}
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-600">No activity yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Follow other users to see their activity here
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {activities.map((activity) => (
            <FeedItem key={activity._id} activity={activity} />
          ))}
        </div>
      )}

      {/* Load more */}
      {page < totalPages && (
        <div className="px-5 py-3 border-t border-gray-100">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
          >
            {loadingMore ? (
              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              "Load more"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;  