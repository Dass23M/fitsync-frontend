"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";
import api from "@/lib/api";

const ProfileHeader = ({ user, onFollowChange }) => {
  const { user: currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const isOwnProfile = currentUser?._id === user?._id;
  const isFollowing = user?.followers?.some(
    (f) => f._id === currentUser?._id || f === currentUser?._id
  );

  const handleFollow = async () => {
    try {
      setLoading(true);
      if (isFollowing) {
        await api.post(`/users/${user._id}/unfollow`);
      } else {
        await api.post(`/users/${user._id}/follow`);
      }
      onFollowChange?.();
    } catch (error) {
      console.error("Follow error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await api.post("/upload/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      updateUser({ avatar: res.data.avatar });
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

        {/* Avatar section */}
        <div className="relative flex-shrink-0">
          <Avatar
            src={user?.avatar}
            name={user?.name}
            size="xl"
          />
          {isOwnProfile && (
            <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
              {uploading ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          )}
        </div>

        {/* Info section */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-gray-900">
              {user?.name}
            </h1>
            <Badge
              label={user?.role}
              color={user?.role === "coach" ? "indigo" : "gray"}
            />
          </div>

          {user?.bio && (
            <p className="text-sm text-gray-500 mb-3 max-w-md">
              {user.bio}
            </p>
          )}

          {/* Stats row */}
          <div className="flex items-center justify-center sm:justify-start gap-6 mb-4">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {user?.followers?.length || 0}
              </p>
              <p className="text-xs text-gray-400">Followers</p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {user?.following?.length || 0}
              </p>
              <p className="text-xs text-gray-400">Following</p>
            </div>
          </div>

          {/* Action buttons */}
          {!isOwnProfile && (
            <Button
              variant={isFollowing ? "outline" : "primary"}
              size="sm"
              loading={loading}
              onClick={handleFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;