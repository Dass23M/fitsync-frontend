export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateString);
};

export const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "beginner":
      return "green";
    case "intermediate":
      return "amber";
    case "advanced":
      return "red";
    default:
      return "gray";
  }
};

export const getMuscleGroupColor = (muscleGroup) => {
  const colors = {
    chest: "blue",
    back: "purple",
    shoulders: "teal",
    arms: "orange",
    legs: "red",
    core: "yellow",
    cardio: "pink",
    "full body": "indigo",
  };
  return colors[muscleGroup] || "gray";
};