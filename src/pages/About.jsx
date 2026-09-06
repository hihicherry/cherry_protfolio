import { useEffect, useRef, useState } from "react";
import PixelWindow from "../components/PixelWindow";
import NavBar from "../components/NavBar";
import PageHearts from "../components/PageHearts";
import PageParticles from "../components/PageParticles";
import { usePageEffects } from "../hooks/usePageEffects";

function About() {
	const { hearts, removeHeart, spawnFireworkHearts, styles } =
		usePageEffects();
	const skillBarsRef = useRef([]);
	const [showEasterEgg, setShowEasterEgg] = useState(false);
	const [animateBars, setAnimateBars] = useState(false);

	// 技能資料
	const skills = [
		{ name: "HTML & CSS", level: 90 },
		{ name: "JavaScript", level: 80 },
		{ name: "React", level: 60 },
		{ name: "Tailwind CSS", level: 70 },
		{ name: "Git & GitHub", level: 60 },
	];

	// 觸發進度條動畫
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setAnimateBars(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.5 },
		);

		if (skillBarsRef.current[0]) {
			observer.observe(skillBarsRef.current[0]);
		}

		return () => observer.disconnect();
	}, []);

	const handleEasterEggClick = () => {
		setShowEasterEgg(true);
		setTimeout(() => setShowEasterEgg(false), 3000);
		spawnFireworkHearts();
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden pb-[192px] sm:pb-0">
			<PageParticles />

			{/* 關於我視窗 */}
			<PixelWindow
				title="About Cherry"
				styles={styles}
				pageKey="about"
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
							d="M8 14C8 14 14 10 14 6C14 2 10 2 8 4C6 2 2 2 2 6C2 10 8 14 8 14Z"
							fill="currentColor"
						/>
					</svg>
				}
			>
				{/* 自我介紹 */}
				<div className={`mb-4`}>
					<h2 className="font-pixel text-base text-indigo-700 mb-2">
						嗨！我是 Cherry 🍒
					</h2>
					<p className="font-cubic text-sm text-gray-700">
						你好，我是來自台灣的前端工程師，熱衷於打造兼具美感與良好使用體驗的網頁介面。我主要使用
						React、JavaScript、Tailwind CSS 與 Framer Motion
						開發互動式網站，重視響應式設計、細節打磨與流暢的使用者體驗，並持續學習現代前端技術與設計思維。我喜歡將前端開發結合視覺設計，從像素藝術、復古遊戲介面到現代產品設計中汲取靈感，期望透過細膩的互動與設計，打造兼具功能性與溫度的數位體驗。
						✨
					</p>
				</div>

				{/* 技能 */}
				<div className="mb-4">
					<h3 className="font-cubic text-sm text-indigo-700 mb-2">
						技能狀態欄
					</h3>
					<div className="space-y-2">
						{skills.map((skill, index) => (
							<div
								key={skill.name}
								className="flex items-center gap-2"
								ref={(el) => (skillBarsRef.current[index] = el)}
							>
								<span className="font-cubic text-xs text-gray-700 w-24">
									{skill.name}
								</span>
								<div className="flex-1 bg-purple-100 border-2 border-purple-400 h-3 overflow-hidden">
									<div
										className={`bg-pink-300 h-full ${
											styles.cardBorder
										} ${
											animateBars
												? "animate-retro-progress"
												: ""
										}`}
										style={{
											width: animateBars
												? `${skill.level}%`
												: "0%",
											"--progress-width": `${skill.level}%`,
										}}
									></div>
								</div>
								<span className="font-cubic text-xs text-gray-700">
									{skill.level}%
								</span>
							</div>
						))}
					</div>
				</div>

				{/* 興趣與目標 */}
				<div className="mb-4">
					<h3 className="font-cubic text-sm text-indigo-700 mb-2">
						關於我的小檔案
					</h3>
					<ul className="font-cubic text-sm text-gray-700 list-disc pl-5">
						<li>興趣：看漫畫/動畫/遊戲直播、聽音樂</li>
						<li>靈感來源：復古像素風 UI、粉色系</li>
						<li>目前目標：製作habit dashboard</li>
						<li>
							期許自己能持續精進前端技術，打造兼具美感、互動性與使用者體驗的
							Web 產品。
						</li>
					</ul>
				</div>

				{/* 聯繫提示 */}
				<div className="mb-4">
					<p className="font-cubic text-sm text-gray-700">
						有什麼想要問我的嗎？請到{" "}
						<a
							href="/cherry_protfolio/contact"
							className="font-cubic text-s bg-pink-100 text-indigo-700 px-1.5 py-0.5 rounded-sm hover:underline"
						>
							聯絡我
						</a>{" "}
						頁面留言吧！💌
					</p>
				</div>

				{/* 彩蛋按鈕 - 置於內容區域右下角 */}
				<button
					className="absolute bottom-2 right-2 p-1.5 bg-gradient-to-r from-pink-200 to-purple-200 border-2 border-e-violet-400 border-b-violet-400 rounded-sm hover:scale-110 hover:animate-flicker animate-pulse z-10 focus:outline-none focus:ring-2 focus:ring-pink-300"
					onClick={handleEasterEggClick}
					aria-label="觸發愛心煙火彩蛋"
					aria-pressed={showEasterEgg}
					title="點我看愛心煙火！"
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

export default About;
