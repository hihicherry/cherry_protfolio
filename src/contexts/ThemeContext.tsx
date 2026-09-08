import {
	createContext,
	useContext,
	useState,
	type ReactNode,
} from "react";
import {
	isThemeId,
	themeStyles,
	type ThemeId,
	type ThemeStyles,
} from "../data/theme";

export interface ThemeContextValue {
	theme: ThemeId;
	toggleTheme: () => void;
	themeStyles: Record<ThemeId, ThemeStyles>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORAGE_KEY = "theme";
const DEFAULT_THEME: ThemeId = "pink-purple";

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<ThemeId>(() => {
		const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
		return isThemeId(savedTheme) ? savedTheme : DEFAULT_THEME;
	});

	const toggleTheme = () => {
		setTheme((prevTheme) => {
			const newTheme: ThemeId =
				prevTheme === "pink-purple" ? "pink-blue" : "pink-purple";
			localStorage.setItem(THEME_STORAGE_KEY, newTheme);
			return newTheme;
		});
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextValue {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
