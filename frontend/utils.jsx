export const defineColorTheme = (colorTheme) => {
  switch (colorTheme) {
    case "amber":
      document.documentElement.style.setProperty("--primary-50", "#fffbeb");
      document.documentElement.style.setProperty("--primary-100", "#fef3c7");
      document.documentElement.style.setProperty("--primary-200", "#fde68a");
      document.documentElement.style.setProperty("--primary-300", "#fcd34d");
      document.documentElement.style.setProperty("--primary-400", "#fbbf24");
      document.documentElement.style.setProperty("--primary-500", "#f59e0b");
      document.documentElement.style.setProperty("--primary-600", "#d97706");
      document.documentElement.style.setProperty("--primary-700", "#b45309");
      document.documentElement.style.setProperty("--primary-800", "#92400e");
      document.documentElement.style.setProperty("--primary-900", "#78350f");
      document.documentElement.style.setProperty("--primary-950", "#451a03");
      break;
    case "blue":
      document.documentElement.style.setProperty("--primary-50", "#eff6ff");
      document.documentElement.style.setProperty("--primary-100", "#dbeafe");
      document.documentElement.style.setProperty("--primary-200", "#bfdbfe");
      document.documentElement.style.setProperty("--primary-300", "#93c5fd");
      document.documentElement.style.setProperty("--primary-400", "#60a5fa");
      document.documentElement.style.setProperty("--primary-500", "#3b82f6");
      document.documentElement.style.setProperty("--primary-600", "#2563eb");
      document.documentElement.style.setProperty("--primary-700", "#1d4ed8");
      document.documentElement.style.setProperty("--primary-800", "#1e40af");
      document.documentElement.style.setProperty("--primary-900", "#1e3a8a");
      document.documentElement.style.setProperty("--primary-950", "#172554");
      break;
    case "cyan":
      document.documentElement.style.setProperty("--primary-50", "#ecfeff");
      document.documentElement.style.setProperty("--primary-100", "#cffafe");
      document.documentElement.style.setProperty("--primary-200", "#a5f3fc");
      document.documentElement.style.setProperty("--primary-300", "#67e8f9");
      document.documentElement.style.setProperty("--primary-400", "#22d3ee");
      document.documentElement.style.setProperty("--primary-500", "#06b6d4");
      document.documentElement.style.setProperty("--primary-600", "#0891b2");
      document.documentElement.style.setProperty("--primary-700", "#0e7490");
      document.documentElement.style.setProperty("--primary-800", "#155e75");
      document.documentElement.style.setProperty("--primary-900", "#164e63");
      document.documentElement.style.setProperty("--primary-950", "#083344");
      break;
    case "emerald":
      document.documentElement.style.setProperty("--primary-50", "#ecfdf5");
      document.documentElement.style.setProperty("--primary-100", "#d1fae5");
      document.documentElement.style.setProperty("--primary-200", "#a7f3d0");
      document.documentElement.style.setProperty("--primary-300", "#6ee7b7");
      document.documentElement.style.setProperty("--primary-400", "#34d399");
      document.documentElement.style.setProperty("--primary-500", "#10b981");
      document.documentElement.style.setProperty("--primary-600", "#059669");
      document.documentElement.style.setProperty("--primary-700", "#047857");
      document.documentElement.style.setProperty("--primary-800", "#065f46");
      document.documentElement.style.setProperty("--primary-900", "#064e3b");
      document.documentElement.style.setProperty("--primary-950", "#022c22");
      break;
    case "fuchsia":
      document.documentElement.style.setProperty("--primary-50", "#fdf4ff");
      document.documentElement.style.setProperty("--primary-100", "#fae8ff");
      document.documentElement.style.setProperty("--primary-200", "#f5d0fe");
      document.documentElement.style.setProperty("--primary-300", "#f0abfc");
      document.documentElement.style.setProperty("--primary-400", "#e879f9");
      document.documentElement.style.setProperty("--primary-500", "#d946ef");
      document.documentElement.style.setProperty("--primary-600", "#c026d3");
      document.documentElement.style.setProperty("--primary-700", "#a21caf");
      document.documentElement.style.setProperty("--primary-800", "#86198f");
      document.documentElement.style.setProperty("--primary-900", "#701a75");
      document.documentElement.style.setProperty("--primary-950", "#4a044e");
      break;
    case "green":
      document.documentElement.style.setProperty("--primary-50", "#f0fdf4");
      document.documentElement.style.setProperty("--primary-100", "#dcfce7");
      document.documentElement.style.setProperty("--primary-200", "#bbf7d0");
      document.documentElement.style.setProperty("--primary-300", "#86efac");
      document.documentElement.style.setProperty("--primary-400", "#4ade80");
      document.documentElement.style.setProperty("--primary-500", "#22c55e");
      document.documentElement.style.setProperty("--primary-600", "#16a34a");
      document.documentElement.style.setProperty("--primary-700", "#15803d");
      document.documentElement.style.setProperty("--primary-800", "#166534");
      document.documentElement.style.setProperty("--primary-900", "#14532d");
      document.documentElement.style.setProperty("--primary-950", "#052e16");
      break;
    case "indigo":
      document.documentElement.style.setProperty("--primary-50", "#eef2ff");
      document.documentElement.style.setProperty("--primary-100", "#e0e7ff");
      document.documentElement.style.setProperty("--primary-200", "#c7d2fe");
      document.documentElement.style.setProperty("--primary-300", "#a5b4fc");
      document.documentElement.style.setProperty("--primary-400", "#818cf8");
      document.documentElement.style.setProperty("--primary-500", "#6366f1");
      document.documentElement.style.setProperty("--primary-600", "#4f46e5");
      document.documentElement.style.setProperty("--primary-700", "#4338ca");
      document.documentElement.style.setProperty("--primary-800", "#3730a3");
      document.documentElement.style.setProperty("--primary-900", "#312e81");
      document.documentElement.style.setProperty("--primary-950", "#1e1b4b");
      break;
    case "lime":
      document.documentElement.style.setProperty("--primary-50", "#f7fee7");
      document.documentElement.style.setProperty("--primary-100", "#ecfccb");
      document.documentElement.style.setProperty("--primary-200", "#d9f99d");
      document.documentElement.style.setProperty("--primary-300", "#bef264");
      document.documentElement.style.setProperty("--primary-400", "#a3e635");
      document.documentElement.style.setProperty("--primary-500", "#84cc16");
      document.documentElement.style.setProperty("--primary-600", "#65a30d");
      document.documentElement.style.setProperty("--primary-700", "#4d7c0f");
      document.documentElement.style.setProperty("--primary-800", "#3f6212");
      document.documentElement.style.setProperty("--primary-900", "#365314");
      document.documentElement.style.setProperty("--primary-950", "#1a2e05");
      break;
    case "orange":
      document.documentElement.style.setProperty("--primary-50", "#fff7ed");
      document.documentElement.style.setProperty("--primary-100", "#ffedd5");
      document.documentElement.style.setProperty("--primary-200", "#fed7aa");
      document.documentElement.style.setProperty("--primary-300", "#fdba74");
      document.documentElement.style.setProperty("--primary-400", "#fb923c");
      document.documentElement.style.setProperty("--primary-500", "#f97316");
      document.documentElement.style.setProperty("--primary-600", "#ea580c");
      document.documentElement.style.setProperty("--primary-700", "#c2410c");
      document.documentElement.style.setProperty("--primary-800", "#9a3412");
      document.documentElement.style.setProperty("--primary-900", "#7c2d12");
      document.documentElement.style.setProperty("--primary-950", "#431407");
      break;
    case "pink":
      document.documentElement.style.setProperty("--primary-50", "#fdf2f8");
      document.documentElement.style.setProperty("--primary-100", "#fce7f3");
      document.documentElement.style.setProperty("--primary-200", "#fbcfe8");
      document.documentElement.style.setProperty("--primary-300", "#f9a8d4");
      document.documentElement.style.setProperty("--primary-400", "#f472b6");
      document.documentElement.style.setProperty("--primary-500", "#ec4899");
      document.documentElement.style.setProperty("--primary-600", "#db2777");
      document.documentElement.style.setProperty("--primary-700", "#be185d");
      document.documentElement.style.setProperty("--primary-800", "#9d174d");
      document.documentElement.style.setProperty("--primary-900", "#831843");
      document.documentElement.style.setProperty("--primary-950", "#500724");
      break;
    case "purple":
      document.documentElement.style.setProperty("--primary-50", "#faf5ff");
      document.documentElement.style.setProperty("--primary-100", "#f3e8ff");
      document.documentElement.style.setProperty("--primary-200", "#e9d5ff");
      document.documentElement.style.setProperty("--primary-300", "#d8b4fe");
      document.documentElement.style.setProperty("--primary-400", "#c084fc");
      document.documentElement.style.setProperty("--primary-500", "#a855f7");
      document.documentElement.style.setProperty("--primary-600", "#9333ea");
      document.documentElement.style.setProperty("--primary-700", "#7e22ce");
      document.documentElement.style.setProperty("--primary-800", "#6b21a8");
      document.documentElement.style.setProperty("--primary-900", "#581c87");
      document.documentElement.style.setProperty("--primary-950", "#3b0764");
      break;
    case "red":
      document.documentElement.style.setProperty("--primary-50", "#fef2f2");
      document.documentElement.style.setProperty("--primary-100", "#fee2e2");
      document.documentElement.style.setProperty("--primary-200", "#fecaca");
      document.documentElement.style.setProperty("--primary-300", "#fca5a5");
      document.documentElement.style.setProperty("--primary-400", "#f87171");
      document.documentElement.style.setProperty("--primary-500", "#ef4444");
      document.documentElement.style.setProperty("--primary-600", "#dc2626");
      document.documentElement.style.setProperty("--primary-700", "#b91c1c");
      document.documentElement.style.setProperty("--primary-800", "#991b1b");
      document.documentElement.style.setProperty("--primary-900", "#7f1d1d");
      document.documentElement.style.setProperty("--primary-950", "#450a0a");
      break;
    case "rose":
      document.documentElement.style.setProperty("--primary-50", "#fff1f2");
      document.documentElement.style.setProperty("--primary-100", "#ffe4e6");
      document.documentElement.style.setProperty("--primary-200", "#fecdd3");
      document.documentElement.style.setProperty("--primary-300", "#fda4af");
      document.documentElement.style.setProperty("--primary-400", "#fb7185");
      document.documentElement.style.setProperty("--primary-500", "#f43f5e");
      document.documentElement.style.setProperty("--primary-600", "#e11d48");
      document.documentElement.style.setProperty("--primary-700", "#be123c");
      document.documentElement.style.setProperty("--primary-800", "#9f1239");
      document.documentElement.style.setProperty("--primary-900", "#881337");
      document.documentElement.style.setProperty("--primary-950", "#4c0519");
      break;
    case "sky":
      document.documentElement.style.setProperty("--primary-50", "#f0f9ff");
      document.documentElement.style.setProperty("--primary-100", "#e0f2fe");
      document.documentElement.style.setProperty("--primary-200", "#bae6fd");
      document.documentElement.style.setProperty("--primary-300", "#7dd3fc");
      document.documentElement.style.setProperty("--primary-400", "#38bdf8");
      document.documentElement.style.setProperty("--primary-500", "#0ea5e9");
      document.documentElement.style.setProperty("--primary-600", "#0284c7");
      document.documentElement.style.setProperty("--primary-700", "#0369a1");
      document.documentElement.style.setProperty("--primary-800", "#075985");
      document.documentElement.style.setProperty("--primary-900", "#0c4a6e");
      document.documentElement.style.setProperty("--primary-950", "#082f49");
      break;
    case "teal":
      document.documentElement.style.setProperty("--primary-50", "#f0fdfa");
      document.documentElement.style.setProperty("--primary-100", "#ccfbf1");
      document.documentElement.style.setProperty("--primary-200", "#99f6e4");
      document.documentElement.style.setProperty("--primary-300", "#5eead4");
      document.documentElement.style.setProperty("--primary-400", "#2dd4bf");
      document.documentElement.style.setProperty("--primary-500", "#14b8a6");
      document.documentElement.style.setProperty("--primary-600", "#0d9488");
      document.documentElement.style.setProperty("--primary-700", "#0f766e");
      document.documentElement.style.setProperty("--primary-800", "#115e59");
      document.documentElement.style.setProperty("--primary-900", "#134e4a");
      document.documentElement.style.setProperty("--primary-950", "#042f2e");
      break;
    case "violet":
      document.documentElement.style.setProperty("--primary-50", "#f5f3ff");
      document.documentElement.style.setProperty("--primary-100", "#ede9fe");
      document.documentElement.style.setProperty("--primary-200", "#ddd6fe");
      document.documentElement.style.setProperty("--primary-300", "#c4b5fd");
      document.documentElement.style.setProperty("--primary-400", "#a78bfa");
      document.documentElement.style.setProperty("--primary-500", "#8b5cf6");
      document.documentElement.style.setProperty("--primary-600", "#7c3aed");
      document.documentElement.style.setProperty("--primary-700", "#6d28d9");
      document.documentElement.style.setProperty("--primary-800", "#5b21b6");
      document.documentElement.style.setProperty("--primary-900", "#4c1d95");
      document.documentElement.style.setProperty("--primary-950", "#2e1065");
      break;
    case "yellow":
      document.documentElement.style.setProperty("--primary-50", "#fefce8");
      document.documentElement.style.setProperty("--primary-100", "#fef9c3");
      document.documentElement.style.setProperty("--primary-200", "#fef08a");
      document.documentElement.style.setProperty("--primary-300", "#fde047");
      document.documentElement.style.setProperty("--primary-400", "#facc15");
      document.documentElement.style.setProperty("--primary-500", "#eab308");
      document.documentElement.style.setProperty("--primary-600", "#ca8a04");
      document.documentElement.style.setProperty("--primary-700", "#a16207");
      document.documentElement.style.setProperty("--primary-800", "#854d0e");
      document.documentElement.style.setProperty("--primary-900", "#713f12");
      document.documentElement.style.setProperty("--primary-950", "#422006");
      break;
    default:
      document.documentElement.style.setProperty("--primary-50", "#eef2ff");
      document.documentElement.style.setProperty("--primary-100", "#e0e7ff");
      document.documentElement.style.setProperty("--primary-200", "#c7d2fe");
      document.documentElement.style.setProperty("--primary-300", "#a5b4fc");
      document.documentElement.style.setProperty("--primary-400", "#818cf8");
      document.documentElement.style.setProperty("--primary-500", "#6366f1");
      document.documentElement.style.setProperty("--primary-600", "#4f46e5");
      document.documentElement.style.setProperty("--primary-700", "#4338ca");
      document.documentElement.style.setProperty("--primary-800", "#3730a3");
      document.documentElement.style.setProperty("--primary-900", "#312e81");
      document.documentElement.style.setProperty("--primary-950", "#1e1b4b");
  }
};

export const availableNames = [
  { id: 1, name: "Sophia" },
  { id: 2, name: "Charlie" },
  { id: 3, name: "David" },
  { id: 4, name: "Frank" },
  { id: 5, name: "Grace" },
  { id: 6, name: "Alice" },
  { id: 7, name: "Eve" },
  { id: 8, name: "Henry" },
  { id: 9, name: "Isabella" },
  { id: 10, name: "Jack" },
  { id: 11, name: "Bob" },
  { id: 12, name: "Olivia" },
  { id: 13, name: "Katherine" },
  { id: 14, name: "Ryan" },
  { id: 15, name: "Liam" },
  { id: 16, name: "Mia" },
  { id: 17, name: "Noah" },
  { id: 18, name: "Thomas" },
  { id: 19, name: "Patrick" },
  { id: 20, name: "Quinn" },
];
