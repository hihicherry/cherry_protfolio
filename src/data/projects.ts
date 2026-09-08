import movieSearchAppImg from "/assets/movie-search-app.png";
import retroTodoAppImg from "/assets/retro-todo-app.png";

export interface Project {
	id: number;
	title: string;
	description: string;
	tech: string[];
	image: string;
	demoLink: string;
	sourceLink: string;
}

export const projects: Project[] = [
	{
		id: 1,
		title: "電影查詢網站",
		description:
			"一個以 TypeScript 與 React 打造的現代化網站，支援查詢電影與電視劇、將作品「加入我的最愛」，收藏以 LocalStorage 保存，並用 URL 記住搜尋狀態，讓操作可返回、可重整。",
		tech: [
			"React 19",
			"TypeScript",
			"Vite",
			"Tailwind CSS",
			"TanStack Query",
			"React Router",
			"TMDB API",
		],
		image: movieSearchAppImg,
		demoLink: "https://hihicherry.github.io/movie-search-app/",
		sourceLink: "https://github.com/hihicherry/movie-search-app",
	},
	{
		id: 2,
		title: "復古待辦清單",
		description:
			"像素風待辦事項應用，支援拖放排序、本地儲存和響應式設計，融入愛心動畫提升互動性。",
		tech: ["React", "Vite", "Tailwind CSS", "React DnD", "LocalStorage"],
		image: retroTodoAppImg,
		demoLink: "https://hihicherry.github.io/retro-todo-app/",
		sourceLink: "https://github.com/hihicherry/retro-todo-app",
	},
];
