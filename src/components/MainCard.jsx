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
			className={`sparkle ${styles.windowBg} border-2 ${styles.windowBorder} rounded-md p-0.5 w-full max-w-[90%] xs:max-w-[360px] sm:max-w-[400px] md:max-w-[450px] min-w-[280px] fade-in z-10 relative transition-all duration-300`}
		>
			<div
				className={`${styles.titleBg} border-2 ${styles.windowBorder} text-indigo-700 font-pixel text-xs xs:text-sm px-1.5 py-0.5 flex justify-between items-center`}
			>
				<span className="truncate">Welcome to my world!</span>
				<span className="flex gap-0.5">
					<span className="border border-indigo-700 p-0.5 flex items-center justify-center">
						<svg
							width="10"
							height="10"
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
			<div
				className={`bg-white border-2 ${styles.cardBorder} rounded-sm p-2 xs:p-2.5 sm:p-3 w-full max-w-full text-center shadow-xl min-h-[160px] xs:min-h-[180px] sm:min-h-[200px`}
			>
				{/* 像素風頭像 */}
				<img
					src={avatarImage}
					alt="avatar"
					className={`mx-auto w-24 sm:w-32 h-24 sm:h-32 rounded-full border-4 ${styles.avatarBorder} shadow-md pixelated`}
				/>
				{/* 名稱 */}
				<h1
					className={`text-xs xs:text-sm sm:text-base mt-4 ${styles.text} font-pixel typing-effect`}
				>
					Hi, I'm Cherry.
				</h1>
				{/* 簡介 */}
				<p
					className={`${styles.subText} mt-2 font-cubic text-xs xs:text-xs sm:text-sm`}
				>
					前端網頁設計初學者。 <br/>
					請點擊看看下面的按鈕o(=^w^=)o
				</p>
				{/* 互動按鈕 */}
				<button
					onClick={handleClick}
					className={`mt-6 px-2 xs:px-3 sm:px-4 py-0.5 xs:py-1 sm:py-1 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 border-e-violet-400 border-b-violet-400 rounded-sm transition-all duration-300 relative overflow-hidden group font-pixel text-xs sm:text-sm hover:scale-105 hover:animate-flicker`}
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
		</div>
	);
}

export default MainCard;