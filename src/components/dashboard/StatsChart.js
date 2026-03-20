"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import api from "@/lib/api";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
        <p className="text-xs font-medium text-gray-700">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StatsChart = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("weekly");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get("/workouts?limit=50");
      const workouts = res.data.workouts;
      buildWeeklyData(workouts);
      buildProgressData(workouts);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const buildWeeklyData = (workouts) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = Array(7).fill(0);
    const durations = Array(7).fill(0);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    workouts.forEach((w) => {
      const date = new Date(w.createdAt);
      if (date >= oneWeekAgo) {
        const day = date.getDay();
        counts[day]++;
        durations[day] += w.duration || 0;
      }
    });

    setWeeklyData(
      days.map((day, i) => ({
        day,
        workouts: counts[i],
        duration: durations[i],
      }))
    );
  };

  const buildProgressData = (workouts) => {
    const sorted = [...workouts]
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(-10);

    setProgressData(
      sorted.map((w, i) => ({
        name: `#${i + 1}`,
        duration: w.duration,
        exercises: w.exercises?.length || 0,
        title: w.title,
      }))
    );
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

      {/* Header + tabs */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-sm font-semibold text-gray-800">Progress</h2>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "weekly"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            This week
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "progress"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Progress
          </button>
        </div>
      </div>

      <div className="p-5">
        {activeTab === "weekly" ? (
          <div>
            <p className="text-xs text-gray-400 mb-4">
              Workouts logged this week
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="workouts"
                  name="Workouts"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="duration"
                  name="Minutes"
                  fill="#c7d2fe"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div>
            <p className="text-xs text-gray-400 mb-4">
              Last 10 workout durations
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }}
                />
                <Line
                  type="monotone"
                  dataKey="duration"
                  name="Duration (min)"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ fill: "#6366f1", r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="exercises"
                  name="Exercises"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsChart;