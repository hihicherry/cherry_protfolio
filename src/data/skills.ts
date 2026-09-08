export type SkillCategoryId =
	| "languages"
	| "frontend"
	| "data"
	| "ui"
	| "toolchain";

export interface SkillCategory {
	id: SkillCategoryId;
	label: string;
	swatchClass: string;
	chipClass: string;
	skills: string[];
}

export const skillCategories: SkillCategory[] = [
	{
		id: "languages",
		label: "程式語言",
		swatchClass: "bg-pink-100 border-pink-400",
		chipClass:
			"bg-pink-100 border-pink-400 text-pink-800 hover:bg-pink-200",
		skills: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
	},
	{
		id: "frontend",
		label: "前端技術",
		swatchClass: "bg-purple-100 border-purple-400",
		chipClass:
			"bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200",
		skills: ["React", "Vite", "React Router", "Tailwind CSS", "RWD"],
	},
	{
		id: "data",
		label: "狀態與資料",
		swatchClass: "bg-indigo-100 border-indigo-400",
		chipClass:
			"bg-indigo-100 border-indigo-400 text-indigo-800 hover:bg-indigo-200",
		skills: [
			"TanStack Query",
			"React Context",
			"RESTful API",
			"LocalStorage",
		],
	},
	{
		id: "ui",
		label: "UI／互動",
		swatchClass: "bg-rose-100 border-rose-400",
		chipClass:
			"bg-rose-100 border-rose-400 text-rose-800 hover:bg-rose-200",
		skills: ["Framer Motion", "CSS Animations"],
	},
	{
		id: "toolchain",
		label: "工程與設計",
		swatchClass: "bg-sky-100 border-sky-400",
		chipClass: "bg-sky-100 border-sky-400 text-sky-800 hover:bg-sky-200",
		skills: ["Git / GitHub", "ESLint"],
	},
];
