"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProfileHeader from "@/components/profile/ProfileHeader";
import FollowList from "@/components/profile/FollowList";
import WorkoutCard from "@/components/workout/WorkoutCard";
import PlanCard from "@/components/plan/PlanCard";
import Badge from "@/components/ui/Badge";
import useAuth from "@/hooks/useAuth";
import api from "@/lib/api";

const TABS = ["workouts", "plans", "connections"];

export default function ProfilePage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workoutsLoading, setWorkoutsLoading] = useState(false);
  const [plansLoading, setPlansLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("workouts");
  const [error, setError] = useState("");

  const isOwnProfile = currentUser?._id === id;

  useEffect(() => {
    fetchProfile();
  }, [id]);

  useEffect(() => {
    if (activeTab === "workouts" && workouts.length === 0) {
      fetchWorkouts();
    }
    if (activeTab === "plans" && plans.length === 0) {
      fetchPlans();
    }
  }, [activeTab]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/users/${id}`);
      setProfile(res.data.user);
    } catch (err) {
      setError("User not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkouts = async () => {
    try {
      setWorkoutsLoading(true);
      const res = await api.get("/workouts?limit=6");
      setWorkouts(res.data.workouts);
    } catch (err) {
      console.error("Failed to fetch workouts:", err);
    } finally {
      setWorkoutsLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      setPlansLoading(true);
      const res = await api.get("/plans?limit=6");
      setPlans(res.data.plans);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
    } finally {
      setPlansLoading(false);
    }
  };

  const handleFollowChange = () => {
    fetchProfile();
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-40" />
              <div className="h-4 bg-gray-100 rounded animate-pulse w-64" />
              <div className="h-4 bg-gray-100 rounded animate-pulse w-32" />
            </div>
          </div>
        </div>
        <div className="h-10 bg-gray-100 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-36 bg-white border border-gray-200 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-gray-700 mb-1">
          User not found
        </h3>
        <p className="text-sm text-gray-400 mb-4">{error}</p>
        <Link
          href="/main/dashboard"
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">

      {/* Back button */}
      <div className="flex items-center gap-2">
        <Link
          href="/main/dashboard"
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
        <span className="text-sm text-gray-500">
          {isOwnProfile ? "My Profile" : "User Profile"}
        </span>
      </div>

      {/* Profile header */}
      <ProfileHeader
        user={profile}
        onFollowChange={handleFollowChange}
      />

      {/* Edit profile section — own profile only */}
      {isOwnProfile && (
        <EditProfileSection
          user={profile}
          onUpdate={fetchProfile}
        />
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1 py-3 text-sm font-medium capitalize transition-colors
              ${activeTab === tab
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "workouts" && (
        <div className="flex flex-col gap-4">
          {workoutsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-white border border-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : workouts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white border border-gray-200 rounded-xl">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-indigo-400"
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
              <p className="text-sm font-medium text-gray-600 mb-1">
                No workouts yet
              </p>
              {isOwnProfile && (
                <Link
                  href="/main/workouts/create"
                  className="text-xs text-indigo-600 hover:underline mt-1"
                >
                  Log your first workout
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workouts.map((workout) => (
                  <WorkoutCard
                    key={workout._id}
                    workout={workout}
                    onDelete={isOwnProfile ? fetchWorkouts : undefined}
                  />
                ))}
              </div>
              <Link
                href="/main/workouts"
                className="text-center text-sm text-indigo-600 hover:underline font-medium"
              >
                View all workouts
              </Link>
            </>
          )}
        </div>
      )}

      {activeTab === "plans" && (
        <div className="flex flex-col gap-4">
          {profile?.role !== "coach" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white border border-gray-200 rounded-xl">
              <Badge label="athlete" color="gray" />
              <p className="text-sm text-gray-500 mt-3">
                Only coaches can create plans
              </p>
            </div>
          ) : plansLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-white border border-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : plans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white border border-gray-200 rounded-xl">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                No plans yet
              </p>
              {isOwnProfile && (
                <Link
                  href="/main/plans/create"
                  className="text-xs text-emerald-600 hover:underline mt-1"
                >
                  Create your first plan
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {plans.map((plan) => (
                  <PlanCard
                    key={plan._id}
                    plan={plan}
                    isCoach={isOwnProfile && profile?.role === "coach"}
                    onDelete={isOwnProfile ? fetchPlans : undefined}
                  />
                ))}
              </div>
              <Link
                href="/main/plans"
                className="text-center text-sm text-indigo-600 hover:underline font-medium"
              >
                View all plans
              </Link>
            </>
          )}
        </div>
      )}

      {activeTab === "connections" && (
        <FollowList
          followers={profile?.followers}
          following={profile?.following}
        />
      )}
    </div>
  );
}

function EditProfileSection({ user, onUpdate }) {
  const { updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await api.put("/users/profile", form);
      updateUser(res.data.user);
      onUpdate();
      setEditing(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Edit Profile
      </button>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">
          Edit Profile
        </h3>
        <button
          onClick={() => setEditing(false)}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            value={form.bio}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, bio: e.target.value }))
            }
            rows={3}
            maxLength={200}
            placeholder="Tell us about yourself..."
            className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-400 text-right">
            {form.bio.length}/200
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
