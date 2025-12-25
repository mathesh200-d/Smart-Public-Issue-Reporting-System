// Placeholder ML classification function
// In production, this would call a real ML model API

export type IssueCategory = "trash" | "broken_light" | "pothole" | "unclear";

export interface ClassificationResult {
  category: IssueCategory;
  label: string;
  department: string;
  isValid: boolean;
}

const categoryMap: Record<IssueCategory, { label: string; department: string }> = {
  trash: {
    label: "Trash / Garbage",
    department: "Sanitation Department",
  },
  broken_light: {
    label: "Broken Street Light",
    department: "Electrical Department",
  },
  pothole: {
    label: "Pothole",
    department: "Roads Department",
  },
  unclear: {
    label: "Unclear / Cannot Identify",
    department: "",
  },
};

export const classifyImage = async (imageFile: File): Promise<ClassificationResult> => {
  // Simulate ML processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Placeholder: randomly assign a category for demonstration
  // In production, this would send the image to an ML model
  const categories: IssueCategory[] = ["trash", "broken_light", "pothole", "unclear"];
  const randomIndex = Math.floor(Math.random() * categories.length);
  const category = categories[randomIndex];

  const info = categoryMap[category];

  return {
    category,
    label: info.label,
    department: info.department,
    isValid: category !== "unclear",
  };
};

export const getCategoryIcon = (category: IssueCategory): string => {
  switch (category) {
    case "trash":
      return "🗑️";
    case "broken_light":
      return "💡";
    case "pothole":
      return "🕳️";
    default:
      return "❓";
  }
};
