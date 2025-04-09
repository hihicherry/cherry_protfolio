import { useEffect, useRef } from "react";
import MainCard from "../components/MainCard";
import NavBar from "../components/NavBar";

function Home() {
	const lastTrailTime = useRef(0); // 記錄上一次生成軌跡的時間
	const trailContainerRef = useRef(null); // 用於存放軌跡的容器

	// 追蹤滑鼠軌跡
	useEffect(() => {
		const handleMouseMove = (e) => {
			const now = Date.now();
			// 每100毫秒生成一個軌跡
			if (now - lastTrailTime.current < 100) return;

			lastTrailTime.current = now;

			const colors = ["#ff99cc", "#cc99ff"]; //隨機顏色
			const trail = document.createElement("div");
			trail.className = "trail";
			trail.style.left = `${e.clientX - 5}px`; // 調整偏移
			trail.style.top = `${e.clientY - 5}px`;
			document.body.appendChild(trail);
			trail.style.backgroundColor =
				colors[Math.floor(Math.random() * colors.length)];
			document.body.appendChild(trail);

			// 移除軌跡元素
			setTimeout(() => {
				trail.remove();
			}, 1000);
		};

		document.addEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4">
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
			<div className="bg-retro-blue border-4 border-retro-purple rounded-lg p-1 w-full max-w-lg">
				<div className="bg-retro-purple text-white font-pixel text-sm px-2 py-1 flex justify-between">
					<span>Welcome to my world!</span>
					<span className="flex gap-1">
						<span className="border border-white px-1">🗕</span>
						<span className="border border-white px-1">🗕</span>
						<span className="border border-white px-1">✖</span>
					</span>
				</div>
				<MainCard />
			</div>
			<NavBar />
		</div>
	);
}

export default Home;
