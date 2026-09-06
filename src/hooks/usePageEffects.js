import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const TRAIL_INTERVAL_MS = 80;
const HEART_INTERVAL_MS = 200;
const MAX_TRAILS = 20;
const TRAIL_LIFETIME_MS = 1000;
const DEFAULT_TRAIL_COLOR = "#ff99cc";

/**
 * 全站共用的頁面特效：主題 body class、滑鼠軌跡、點擊愛心。
 * 另提供 addHearts / spawnFireworkHearts 供彩蛋與表單成功動畫使用。
 */
export function usePageEffects() {
	const { theme, themeStyles } = useTheme();
	const lastTrailTime = useRef(0);
	const lastHeartTime = useRef(0);
	const [hearts, setHearts] = useState([]);

	const styles = themeStyles[theme];
	const trailColor = styles?.trail || DEFAULT_TRAIL_COLOR;

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	useEffect(() => {
		const trails = [];

		const handleMouseMove = (e) => {
			const now = Date.now();
			if (now - lastTrailTime.current < TRAIL_INTERVAL_MS) return;
			lastTrailTime.current = now;

			const trail = document.createElement("div");
			trail.className = "trail";
			trail.style.left = `${e.clientX - 5}px`;
			trail.style.top = `${e.clientY - 5}px`;
			trail.style.backgroundColor = trailColor;
			document.body.appendChild(trail);
			trails.push(trail);

			if (trails.length > MAX_TRAILS) {
				const oldTrail = trails.shift();
				oldTrail?.remove();
			}

			setTimeout(() => {
				trail.remove();
				const index = trails.indexOf(trail);
				if (index !== -1) trails.splice(index, 1);
			}, TRAIL_LIFETIME_MS);
		};

		document.addEventListener("mousemove", handleMouseMove);
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			trails.forEach((trail) => trail.remove());
			trails.length = 0;
		};
	}, [trailColor]);

	useEffect(() => {
		const isInteractiveTarget = (target) => {
			if (!(target instanceof Element)) return false;
			return Boolean(
				target.closest(
					'button, a, input, textarea, select, label, [role="button"]',
				),
			);
		};

		const handleClickOrTouch = (e) => {
			if (isInteractiveTarget(e.target)) return;

			const now = Date.now();
			// 必須讀 .current；比較 ref 物件本身會讓 throttle 失效
			if (now - lastHeartTime.current < HEART_INTERVAL_MS) return;
			lastHeartTime.current = now;

			const x = e.clientX || e.touches?.[0]?.clientX;
			const y = e.clientY || e.touches?.[0]?.clientY;
			if (x == null || y == null) return;

			setHearts((prev) => [
				...prev,
				{ id: Date.now(), x, y, color: trailColor },
			]);
		};

		document.addEventListener("click", handleClickOrTouch);
		document.addEventListener("touchstart", handleClickOrTouch);

		return () => {
			document.removeEventListener("click", handleClickOrTouch);
			document.removeEventListener("touchstart", handleClickOrTouch);
		};
	}, [trailColor]);

	const removeHeart = useCallback((id) => {
		setHearts((prev) => prev.filter((heart) => heart.id !== id));
	}, []);

	const addHearts = useCallback((nextHearts) => {
		setHearts((prev) => [...prev, ...nextHearts]);
	}, []);

	const spawnFireworkHearts = useCallback(() => {
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;
		const heartCount = 12;
		const batch = [];

		for (let i = 0; i < heartCount; i++) {
			const angle = (i / heartCount) * 360;
			const distance = 50 + Math.random() * 100;
			const rad = (angle * Math.PI) / 180;

			batch.push({
				id: Date.now() + i,
				x: centerX,
				y: centerY,
				targetX: centerX + distance * Math.cos(rad),
				targetY: centerY + distance * Math.sin(rad),
				rotation: Math.random() * 360,
				color: trailColor,
				isFirework: true,
			});
		}

		setHearts((prev) => [...prev, ...batch]);
	}, [trailColor]);

	return {
		hearts,
		removeHeart,
		addHearts,
		spawnFireworkHearts,
		styles,
		theme,
		trailColor,
	};
}
