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
			titleBg: "bg-gradient-to-r from-violet-200 to-pink-200", // 視窗標題列背景色
			windowBg: "bg-sky-200",
			windowBorder: "border-retro-purple", //視窗最外圈邊框顏色
			text: "text-retro-pink", // 名稱文字顏色
			subText: "text-retro-purple", // 簡介文字顏色
			buttonBg: "bg-retro-softpink", // 按鈕背景色
			buttonHoverBg: "hover:bg-violet-200", // 按鈕懸停背景色
			buttonText: "text-indigo-700", // 按鈕文字色
			cardBorder: "border-retro-pink", // 卡片邊框色
			avatarBorder: "border-retro-purple", // 頭像邊框色
			cursor: "#ff99cc", // 打字機光標和粒子顏色（retro-pink）
			trail: "#cc99ff", // 滑鼠軌跡顏色（retro-purple）
			textareaFocusBorder: "hover:border-retro-purple",
			projectCardBg: "bg-gradient-to-b from-pink-100 to-white",
			techBg: "bg-pink-200",
		},
		"pink-blue": {
			titleBg: "bg-gradient-to-r from-sky-200 to-pink-200", // 視窗標題列背景色
			windowBg: "bg-violet-200",
			windowBorder: "border-retro-pink", //視窗最外圈邊框顏色
			text: "text-retro-blue", // 名稱文字顏色
			subText: "text-retro-pink", // 簡介文字顏色
			buttonBg: "bg-retro-softblue", // 按鈕背景色
			buttonHoverBg: "hover:bg-pink-100", // 按鈕懸停背景色
			buttonText: "text-indigo-700", // 按鈕文字色
			cardBorder: "border-retro-blue", // 卡片邊框色
			avatarBorder: "border-retro-pink", // 頭像邊框色
			cursor: "#99ccff", // 打字機光標和粒子顏色（retro-blue）
			trail: "#ff99cc", // 滑鼠軌跡顏色（retro-pink）
			textareaFocusBorder: "hover:border-retro-pink",
			projectCardBg: "bg-gradient-to-b from-sky-100 to-white",
			techBg: "bg-sky-200",
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
