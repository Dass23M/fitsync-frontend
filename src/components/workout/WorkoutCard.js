"use client";

import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { formatDate, getDifficultyColor, getMuscleGroupColor } from "@/lib/utils";

const WorkoutCard = ({ workout, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">

      {/* Workout image */}
      {workout.image && (
        <div className="relative w-full h-40">
          <Image
            src={workout.image}
            alt={workout.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4">

        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <Link
              href={`/workouts/${workout._id}`}
              className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1"
            >
              {workout.title}
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <Avatar
                src={workout.user?.avatar}
                name={workout.user?.name}
                size="sm"
              />
              <span className="text-xs text-gray-500">{workout.user?.name}</span>
            </div>
          </div>
          <Badge
            label={workout.difficulty}
            color={getDifficultyColor(workout.difficulty)}
          />
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5 text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs">{workout.exercises?.length} exercises</span>
          </div>
          <span className="text-xs text-gray-400 ml-auto">
            {formatDate(workout.createdAt)}
          </span>
        </div>

        {/* Muscle group badges */}
        {workout.muscleGroups?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {workout.muscleGroups.slice(0, 3).map((group) => (
              <Badge
                key={group}
                label={group}
                color={getMuscleGroupColor(group)}
              />
            ))}
            {workout.muscleGroups.length > 3 && (
              <Badge
                label={`+${workout.muscleGroups.length - 3}`}
                color="gray"
              />
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Link
            href={`/workouts/${workout._id}`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </Link>
          <Link
            href={`/workouts/${workout._id}?edit=true`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(workout._id)}
              className="flex items-center justify-center px-3 py-2 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;