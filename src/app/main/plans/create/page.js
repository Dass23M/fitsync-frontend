"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PlanForm from "@/components/plan/PlanForm";
import useAuth from "@/hooks/useAuth";
import api from "@/lib/api";

export default function CreatePlanPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user?.role !== "coach") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-gray-700 mb-1">
          Access Denied
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Only coaches can create workout plans
        </p>
        <Link
          href="/main/plans"
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          Back to Plans
        </Link>
      </div>
    );
  }

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");
      await api.post("/plans", formData);
      router.push("/main/plans");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create plan. Try again."
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
          href="/main/plans"
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
          <h1 className="text-xl font-bold text-gray-900">Create Plan</h1>
          <p className="text-sm text-gray-500">
            Build a structured workout plan for your athletes
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

      <PlanForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}