"use client";

import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { formatDate, getDifficultyColor } from "@/lib/utils";

const PlanCard = ({ plan, onDelete, isCoach }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5">

        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <Link
              href={`/plans/${plan._id}`}
              className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1"
            >
              {plan.title}
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <Avatar
                src={plan.coach?.avatar}
                name={plan.coach?.name}
                size="sm"
              />
              <span className="text-xs text-gray-500">{plan.coach?.name}</span>
              <Badge label="coach" color="indigo" />
            </div>
          </div>
          <Badge
            label={plan.difficulty}
            color={getDifficultyColor(plan.difficulty)}
          />
        </div>

        {/* Description */}
        {plan.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {plan.description}
          </p>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-gray-500">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">{plan.durationWeeks} weeks</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-xs">{plan.workouts?.length} workouts</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs">{plan.subscribers?.length} subscribers</span>
          </div>
          <span className="text-xs text-gray-400 ml-auto">
            {formatDate(plan.createdAt)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Link
            href={`/plans/${plan._id}`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View
          </Link>
          {isCoach && (
            <>
              <Link
                href={`/plans/${plan._id}?edit=true`}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
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
                Edit
              </Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(plan._id)}
                  className="flex items-center justify-center px-3 py-2 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;