/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				pixel: ['"Press Start 2P"', "cursive"], // 像素風字體
				cubic: ['"Cubic"', "sans-serif"], // 俐方體 11 號
			},
			backgroundImage: {
				"purple-to-pink": "linear-gradient(to right, #cc99ff, #ff99cc)",
				"blue-to-pink": "linear-gradient(to right, #99ccff, #ff99cc)",
			},
			colors: {
				"retro-pink": "#ff99cc", // 自定義粉色
				"retro-purple": "#cc99ff", // 自定義紫色
				"retro-blue": "#99ccff", // 自定義藍色
				"retro-softpink": "#fae6f0",
				"retro-softblue": "#e6f7ff",
			},
			screens: {
				xs: "480px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
			},
		},
	},
	plugins: [],
};
