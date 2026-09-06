import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function NavBar({ className }) {
	const { theme, themeStyles } = useTheme();
	const styles = themeStyles[theme];
	const location = useLocation();
	const currentPath = location.pathname;

	//nav按鈕統一整理（相對路徑；basename 由 Router 處理）
	const navLinks = [
		{ to: "/", label: "首頁", icon: "🏠", end: true },
		{ to: "/about", label: "關於我", icon: "🍒" },
		{ to: "/projects", label: "我的作品", icon: "💻" },
		{ to: "/contact", label: "聯絡我", icon: "💌" },
	];

	return (
		<div
			className={`fixed bottom-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 w-full max-w-[95%] ${className} z-20`}
		>
			{/* 選單容器：手機為 2x2 網格，大螢幕為水平排列 */}
			<div className="grid grid-cols-2 gap-1 sm:flex sm:flex-row sm:flex-nowrap bg-transparent p-0 w-full transition-all duration-300 justify-center">
				{navLinks.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						end={link.end}
						className={({ isActive }) =>
							`p-1 ${styles.buttonBg} ${
								isActive ? "bg-pink-300" : styles.buttonHoverBg
							} border-2 border-e-violet-400 border-b-violet-400 rounded-sm flex items-center justify-center transition-all hover:scale-110 hover:shadow-md hover:translate-x-1 hover:translate-y-1 hover:animate-flicker focus:outline-none focus:ring-2 focus:ring-pink-300`
						}
						aria-current={
							currentPath === link.to ? "page" : undefined
						}
						aria-label={`導航到${link.label}頁面`}
						title={`前往${link.label}`}
					>
						{link.label === "首頁" ? (
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className={`${styles.buttonText}`}
							>
								<path
									d="M4 12H3V20H9V14H15V20H21V12H20M12 3L3 10H6V11H18V10H21L12 3Z"
									fill="currentColor"
									stroke="indigo-700"
									strokeWidth="2"
									strokeLinecap="square"
									strokeLinejoin="miter"
								/>
								<path
									d="M10 8L14 8"
									stroke="#fff"
									strokeWidth="2"
									strokeLinecap="square"
								/>
							</svg>
						) : (
							<span
								className={`px-2 py-1 ${styles.buttonText} font-cubic text-xs text-center`}
							>
								{link.label}
							</span>
						)}
					</NavLink>
				))}
			</div>
		</div>
	);
}

export default NavBar;
