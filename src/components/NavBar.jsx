// src/components/NavBar.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function NavBar({ className }) {
	const {theme, themeStyles} = useTheme();
	const styles = themeStyles[theme];

	return (
		<div
			className={`fixed bottom-8 flex flex-col md:flex-row gap-4 md:gap-6 ${className}`}
		>
			<Link
				to="/cherry_protfolio/about"
				className={`px-4 py-2 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 ${styles.buttonBorder} rounded-lg ${styles.buttonText} font-pixel text-sm transition-all hover:scale-110 hover:shadow-lg`}
			>
				About
			</Link>
			<Link
				to="/cherry_protfolio/projects"
				className={`px-4 py-2 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 ${styles.buttonBorder} rounded-lg ${styles.buttonText} font-pixel text-sm transition-all hover:scale-110 hover:shadow-lg`}
			>
				Projects
			</Link>
			<Link
				to="/cherry_protfolio/contact"
				className={`px-4 py-2 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 ${styles.buttonBorder} rounded-lg ${styles.buttonText} font-pixel text-sm transition-all hover:scale-110 hover:shadow-lg`}
			>
				Contact
			</Link>
		</div>
	);
}

export default NavBar;
