"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import PlanCard from "@/components/plan/PlanCard";
import useAuth from "@/hooks/useAuth";
import api from "@/lib/api";

const difficulties = ["beginner", "intermediate", "advanced"];

export default function PlansPage() {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPlans, setTotalPlans] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    difficulty: "",
    minWeeks: "",
    maxWeeks: "",
  });

  const fetchPlans = useCallback(
    async (page = 1, currentFilters = filters) => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", 9);
        if (currentFilters.search)
          params.append("search", currentFilters.search);
        if (currentFilters.difficulty)
          params.append("difficulty", currentFilters.difficulty);
        if (currentFilters.minWeeks)
          params.append("minWeeks", currentFilters.minWeeks);
        if (currentFilters.maxWeeks)
          params.append("maxWeeks", currentFilters.maxWeeks);
        const res = await api.get(`/plans?${params.toString()}`);
        setPlans(res.data.plans);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setTotalPlans(res.data.totalPlans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchPlans(1, filters);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(delay);
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      difficulty: "",
      minWeeks: "",
      maxWeeks: "",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    try {
      await api.delete(`/plans/${id}`);
      fetchPlans(currentPage, filters);
    } catch (error) {
      console.error("Failed to delete plan:", error);
    }
  };

  const handlePageChange = (newPage) => {
    fetchPlans(newPage, filters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Workout Plans
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {totalPlans} plan{totalPlans !== 1 ? "s" : ""} available
          </p>
        </div>
        {user?.role === "coach" && (
          <Link
            href="/main/plans/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors self-start sm:self-auto"
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
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search */}
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
              placeholder="Search plans..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white"
            />
          </div>

          {/* Difficulty */}
          <select
            value={filters.difficulty}
            onChange={(e) =>
              handleFilterChange("difficulty", e.target.value)
            }
            className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All levels</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </option>
            ))}
          </select>

          {/* Week range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min wks"
              value={filters.minWeeks}
              onChange={(e) =>
                handleFilterChange("minWeeks", e.target.value)
              }
              className="w-24 px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <span className="text-gray-400 text-sm">-</span>
            <input
              type="number"
              placeholder="Max wks"
              value={filters.maxWeeks}
              onChange={(e) =>
                handleFilterChange("maxWeeks", e.target.value)
              }
              className="w-24 px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="px-4 py-2.5 text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Plans grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-3/4" />
              <div className="h-3 bg-gray-100 rounded animate-pulse mb-2 w-full" />
              <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
            </div>
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-emerald-400"
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
          <h3 className="text-base font-semibold text-gray-700 mb-1">
            No plans found
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            {filters.search || filters.difficulty
              ? "Try adjusting your filters"
              : user?.role === "coach"
              ? "Create your first workout plan"
              : "No plans available yet"}
          </p>
          {user?.role === "coach" && (
            <Link
              href="/main/plans/create"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Create First Plan
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              onDelete={handleDelete}
              isCoach={user?.role === "coach" &&
                plan.coach?._id === user?._id}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`
                      w-9 h-9 text-sm font-medium rounded-lg transition-colors
                      ${currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"
                      }
                    `}
                  >
                    {page}
                  </button>
                );
              }
              if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return (
                  <span
                    key={page}
                    className="text-gray-400 text-sm px-1"
                  >
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}