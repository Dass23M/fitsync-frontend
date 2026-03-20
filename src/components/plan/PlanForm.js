"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import api from "@/lib/api";

const PlanForm = ({ initialData, onSubmit, loading }) => {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    difficulty: initialData?.difficulty || "beginner",
    durationWeeks: initialData?.durationWeeks || "",
    workouts: initialData?.workouts?.map((w) => w._id || w) || [],
  });

  const [errors, setErrors] = useState({});
  const [availableWorkouts, setAvailableWorkouts] = useState([]);
  const [workoutSearch, setWorkoutSearch] = useState("");
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoadingWorkouts(true);
      const res = await api.get("/workouts?limit=50");
      setAvailableWorkouts(res.data.workouts);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    } finally {
      setLoadingWorkouts(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleWorkout = (workoutId) => {
    setForm((prev) => ({
      ...prev,
      workouts: prev.workouts.includes(workoutId)
        ? prev.workouts.filter((id) => id !== workoutId)
        : [...prev.workouts, workoutId],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.durationWeeks) newErrors.durationWeeks = "Duration is required";
    if (form.workouts.length === 0)
      newErrors.workouts = "Select at least one workout";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const filteredWorkouts = availableWorkouts.filter((w) =>
    w.title.toLowerCase().includes(workoutSearch.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Basic info */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Plan Information
        </h3>
        <div className="flex flex-col gap-4">
          <Input
            label="Plan Title"
            name="title"
            placeholder="e.g. 8-Week Strength Builder"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={errors.title}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Describe what this plan is about..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-400 text-right">
              {form.description.length}/500
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Difficulty <span className="text-red-500">*</span>
              </label>
              <select
                value={form.difficulty}
                onChange={(e) => handleChange("difficulty", e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <Input
              label="Duration (weeks)"
              name="durationWeeks"
              type="number"
              placeholder="8"
              value={form.durationWeeks}
              onChange={(e) => handleChange("durationWeeks", e.target.value)}
              error={errors.durationWeeks}
              required
            />
          </div>
        </div>
      </div>

      {/* Workout selection */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Select Workouts
          </h3>
          <span className="text-xs text-indigo-600 font-medium">
            {form.workouts.length} selected
          </span>
        </div>

        {errors.workouts && (
          <p className="text-xs text-red-500 mb-3">{errors.workouts}</p>
        )}

        {/* Workout search */}
        <div className="relative mb-3">
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
            placeholder="Search your workouts..."
            value={workoutSearch}
            onChange={(e) => setWorkoutSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white"
          />
        </div>

        {/* Workout list */}
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {loadingWorkouts ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredWorkouts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No workouts found
            </p>
          ) : (
            filteredWorkouts.map((workout) => {
              const selected = form.workouts.includes(workout._id);
              return (
                <button
                  key={workout._id}
                  type="button"
                  onClick={() => toggleWorkout(workout._id)}
                  className={`
                    flex items-center justify-between px-4 py-3
                    rounded-lg border text-left
                    transition-all duration-200
                    ${selected
                      ? "bg-indigo-50 border-indigo-300"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${selected ? "text-indigo-700" : "text-gray-800"}`}>
                      {workout.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {workout.duration} min · {workout.difficulty}
                    </p>
                  </div>
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex-shrink-0 ml-3
                    flex items-center justify-center
                    ${selected
                      ? "bg-indigo-600 border-indigo-600"
                      : "border-gray-300"
                    }
                  `}>
                    {selected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={loading}
      >
        {initialData ? "Update Plan" : "Create Plan"}
      </Button>
    </form>
  );
};

export default PlanForm;