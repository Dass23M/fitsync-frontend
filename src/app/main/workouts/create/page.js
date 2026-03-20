"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WorkoutForm from "@/components/workout/WorkoutForm";
import api from "@/lib/api";

export default function CreateWorkoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");
      await api.post("/workouts", formData);
      router.push("/main/workouts");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create workout. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/main/workouts"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Log Workout</h1>
          <p className="text-sm text-gray-500">
            Record your training session
          </p>
        </div>
      </div>

      {/* Server error */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
          <svg
            className="w-4 h-4 text-red-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <WorkoutForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}