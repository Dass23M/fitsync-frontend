"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ExerciseInput from "@/components/workout/ExerciseInput";

const muscleGroups = [
  "chest", "back", "shoulders", "arms", "legs", "core", "cardio", "full body",
];

const defaultExercise = {
  name: "",
  sets: "",
  reps: "",
  weight: 0,
  unit: "kg",
  notes: "",
};

const WorkoutForm = ({ initialData, onSubmit, loading }) => {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    difficulty: initialData?.difficulty || "beginner",
    duration: initialData?.duration || "",
    muscleGroups: initialData?.muscleGroups || [],
    notes: initialData?.notes || "",
    exercises: initialData?.exercises || [{ ...defaultExercise }],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleMuscleGroup = (group) => {
    setForm((prev) => ({
      ...prev,
      muscleGroups: prev.muscleGroups.includes(group)
        ? prev.muscleGroups.filter((g) => g !== group)
        : [...prev.muscleGroups, group],
    }));
  };

  const addExercise = () => {
    setForm((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { ...defaultExercise }],
    }));
  };

  const updateExercise = (index, updated) => {
    setForm((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => (i === index ? updated : ex)),
    }));
  };

  const removeExercise = (index) => {
    setForm((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.duration) newErrors.duration = "Duration is required";
    if (form.exercises.length === 0) newErrors.exercises = "Add at least one exercise";
    form.exercises.forEach((ex, i) => {
      if (!ex.name.trim()) newErrors[`exercise_${i}`] = "Exercise name is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Basic info */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Basic Information
        </h3>
        <div className="flex flex-col gap-4">
          <Input
            label="Workout Title"
            name="title"
            placeholder="e.g. Morning Push Day"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={errors.title}
            required
          />

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
              label="Duration (minutes)"
              name="duration"
              type="number"
              placeholder="45"
              value={form.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              error={errors.duration}
              required
            />
          </div>

          <Input
            label="Notes"
            name="notes"
            placeholder="Any notes about this workout..."
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </div>
      </div>

      {/* Muscle groups */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Muscle Groups
        </h3>
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => toggleMuscleGroup(group)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-full
                border transition-all duration-200
                ${form.muscleGroups.includes(group)
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
                }
              `}
            >
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Exercises ({form.exercises.length})
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addExercise}
          >
            + Add Exercise
          </Button>
        </div>

        {errors.exercises && (
          <p className="text-xs text-red-500 mb-3">{errors.exercises}</p>
        )}

        <div className="flex flex-col gap-3">
          {form.exercises.map((exercise, index) => (
            <div key={index}>
              <ExerciseInput
                exercise={exercise}
                index={index}
                onChange={updateExercise}
                onRemove={removeExercise}
              />
              {errors[`exercise_${index}`] && (
                <p className="text-xs text-red-500 mt-1">
                  {errors[`exercise_${index}`]}
                </p>
              )}
            </div>
          ))}
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
        {initialData ? "Update Workout" : "Save Workout"}
      </Button>
    </form>
  );
};

export default WorkoutForm;