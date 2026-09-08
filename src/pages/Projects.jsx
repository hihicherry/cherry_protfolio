import { useState } from "react";
import PixelWindow from "../components/PixelWindow";
import NavBar from "../components/NavBar";
import PageHearts from "../components/PageHearts";
import PageParticles from "../components/PageParticles";
import { usePageEffects } from "../hooks/usePageEffects";
import movieSearchAppImg from "/assets/movie-search-app.png";
import retroTodoAppImg from "/assets/retro-todo-app.png";

// 專案資料（請替換成你的實際專案）
const projects = [
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

function Projects() {
	const { hearts, removeHeart, spawnFireworkHearts, styles } =
		usePageEffects();
	const [showEasterEgg, setShowEasterEgg] = useState(false);

	const handleEasterEggClick = () => {
		setShowEasterEgg(true);
		setTimeout(() => setShowEasterEgg(false), 3000);
		spawnFireworkHearts();
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden pb-[192px] sm:pb-0">
			<PageParticles />

			{/* 專案視窗 */}
			<PixelWindow
				title="Cherry's Projects"
				styles={styles}
				pageKey="projects"
				icon={
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-pink-400"
					>
						<path
							d="M2 4H14V12H2V4ZM4 6H12V10H4V6Z"
							fill="currentColor"
						/>
					</svg>
				}
			>
				{/* 專案網格 */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{projects.map((project) => (
						<div
							key={project.id}
							className={`${styles.projectCardBg} border-2 ${styles.cardBorder} rounded-sm p-3 shadow-md hover:scale-105 hover:animate-pulse transition-all`}
						>
							{/* 專案圖片 */}
							<img
								src={project.image}
								alt={project.title}
								className="w-full h-32 object-cover rounded-sm border-2 border-indigo-200 pixelated"
							/>
							{/* 專案標題 */}
							<h3 className="font-pixel text-sm text-indigo-700 mt-2">
								{project.title}
							</h3>
							{/* 專案描述 */}
							<p className="font-cubic text-xs text-gray-700 mt-1">
								{project.description}
							</p>
							{/* 技術棧 */}
							<div className="flex flex-wrap gap-1 mt-2">
								{project.tech.map((tech) => (
									<span
										key={tech}
										className={`${styles.techBg} font-cubic text-xs text-indigo-700 px-1.5 py-0.5 rounded-sm`}
									>
										{tech}
									</span>
								))}
							</div>
							{/* 連結按鈕 */}
							<div className="flex gap-2 mt-3">
								<a
									href={project.demoLink}
									target="_blank"
									rel="noopener noreferrer"
									className={`px-2 py-1 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 border-e-violet-400 border-b-violet-400 rounded-sm font-cubic text-xs text-indigo-700 hover:scale-110 hover:animate-flicker focus:outline-none focus:ring-2 focus:ring-pink-300`}
									aria-label={`查看 ${project.title} 的線上演示`}
									title={`查看 ${project.title} 演示`}
								>
									Demo
								</a>
								<a
									href={project.sourceLink}
									target="_blank"
									rel="noopener noreferrer"
									className={`px-2 py-1 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 border-e-violet-400 border-b-violet-400 rounded-sm font-cubic text-xs text-indigo-700 hover:scale-110 hover:animate-flicker focus:outline-none focus:ring-2 focus:ring-pink-300`}
									aria-label={`查看 ${project.title} 的原始碼`}
									title={`查看 ${project.title} 原始碼`}
								>
									Source
								</a>
							</div>
						</div>
					))}
				</div>

				{/* 彩蛋按鈕 */}
				<button
					className="absolute bottom-2 right-2 p-1.5 bg-gradient-to-r from-pink-200 to-purple-200 border-2 border-e-violet-400 border-b-violet-400 rounded-sm hover:scale-110 hover:animate-flicker animate-pulse z-10 focus:outline-none focus:ring-2 focus:ring-pink-300"
					onClick={handleEasterEggClick}
					aria-label="觸發愛心煙火彩蛋"
					aria-pressed={showEasterEgg}
					title="點我有驚喜！"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						className="text-pink-500"
					>
						<path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
					</svg>
				</button>
			</PixelWindow>

			<PageHearts hearts={hearts} onRemove={removeHeart} />

			<NavBar className="fade-in-delayed" />
		</div>
	);
}

export default Projects;
