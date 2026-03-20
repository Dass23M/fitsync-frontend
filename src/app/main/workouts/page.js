"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import WorkoutCard from "@/components/workout/WorkoutCard";
import WorkoutFilters from "@/components/workout/WorkoutFilters";
import api from "@/lib/api";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    muscleGroup: "",
    difficulty: "",
    minDuration: "",
    maxDuration: "",
  });

  const fetchWorkouts = useCallback(
    async (page = 1, currentFilters = filters) => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", 9);
        if (currentFilters.search)
          params.append("search", currentFilters.search);
        if (currentFilters.muscleGroup)
          params.append("muscleGroup", currentFilters.muscleGroup);
        if (currentFilters.difficulty)
          params.append("difficulty", currentFilters.difficulty);
        if (currentFilters.minDuration)
          params.append("minDuration", currentFilters.minDuration);
        if (currentFilters.maxDuration)
          params.append("maxDuration", currentFilters.maxDuration);
        const res = await api.get(`/workouts?${params.toString()}`);
        setWorkouts(res.data.workouts);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setTotalWorkouts(res.data.totalWorkouts);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchWorkouts(1, filters);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(delay);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      muscleGroup: "",
      difficulty: "",
      minDuration: "",
      maxDuration: "",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this workout?")) return;
    try {
      await api.delete(`/workouts/${id}`);
      fetchWorkouts(currentPage, filters);
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  };

  const handlePageChange = (newPage) => {
    fetchWorkouts(newPage, filters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            My Workouts
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {totalWorkouts} workout{totalWorkouts !== 1 ? "s" : ""} logged
          </p>
        </div>
        <Link
          href="/main/workouts/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors self-start sm:self-auto"
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

      {/* Filters */}
      <WorkoutFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Workout grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="h-40 bg-gray-100 rounded-lg animate-pulse mb-4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
              <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
            </div>
          ))}
        </div>
      ) : workouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-indigo-400"
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
          <h3 className="text-base font-semibold text-gray-700 mb-1">
            No workouts found
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            {filters.search || filters.muscleGroup || filters.difficulty
              ? "Try adjusting your filters"
              : "Start by logging your first workout"}
          </p>
          <Link
            href="/main/workouts/create"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Log First Workout
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              onDelete={handleDelete}
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
              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="text-gray-400 text-sm px-1">
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