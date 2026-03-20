"use client";

const ExerciseInput = ({ exercise, index, onChange, onRemove }) => {
  const handleChange = (field, value) => {
    onChange(index, { ...exercise, [field]: value });
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-indigo-600">
          Exercise {index + 1}
        </span>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Exercise name */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Exercise name (e.g. Bench Press)"
          value={exercise.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Sets, reps, weight row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Sets</label>
          <input
            type="number"
            min="1"
            placeholder="3"
            value={exercise.sets}
            onChange={(e) => handleChange("sets", Number(e.target.value))}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Reps</label>
          <input
            type="number"
            min="1"
            placeholder="10"
            value={exercise.reps}
            onChange={(e) => handleChange("reps", Number(e.target.value))}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Weight</label>
          <input
            type="number"
            min="0"
            placeholder="60"
            value={exercise.weight}
            onChange={(e) => handleChange("weight", Number(e.target.value))}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Unit</label>
          <select
            value={exercise.unit}
            onChange={(e) => handleChange("unit", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-3">
        <input
          type="text"
          placeholder="Notes (optional)"
          value={exercise.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default ExerciseInput;