import { useEffect, useRef } from "react";
import MainCard from "../components/MainCard";
import NavBar from "../components/NavBar";
import { useTheme } from "../contexts/ThemeContext";

function Home() {
	const { theme, themeStyles } = useTheme(); //記錄主題
	const lastTrailTime = useRef(0); //記錄上一次生成軌跡的時間
	const lastHeartTime = useRef(0); //紀錄上一次生成愛心的時間
	const trailContainerRef = useRef(null); //用於存放軌跡的容器

	useEffect(() => {
		// 動態設置 body 的主題類別
		document.body.className = theme;
	}, [theme]);

	// 追蹤滑鼠軌跡
	useEffect(() => {
		const handleMouseMove = (e) => {
			const now = Date.now();
			// 每80毫秒生成一個軌跡
			if (now - lastTrailTime.current < 80) return;

			lastTrailTime.current = now;

			const colors = ["#ff99cc", "#cc99ff"]; //隨機顏色
			const trail = document.createElement("div");
			trail.className = "trail";
			trail.style.left = `${e.clientX - 5}px`; // 調整偏移
			trail.style.top = `${e.clientY - 5}px`;
			document.body.appendChild(trail);
			trail.style.backgroundColor = themeStyles[theme].trail;
			document.body.appendChild(trail);

			// 移除軌跡元素
			setTimeout(() => {
				trail.remove();
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

			const heart = document.createElement("div");
			heart.className = "heart";
			heart.style.left = `${x - 18}px`; // 偏移使愛心居中
			heart.style.top = `${y - 18}px`;

			// 內嵌 SVG 愛心
			heart.innerHTML = `
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="${themeStyles[theme].trail || "#ff99cc"}"
            stroke-width="2"
            stroke-linecap="square"
            stroke-linejoin="miter"
            style="filter: url(#pixelate)"
          />
          <defs>
            <filter id="pixelate">
              <feMorphology operator="dilate" radius="1" />
            </filter>
          </defs>
        </svg>
      `;

			document.body.appendChild(heart);

			// 0.8秒後移除愛心
			setTimeout(() => {
				heart.remove();
			}, 800);
		};

		document.addEventListener("click", handleClickOrTouch);
		document.addEventListener("touchstart", handleClickOrTouch);

		return () => {
			document.removeEventListener("click", handleClickOrTouch);
			document.removeEventListener("touchstart", handleClickOrTouch);
		};
	}, [theme, themeStyles]);

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
				className={`sparkle ${styles.windowBg} border-4 border-black rounded-lg p-1 w-full max-w-[95%] md:max-w-lg min-w-[300px] fade-in z-10 relative transition-all duration-300`}
			>
				<div
					className={`${styles.titleBg} text-white font-pixel text-sm px-2 py-1 flex justify-between items-center`}
				>
					<span className="truncate">Welcome to my world!</span>
					<span className="flex gap-1">
						<span className="border border-white p-1 flex items-center justify-center">
							<svg
								width="12"
								height="12"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="text-white"
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
			
		</div>
	);
}

export default Home;
