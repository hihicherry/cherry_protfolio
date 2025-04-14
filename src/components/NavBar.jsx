// src/components/NavBar.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function NavBar({ className }) {
	const {theme, themeStyles} = useTheme();
	const styles = themeStyles[theme];

	return (
		<div
			className={`fixed bottom-8 flex flex-col md:flex-row gap-4  ${className}`}
		>
			<Link
				to="/cherry_protfolio/about"
				className={`px-4 py-2 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 ${styles.buttonBorder} rounded-lg ${styles.buttonText} font-cubic text-sm text-center transition-all hover:scale-110 hover:shadow-md hover:translate-x-1 hover:translate-y-1`}
			>
				關於我
			</Link>
			<Link
				to="/cherry_protfolio/projects"
				className={`px-4 py-2 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 ${styles.buttonBorder} rounded-lg ${styles.buttonText} font-cubic text-sm text-center transition-all hover:scale-110 hover:shadow-md hover:translate-x-1 hover:translate-y-1`}
			>
				我的作品
			</Link>
			<Link
				to="/cherry_protfolio/contact"
				className={`px-4 py-2 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 ${styles.buttonBorder} rounded-lg ${styles.buttonText} font-cubic text-sm text-center transition-all hover:scale-110 hover:shadow-md hover:translate-x-1 hover:translate-y-1`}
			>
				聯絡我
			</Link>
		</div>
	);
}

export default NavBar;
