"use client";

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
  hint,
  autoComplete,
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`
          w-full px-3 py-2.5 text-sm
          bg-white border rounded-lg
          text-gray-900 placeholder-gray-400
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          disabled:bg-gray-50 disabled:cursor-not-allowed
          ${error
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-200 hover:border-gray-300"
          }
        `}
      />
      {hint && !error && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;