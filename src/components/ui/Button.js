"use client";

const variants = {
  primary: "bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm",
  secondary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm",
  outline: "border border-indigo-500 text-indigo-500 hover:bg-indigo-50",
  danger: "bg-red-500 hover:bg-red-600 text-white shadow-sm",
  ghost: "text-gray-600 hover:bg-gray-100",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  fullWidth = false,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading && (
        <svg
          className="animate-spin w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;