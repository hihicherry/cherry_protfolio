export type ThemeId = "pink-purple" | "pink-blue";

export interface ThemeStyles {
	titleBg: string;
	windowBg: string;
	windowBorder: string;
	text: string;
	subText: string;
	buttonBg: string;
	buttonHoverBg: string;
	buttonText: string;
	cardBorder: string;
	avatarBorder: string;
	cursor: string;
	trail: string;
	textareaFocusBorder: string;
	projectCardBg: string;
	techBg: string;
}

export function isThemeId(value: string | null): value is ThemeId {
	return value === "pink-purple" || value === "pink-blue";
}

export const themeStyles: Record<ThemeId, ThemeStyles> = {
	"pink-purple": {
		titleBg: "bg-gradient-to-r from-violet-200 to-pink-200",
		windowBg: "bg-sky-200",
		windowBorder: "border-retro-purple",
		text: "text-retro-pink",
		subText: "text-retro-purple",
		buttonBg: "bg-retro-softpink",
		buttonHoverBg: "hover:bg-violet-200",
		buttonText: "text-indigo-700",
		cardBorder: "border-retro-pink",
		avatarBorder: "border-retro-purple",
		cursor: "#ff99cc",
		trail: "#cc99ff",
		textareaFocusBorder: "hover:border-retro-purple",
		projectCardBg: "bg-gradient-to-b from-pink-100 to-white",
		techBg: "bg-pink-200",
	},
	"pink-blue": {
		titleBg: "bg-gradient-to-r from-sky-200 to-pink-200",
		windowBg: "bg-violet-200",
		windowBorder: "border-retro-pink",
		text: "text-retro-blue",
		subText: "text-retro-pink",
		buttonBg: "bg-retro-softblue",
		buttonHoverBg: "hover:bg-pink-100",
		buttonText: "text-indigo-700",
		cardBorder: "border-retro-blue",
		avatarBorder: "border-retro-pink",
		cursor: "#99ccff",
		trail: "#ff99cc",
		textareaFocusBorder: "hover:border-retro-pink",
		projectCardBg: "bg-gradient-to-b from-sky-100 to-white",
		techBg: "bg-sky-200",
	},
};
