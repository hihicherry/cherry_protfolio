// src/components/NavBar.jsx
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function NavBar({ className }) {
	const {theme, themeStyles} = useTheme();
	const styles = themeStyles[theme];

	return (
		<div
			className={`fixed bottom-4 flex flex-col md:flex-row gap-2 ${className}`}
		>
			{/* 首頁按鈕 */}
			<NavLink
				to="/cherry_protfolio/"
				className={({ isActive }) =>
					`p-2 ${styles.buttonBg} ${
						isActive ? "bg-pink-300" : styles.buttonHoverBg
					} border-2 ${
						styles.buttonBorder
					} rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-md hover:translate-x-1 hover:translate-y-1 hover:animate-flicker`
				}
				title="回到首頁"
				aria-label="回到首頁"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={`${styles.buttonText}`}
				>
					<path
						d="M4 12H3V20H9V14H15V20H21V12H20M12 3L3 10H6V11H18V10H21L12 3Z"
						fill="currentColor"
						stroke="#fff"
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
			</NavLink>

			<NavLink
				to="/cherry_protfolio/about"
				className={({ isActive }) =>
					`px-4 py-2 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 ${styles.buttonBorder} rounded-lg ${styles.buttonText} font-cubic text-sm text-center transition-all hover:scale-110 hover:shadow-md hover:translate-x-1 hover:translate-y-1`
				}
			>
				關於我
			</NavLink>
			<NavLink
				to="/cherry_protfolio/projects"
				className={({ isActive }) =>
					`px-4 py-2 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 ${styles.buttonBorder} rounded-lg ${styles.buttonText} font-cubic text-sm text-center transition-all hover:scale-110 hover:shadow-md hover:translate-x-1 hover:translate-y-1`
				}
			>
				我的作品
			</NavLink>
			<NavLink
				to="/cherry_protfolio/contact"
				className={({ isActive }) =>
					`px-4 py-2 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 ${styles.buttonBorder} rounded-lg ${styles.buttonText} font-cubic text-sm text-center transition-all hover:scale-110 hover:shadow-md hover:translate-x-1 hover:translate-y-1`
				}
			>
				聯絡我
			</NavLink>
		</div>
	);
}

export default NavBar;
