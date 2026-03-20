"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import WorkoutForm from "@/components/workout/WorkoutForm";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { formatDate, getDifficultyColor, getMuscleGroupColor } from "@/lib/utils";
import api from "@/lib/api";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const fetchWorkout = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/workouts/${id}`);
      setWorkout(res.data.workout);
    } catch (err) {
      setError("Workout not found");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      setUpdating(true);
      setError("");
      await api.put(`/workouts/${id}`, formData);
      await fetchWorkout();
      router.push(`/main/workouts/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update workout."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this workout?")) return;
    try {
      setDeleting(true);
      await api.delete(`/workouts/${id}`);
      router.push("/main/workouts");
    } catch (err) {
      setError("Failed to delete workout.");
    } finally {
      setDeleting(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);
      await api.post(`/upload/workout/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchWorkout();
    } catch (err) {
      setError("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error && !workout) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-500 mb-4">{error}</p>
        <Link
          href="/main/workouts"
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          Back to workouts
        </Link>
      </div>
    );
  }

  if (isEditMode) {
    return (
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <Link
            href={`/main/workouts/${id}`}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Edit Workout</h1>
            <p className="text-sm text-gray-500">Update your workout details</p>
          </div>
        </div>
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <WorkoutForm
          initialData={workout}
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
        <div className="flex items-center gap-3">
          <Link
            href="/main/workouts"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-900 truncate">
            {workout?.title}
          </h1>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href={`/main/workouts/${id}?edit=true`}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Workout image */}
      <div className="relative">
        {workout?.image ? (
          <div className="relative w-full h-52 rounded-xl overflow-hidden">
            <Image
              src={workout.image}
              alt={workout.title}
              fill
              className="object-cover"
            />
            <label className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded-lg cursor-pointer transition-colors">
              {uploadingImage ? "Uploading..." : "Change Photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-36 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            {uploadingImage ? (
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-400">Add workout photo</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        )}
      </div>

      {/* Info card */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge
            label={workout?.difficulty}
            color={getDifficultyColor(workout?.difficulty)}
          />
          {workout?.muscleGroups?.map((group) => (
            <Badge
              key={group}
              label={group}
              color={getMuscleGroupColor(group)}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400">Duration</p>
            <p className="text-sm font-semibold text-gray-800">
              {workout?.duration} min
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400">Exercises</p>
            <p className="text-sm font-semibold text-gray-800">
              {workout?.exercises?.length}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400">Logged on</p>
            <p className="text-sm font-semibold text-gray-800">
              {formatDate(workout?.createdAt)}
            </p>
          </div>
        </div>

        {workout?.notes && (
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Notes</p>
            <p className="text-sm text-gray-600">{workout.notes}</p>
          </div>
        )}
      </div>

      {/* Exercises */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">
            Exercises ({workout?.exercises?.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {workout?.exercises?.map((exercise, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-5 py-4"
            >
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-indigo-600">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {exercise.name}
                </p>
                {exercise.notes && (
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {exercise.notes}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 text-right">
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-800">
                    {exercise.sets}
                  </p>
                  <p className="text-xs text-gray-400">sets</p>
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-800">
                    {exercise.reps}
                  </p>
                  <p className="text-xs text-gray-400">reps</p>
                </div>
                {exercise.weight > 0 && (
                  <>
                    <div className="w-px h-6 bg-gray-200" />
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-800">
                        {exercise.weight}{exercise.unit}
                      </p>
                      <p className="text-xs text-gray-400">weight</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logged by */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={workout?.user?.avatar}
            name={workout?.user?.name}
            size="md"
          />
          <div>
            <p className="text-xs text-gray-400">Logged by</p>
            <Link
              href={`/main/profile/${workout?.user?._id}`}
              className="text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors"
            >
              {workout?.user?.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}