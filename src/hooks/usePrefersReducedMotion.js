import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getInitialReducedMotion() {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
		return false;
	}
	return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * 是否偏好減少動態效果（系統／瀏覽器無障礙設定）。
 * 變更時會同步更新（例如使用者中途切換 OS 設定）。
 */
export function usePrefersReducedMotion() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(
		getInitialReducedMotion,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
		const handleChange = (event) => {
			setPrefersReducedMotion(event.matches);
		};

		setPrefersReducedMotion(mediaQuery.matches);
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	return prefersReducedMotion;
}
