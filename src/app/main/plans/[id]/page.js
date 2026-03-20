"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PlanForm from "@/components/plan/PlanForm";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import WorkoutCard from "@/components/workout/WorkoutCard";
import { formatDate, getDifficultyColor } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import api from "@/lib/api";

export default function PlanDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const { user } = useAuth();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const isOwnPlan = plan?.coach?._id === user?._id;

  useEffect(() => {
    fetchPlan();
  }, [id]);

  const fetchPlan = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/plans/${id}`);
      setPlan(res.data.plan);
    } catch (err) {
      setError("Plan not found");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      setUpdating(true);
      setError("");
      await api.put(`/plans/${id}`, formData);
      await fetchPlan();
      router.push(`/main/plans/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update plan."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    try {
      setDeleting(true);
      await api.delete(`/plans/${id}`);
      router.push("/main/plans");
    } catch (err) {
      setError("Failed to delete plan.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error && !plan) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-500 mb-4">{error}</p>
        <Link
          href="/main/plans"
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          Back to plans
        </Link>
      </div>
    );
  }

  if (isEditMode && isOwnPlan) {
    return (
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <Link
            href={`/main/plans/${id}`}
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
            <h1 className="text-xl font-bold text-gray-900">Edit Plan</h1>
            <p className="text-sm text-gray-500">
              Update your workout plan
            </p>
          </div>
        </div>
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <PlanForm
          initialData={plan}
          onSubmit={handleUpdate}
          loading={updating}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/main/plans"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
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
          <h1 className="text-xl font-bold text-gray-900 truncate">
            {plan?.title}
          </h1>
        </div>
        {isOwnPlan && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href={`/main/plans/${id}?edit=true`}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </Link>
            <Button
              variant="danger"
              size="sm"
              loading={deleting}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Plan info card */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge
            label={plan?.difficulty}
            color={getDifficultyColor(plan?.difficulty)}
          />
        </div>

        {plan?.description && (
          <p className="text-sm text-gray-600 mb-4">
            {plan.description}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400">Duration</p>
            <p className="text-sm font-semibold text-gray-800">
              {plan?.durationWeeks} weeks
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400">Workouts</p>
            <p className="text-sm font-semibold text-gray-800">
              {plan?.workouts?.length}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400">Subscribers</p>
            <p className="text-sm font-semibold text-gray-800">
              {plan?.subscribers?.length}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400">Created</p>
            <p className="text-sm font-semibold text-gray-800">
              {formatDate(plan?.createdAt)}
            </p>
          </div>
        </div>

        {/* Coach info */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <Avatar
            src={plan?.coach?.avatar}
            name={plan?.coach?.name}
            size="md"
          />
          <div>
            <p className="text-xs text-gray-400">Created by</p>
            <Link
              href={`/main/profile/${plan?.coach?._id}`}
              className="text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors"
            >
              {plan?.coach?.name}
            </Link>
          </div>
          <Badge label="coach" color="indigo" className="ml-auto" />
        </div>
      </div>

      {/* Workouts in plan */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-800">
          Workouts in this plan ({plan?.workouts?.length})
        </h2>
        {plan?.workouts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 bg-white border border-gray-200 rounded-xl text-center">
            <p className="text-sm text-gray-400">
              No workouts added to this plan yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plan?.workouts?.map((workout) => (
              <WorkoutCard
                key={workout._id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}