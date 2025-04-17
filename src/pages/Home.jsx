import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import MainCard from "../components/MainCard";
import NavBar from "../components/NavBar";
import Heart from "../components/Heart";


function Home() {
	const { theme, themeStyles } = useTheme(); //記錄主題
	const lastTrailTime = useRef(0); //記錄上一次生成軌跡的時間
	const lastHeartTime = useRef(0); //紀錄上一次生成愛心的時間
	const trailContainerRef = useRef(null); //用於存放軌跡的容器
	const [hearts, setHearts] = useState([]); //管理愛心動畫

	useEffect(() => {
		// 動態設置 body 的主題類別
		document.body.className = theme;
	}, [theme]);

	// 追蹤滑鼠軌跡
	useEffect(() => {
		const maxTrails = 20;  //控制元素生成數量
		const trails = [];

		const handleMouseMove = (e) => {
			const now = Date.now();
			// 每80毫秒生成一個軌跡
			if (now - lastTrailTime.current < 80) return;
			lastTrailTime.current = now;

			const trail = document.createElement("div");
			trail.className = "trail";
			trail.style.left = `${e.clientX - 5}px`; // 調整偏移
			trail.style.top = `${e.clientY - 5}px`;
			trail.style.backgroundColor = themeStyles[theme].trail;
			document.body.appendChild(trail);
			trails.push(trail);

			//檢查軌跡是否超過上限，超過則刪除最早的
			if (trails.length > maxTrails) {
				const oldTrail = trails.shift();
				oldTrail.remove();
			}

			// 移除軌跡元素
			setTimeout(() => {
				trail.remove();
				const index = trails.indexOf(trail);
				if (index !== -1) trails.splice(index, 1);
			}, 1000);
		};

		document.addEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, [theme, themeStyles]); //確保依賴 theme 和 themeStyles

	//點擊or觸控生成愛心
	useEffect(() => {
		const handleClickOrTouch = (e) => {
			const now = Date.now();
			//愛心生成頻率 200ms一次
			if (now - lastHeartTime < 200) return;

			lastHeartTime.current = now;

			//獲得點擊或是觸控的位置
			const x = e.clientX || e.touches?.[0]?.clientX;
			const y = e.clientY || e.touches?.[0]?.clientY;

			if (!x || !y) return; // 確保有有效座標

			const id = Date.now(); //唯一id
			setHearts((prev) => [
				...prev,
				{ id, x, y, color: themeStyles[theme].trail },
			]);
		};

		document.addEventListener("click", handleClickOrTouch);
		document.addEventListener("touchstart", handleClickOrTouch);

		return () => {
			document.removeEventListener("click", handleClickOrTouch);
			document.removeEventListener("touchstart", handleClickOrTouch);
		};
	}, [theme, themeStyles]);

	//確保愛心動畫結束後從狀態移除
	const removeHeart = (id) => {
		setHearts((prev) => prev.filter((heart) => heart.id !== id));
	};

	const styles = themeStyles[theme];

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden">
			{/* 背景層：用於存放軌跡和粒子 */}
			<div ref={trailContainerRef} className="absolute inset-0 z-0">
				{/* 背景粒子 */}
				<div className="particle top-10 left-10"></div>
				<div className="particle top-20 left-1/4"></div>
				<div className="particle top-30 left-1/2"></div>
				<div className="particle top-40 left-3/4"></div>
				<div className="particle top-50 right-10"></div>
			</div>

			{/* 像素風視窗邊框 */}
			<div
				className={`sparkle ${styles.windowBg} border-2 ${styles.windowBorder} rounded-md p-1 w-full max-w-[95%] md:max-w-lg min-w-[300px] fade-in z-10 relative transition-all duration-300`}
			>
				<div
					className={`${styles.titleBg} border-2 ${styles.windowBorder} text-indigo-700 font-pixel text-sm px-2 py-1 flex justify-between items-center`}
				>
					<span className="truncate">Welcome to my world!</span>
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
				<MainCard />
			</div>
			<NavBar className="fade-in-delayed" />
			{hearts.map((heart) => (
				<Heart
					key={heart.id}
					x={heart.x}
					y={heart.y}
					color={heart.color}
					onRemove={() => removeHeart(heart.id)}
				/>
			))}
		</div>
	);
}

export default Home;
