import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import PixelWindow from "../components/PixelWindow";
import NavBar from "../components/NavBar";
import Heart from "../components/Heart";
import movieSearchAppImg from "/assets/movie-search-app.png";
import retroTodoAppImg from "/assets/retro-todo-app.png";
import movieDashboardImg from "/assets/movie-dashboard.png";

// 專案資料（請替換成你的實際專案）
const projects = [
	{
		id: 1,
		title: "電影查詢網站",
		description:
			"一個使用 TypeScript 和 React 構建的現代化網站，支援查詢電影與電視劇資訊，並提供「加入我的最愛」功能，資料透過 LocalStorage 持久化儲存，確保類型安全與優質使用者體驗。",
		tech: [
			"React",
			"TypeScript",
			"Vite",
			"Tailwind CSS",
			"Framer Motion",
			"LocalStorage",
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
	{
		id: 3,
		title: "電影數據化儀表板",
		description:
			"一個電影數據可視化儀表板，展示熱門電影的評分、類型和熱門度，支持深色模式切換、語言切換和響應式圖表設計。",
		tech: [
			"React",
			"Vite",
			"Tailwind CSS",
			"@tanstack/react-query",
			"Recharts",
			"Axios",
		],
		image: movieDashboardImg,
		demoLink: "https://movie-dashboard-sigma.vercel.app/",
		sourceLink: "https://github.com/hihicherry/movie-dashboard",
	},
];

function Projects() {
	const { theme, themeStyles } = useTheme();
	const lastTrailTime = useRef(0);
	const lastHeartTime = useRef(0);
	const trailContainerRef = useRef(null);
	const [hearts, setHearts] = useState([]);
	const [showEasterEgg, setShowEasterEgg] = useState(false);

	// 設置主題
	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	// 滑鼠軌跡
	useEffect(() => {
		const maxTrails = 20;
		const trails = [];

		const handleMouseMove = (e) => {
			const now = Date.now();
			if (now - lastTrailTime.current < 80) return;
			lastTrailTime.current = now;

			const trail = document.createElement("div");
			trail.className = "trail";
			trail.style.left = `${e.clientX - 5}px`;
			trail.style.top = `${e.clientY - 5}px`;
			trail.style.backgroundColor = themeStyles[theme].trail || "#ff99cc";
			document.body.appendChild(trail);
			trails.push(trail);

			if (trails.length > maxTrails) {
				const oldTrail = trails.shift();
				oldTrail.remove();
			}

			setTimeout(() => {
				trail.remove();
				const index = trails.indexOf(trail);
				if (index !== -1) trails.splice(index, 1);
			}, 1000);
		};

		document.addEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, [theme, themeStyles]);

	// 點擊或觸控生成愛心
	useEffect(() => {
		const handleClickOrTouch = (e) => {
			const now = Date.now();
			if (now - lastHeartTime.current < 200) return;
			lastHeartTime.current = now;

			const x = e.clientX || e.touches?.[0]?.clientX;
			const y = e.clientY || e.touches?.[0]?.clientY;

			if (!x || !y) return;

			const id = Date.now();
			setHearts((prev) => [
				...prev,
				{ id, x, y, color: themeStyles[theme].trail || "#ff99cc" },
			]);
		};

		document.addEventListener("click", handleClickOrTouch);
		document.addEventListener("touchstart", handleClickOrTouch);

		return () => {
			document.removeEventListener("click", handleClickOrTouch);
			document.removeEventListener("touchstart", handleClickOrTouch);
		};
	}, [theme, themeStyles]);

	const removeHeart = (id) => {
		setHearts((prev) => prev.filter((heart) => heart.id !== id));
	};

	// 彩蛋觸發 - 煙火效果
	const handleEasterEggClick = () => {
		setShowEasterEgg(true);
		setTimeout(() => setShowEasterEgg(false), 3000);

		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;
		const heartCount = 12;

		for (let i = 0; i < heartCount; i++) {
			const id = Date.now() + i;
			const angle = (i / heartCount) * 360;
			const distance = 50 + Math.random() * 100;
			const rad = (angle * Math.PI) / 180;
			const targetX = centerX + distance * Math.cos(rad);
			const targetY = centerY + distance * Math.sin(rad);
			const rotation = Math.random() * 360;

			setHearts((prev) => [
				...prev,
				{
					id,
					x: centerX,
					y: centerY,
					targetX,
					targetY,
					rotation,
					color: themeStyles[theme].trail || "#ff99cc",
					isFirework: true,
				},
			]);
		}
	};

	const styles = themeStyles[theme];

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden pb-[192px] sm:pb-0">
			{/* 背景粒子 */}
			<div ref={trailContainerRef} className="absolute inset-0 z-0">
				<div className="particle top-10 left-10"></div>
				<div className="particle top-20 left-1/4"></div>
				<div className="particle top-30 left-1/2"></div>
				<div className="particle top-40 left-3/4"></div>
				<div className="particle top-50 right-10"></div>
			</div>

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
					className="absolute bottom-2 right-2 p-1.5 bg-gradient-to-r from-pink-200 to-purple-200 border-2 border-e-violet-400 border-b-violet-400 rounded-sm hover:scale-110 hover:animate-flicker animate-pulse z-10 ocus:outline-none focus:ring-2 focus:ring-pink-300"
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

			{/* 愛心動畫 */}
			{hearts.map((heart) => (
				<Heart
					key={heart.id}
					x={heart.x}
					y={heart.y}
					targetX={heart.targetX}
					targetY={heart.targetY}
					rotation={heart.rotation}
					color={heart.color}
					isFirework={heart.isFirework}
					onRemove={() => removeHeart(heart.id)}
				/>
			))}

			<NavBar className="fade-in-delayed" />
		</div>
	);
}

export default Projects;
