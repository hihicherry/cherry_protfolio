import { useState } from "react";
import avatarImage from "../assets/avatar.png";
import { useTheme } from "../contexts/ThemeContext";

function MainCard(){
	const [clicked, setClicked] = useState(false);
	const { toggleTheme, themeStyles, theme } = useTheme();

	const handleClick = () => {
		setClicked(!clicked);
		toggleTheme(); //點擊時切換主題
	};

	// 從 themeStyles 中獲取當前主題的配色
	const styles = themeStyles[theme];

	return (
		<div
			className={`bg-white border-4 ${styles.cardBorder} rounded-lg p-6 max-w-md w-full text-center shadow-xl`}
		>
			{/* 像素風頭像 */}
			<img
				src={avatarImage}
				alt="avatar"
				className={`mx-auto w-32 h-32 rounded-full border-4 ${styles.avatarBorder} shadow-md pixelated`}
			/>
			{/* 名稱 */}
			<h1
				className={`text-xl md:text-2xl mt-4 ${styles.text} font-pixel typing-effect`}
			>
				Hi, I'm Cherry.
			</h1>
			{/* 簡介 */}
			<p
				className={`${styles.subText} mt-2 font-cubic text-sm md:text-base`}
			>
				前端網頁設計初學者。
			</p>
			{/* 互動按鈕 */}
			<button
				onClick={handleClick}
				className={`mt-6 px-6 py-2 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 ${styles.buttonBorder} rounded-lg transition-all duration-300 relative overflow-hidden group font-pixel text-sm hover:scale-105`}
			>
				<span
					className={`${
						styles.buttonText
					} group-hover:underline transition-all duration-300 ${
						clicked ? "line-through" : ""
					}`}
				>
					{clicked ? "Done!" : "Click!"}
				</span>
			</button>
		</div>
	);
}

export default MainCard;