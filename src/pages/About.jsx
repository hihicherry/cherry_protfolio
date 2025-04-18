import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import NavBar from "../components/NavBar";
import Heart from "../components/Heart";

function About() {
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

	// 滑鼠軌跡（限制數量）
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

	// 彩蛋觸發
	const handleEasterEggClick = () => {
		setShowEasterEgg(true);
		setTimeout(() => setShowEasterEgg(false), 3000);

		// 生成額外愛心
		const x = window.innerWidth / 2;
		const y = window.innerHeight / 2;
		for (let i = 0; i < 2; i++) {
			const id = Date.now() + i;
			setHearts((prev) => [
				...prev,
				{
					id,
					x: x - 10 + i * 20,
					y,
					color: themeStyles[theme].trail || "#ff99cc",
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

			{/* 關於我視窗 */}
			<div
				className={`sparkle ${styles.windowBg} border-2 ${styles.windowBorder} rounded-lg p-1 w-full max-w-[95%] md:max-w-lg min-w-[300px] max-h-[70vh] fade-in z-10 relative transition-all duration-300`}
			>
				{/* 標題欄 */}
				<div
					className={`${styles.titleBg} border-2 ${styles.windowBorder} text-indigo-700 font-pixel text-sm px-2 py-1 flex justify-between items-center`}
				>
					<span className="truncate">About Cherry</span>
					<span className="flex gap-1">
						<span className="border border-indigo-700 p-1 flex items-center justify-center">
							<svg
								width="12"
								height="12"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="text-indigo-700"
							>
								<path
									d="M2 2L14 14M14 2L2 14"
									stroke="currentColor"
									strokeWidth="4"
									strokeLinecap="miter"
								/>
							</svg>
						</span>
					</span>
				</div>

				{/* 內容 */}
				<div
					className={`p-4 bg-white border-2 ${styles.cardBorder} overflow-y-auto max-h-[50vh]`}
				>
					{/* 介紹 */}
					<div className="mb-4">
						<h2 className="font-pixel text-base text-indigo-700 mb-2">
							嗨！我是Cherry
						</h2>
						<p className="font-cubic text-sm text-gray-700">
							一個熱愛前端開發的初學者，正在探索 React 和 Tailwind
							CSS 的奇妙世界！
							並努力打好JavaScript基礎，夢想打造一個充滿趣味的個人網站
							💕
						</p>
					</div>

					{/* 技能 */}
					<div className="mb-4">
						<h3 className="font-pixel text-sm text-indigo-700 mb-2">
							技能
						</h3>
						<ul className="font-cubic text-sm text-gray-700 list-disc pl-5">
							<li>HTML / CSS / JavaScript</li>
							<li>React & Vite</li>
							<li>Tailwind CSS</li>
							<li>Git / GitHub</li>
						</ul>
					</div>
				</div>
			</div>

			{/* 愛心動畫 */}
			{hearts.map((heart) => (
				<Heart
					key={heart.id}
					x={heart.x}
					y={heart.y}
					color={heart.color}
					onRemove={() => removeHeart(heart.id)}
				/>
			))}

			<NavBar className="fade-in-delayed" />
		</div>
	);
}

export default About;
