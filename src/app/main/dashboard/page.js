"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import StatsChart from "@/components/dashboard/StatsChart";
import useAuth from "@/hooks/useAuth";
import api from "@/lib/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalPlans: 0,
    totalFollowers: 0,
    totalFollowing: 0,
  });
  const [loading, setLoading] = useState(true);

  const isCoach = user?.role === "coach";

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const workoutsRes = await api.get("/workouts?limit=1&page=1");
      setStats((prev) => ({
        ...prev,
        totalWorkouts: workoutsRes.data.totalWorkouts || 0,
        totalFollowers: user?.followers?.length || 0,
        totalFollowing: user?.following?.length || 0,
      }));
    } catch (error) {
      console.error("Failed to fetch workout stats:", error.message);
    }

    try {
      const plansRes = await api.get("/plans?limit=1&page=1");
      setStats((prev) => ({
        ...prev,
        totalPlans: plansRes.data.totalPlans || 0,
      }));
    } catch (error) {
      console.error("Failed to fetch plan stats:", error.message);
    }

    setLoading(false);
  };

  const athleteStatCards = [
    {
      label: "My Workouts",
      value: stats.totalWorkouts,
      color: "indigo",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      href: "/main/workouts",
    },
    {
      label: "Plans",
      value: stats.totalPlans,
      color: "emerald",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      href: "/main/plans",
    },
    {
      label: "Followers",
      value: stats.totalFollowers,
      color: "amber",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
      href: `/main/profile/${user?._id}`,
    },
    {
      label: "Following",
      value: stats.totalFollowing,
      color: "purple",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      href: `/main/profile/${user?._id}`,
    },
  ];

  const coachStatCards = [
    {
      label: "My Plans",
      value: stats.totalPlans,
      color: "emerald",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      href: "/main/plans",
    },
    {
      label: "My Workouts",
      value: stats.totalWorkouts,
      color: "indigo",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      href: "/main/workouts",
    },
    {
      label: "Followers",
      value: stats.totalFollowers,
      color: "amber",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
      href: `/main/profile/${user?._id}`,
    },
    {
      label: "Following",
      value: stats.totalFollowing,
      color: "purple",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      href: `/main/profile/${user?._id}`,
    },
  ];

  const statCards = isCoach ? coachStatCards : athleteStatCards;

  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(" ")[0]}
            </h1>
            <span
              className={`
              px-2.5 py-0.5 text-xs font-semibold rounded-full
              ${
                isCoach
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-indigo-100 text-indigo-700"
              }
            `}
            >
              {isCoach ? "Coach" : "Athlete"}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {isCoach
              ? "Manage your plans and track your athletes"
              : "Here's what's happening with your fitness"}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isCoach && (
            <Link
              href="/main/plans/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Plan
            </Link>
          )}
          <Link
            href="/main/workouts/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Log Workout
          </Link>
        </div>
      </div>

      {/* Role banner */}
      {isCoach && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-emerald-800">
              Coach Dashboard
            </p>
            <p className="text-xs text-emerald-600 mt-0.5">
              You can create workout plans for your athletes and manage your
              community
            </p>
          </div>
          <Link
            href="/main/plans/create"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
          >
            Create a plan →
          </Link>
        </div>
      )}

      {!isCoach && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-indigo-800">
              Athlete Dashboard
            </p>
            <p className="text-xs text-indigo-600 mt-0.5">
              Log workouts, track progress and follow coaches to get structured
              training plans
            </p>
          </div>
          <Link
            href="/main/workouts/create"
            className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 underline underline-offset-2"
          >
            Log workout →
          </Link>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorMap[card.color]}`}
              >
                {card.icon}
              </div>
            </div>
            {loading ? (
              <div className="h-7 w-12 bg-gray-200 rounded animate-pulse mb-1" />
            ) : (
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            )}
            <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <StatsChart />
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div
          className={`grid gap-3 ${isCoach ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4"}`}
        >
          <Link
            href="/main/workouts/create"
            className="flex flex-col items-center gap-2 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-indigo-700 text-center">
              Log Workout
            </span>
          </Link>

          <Link
            href="/main/workouts"
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">
              My Workouts
            </span>
          </Link>

          {isCoach ? (
            <Link
              href="/main/plans/create"
              className="flex flex-col items-center gap-2 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-emerald-700 text-center">
                Create Plan
              </span>
            </Link>
          ) : (
            <Link
              href="/main/plans"
              className="flex flex-col items-center gap-2 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-emerald-700 text-center">
                Browse Plans
              </span>
            </Link>
          )}

          <Link
            href={`/main/profile/${user?._id}`}
            className="flex flex-col items-center gap-2 p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-amber-700 text-center">
              My Profile
            </span>
          </Link>

          <Link
            href="/main/search"
            className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group"
          >
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5 text-white"
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
            <span className="text-xs font-medium text-purple-700 text-center">
              Find People
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
