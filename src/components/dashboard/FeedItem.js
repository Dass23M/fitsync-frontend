"use client";

import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { timeAgo } from "@/lib/utils";

const iconMap = {
  workout_logged: (
    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
  ),
  plan_created: (
    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
  ),
  user_followed: (
    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    </div>
  ),
};

const FeedItem = ({ activity }) => {
  const renderContent = () => {
    switch (activity.type) {
      case "workout_logged":
        return (
          <p className="text-sm text-gray-700">
            <Link
              href={`/main/profile/${activity.user?._id}`}
              className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              {activity.user?.name}
            </Link>
            {" logged "}
            {activity.workout ? (
              <Link
                href={`/main/workouts/${activity.workout._id}`}
                className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                {activity.workout.title}
              </Link>
            ) : (
              <span className="font-medium text-gray-600">a workout</span>
            )}
          </p>
        );

      case "plan_created":
        return (
          <p className="text-sm text-gray-700">
            <Link
              href={`/main/profile/${activity.user?._id}`}
              className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              {activity.user?.name}
            </Link>
            {" created a new plan "}
            {activity.plan ? (
              <Link
                href={`/main/plans/${activity.plan._id}`}
                className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {activity.plan.title}
              </Link>
            ) : (
              <span className="font-medium text-gray-600">a plan</span>
            )}
          </p>
        );

      case "user_followed":
        return (
          <p className="text-sm text-gray-700">
            <Link
              href={`/main/profile/${activity.user?._id}`}
              className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              {activity.user?.name}
            </Link>
            {" started following "}
            <Link
              href={`/main/profile/${activity.targetUser?._id}`}
              className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              {activity.targetUser?.name}
            </Link>
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors rounded-xl">
      {iconMap[activity.type]}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <Avatar
            src={activity.user?.avatar}
            name={activity.user?.name}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            {renderContent()}
            <p className="text-xs text-gray-400 mt-1">
              {timeAgo(activity.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;