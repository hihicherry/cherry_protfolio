import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		// 僅允許 "pink-purple" 或 "pink-blue"，否則使用預設值
		return savedTheme === "pink-purple" || savedTheme === "pink-blue"
			? savedTheme
			: "pink-purple";
	});

	const toggleTheme = () => {
		setTheme((prevTheme) => {
			const newTheme =
				prevTheme === "pink-purple" ? "pink-blue" : "pink-purple";
			localStorage.setItem("theme", newTheme);
            console.log("色彩主題切換:", newTheme);
			return newTheme;
		});
	};

	// 定義每個主題的配色方案
	const themeStyles = {
		"pink-purple": {
			titleBg: "bg-purple-to-pink", // 視窗標題列背景色
            windowBg: "bg-retro-purple",
			text: "text-retro-pink", // 名稱文字顏色
			subText: "text-retro-purple", // 簡介文字顏色
			buttonBg: "bg-retro-pink", // 按鈕背景色
			buttonHoverBg: "hover:bg-retro-purple", // 按鈕懸停背景色
			buttonBorder: "border-retro-purple", // 按鈕邊框色
			buttonText: "text-white", // 按鈕文字色
			cardBorder: "border-retro-pink", // 卡片邊框色
			avatarBorder: "border-retro-purple", // 頭像邊框色
			cursor: "#ff99cc", // 打字機光標和粒子顏色（retro-pink）
			trail: "#cc99ff", // 滑鼠軌跡顏色（retro-purple）
		},
		"pink-blue": {
			titleBg: "bg-blue-to-pink", // 視窗標題列背景色
            windowBg: "bg-retro-blue",
			text: "text-retro-blue", // 名稱文字顏色
			subText: "text-retro-pink", // 簡介文字顏色
			buttonBg: "bg-retro-blue", // 按鈕背景色
			buttonHoverBg: "hover:bg-retro-pink", // 按鈕懸停背景色
			buttonBorder: "border-retro-pink", // 按鈕邊框色
			buttonText: "text-white", // 按鈕文字色
			cardBorder: "border-retro-blue", // 卡片邊框色
			avatarBorder: "border-retro-pink", // 頭像邊框色
			cursor: "#99ccff", // 打字機光標和粒子顏色（retro-blue）
			trail: "#ff99cc", // 滑鼠軌跡顏色（retro-pink）
		},
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
