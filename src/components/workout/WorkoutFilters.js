"use client";

const muscleGroups = [
  "chest", "back", "shoulders", "arms", "legs", "core", "cardio", "full body",
];

const difficulties = ["beginner", "intermediate", "advanced"];

const WorkoutFilters = ({ filters, onChange, onReset }) => {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Search */}
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search workouts..."
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white"
          />
        </div>

        {/* Muscle group */}
        <select
          value={filters.muscleGroup || ""}
          onChange={(e) => handleChange("muscleGroup", e.target.value)}
          className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white"
        >
          <option value="">All muscles</option>
          {muscleGroups.map((g) => (
            <option key={g} value={g}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </option>
          ))}
        </select>

        {/* Difficulty */}
        <select
          value={filters.difficulty || ""}
          onChange={(e) => handleChange("difficulty", e.target.value)}
          className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white"
        >
          <option value="">All levels</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>

        {/* Duration range */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min min"
            value={filters.minDuration || ""}
            onChange={(e) => handleChange("minDuration", e.target.value)}
            className="w-24 px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white"
          />
          <span className="text-gray-400 text-sm">-</span>
          <input
            type="number"
            placeholder="Max min"
            value={filters.maxDuration || ""}
            onChange={(e) => handleChange("maxDuration", e.target.value)}
            className="w-24 px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white"
          />
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="px-4 py-2.5 text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default WorkoutFilters;