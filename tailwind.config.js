/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				pixel: ['"Press Start 2P"', "cursive"], // 像素風字體
				cubic: ['"Cubic 11"', "sans-serif"], // 俐方體 11 號
			},
			colors: {
				"retro-pink": "#ff99cc", // 自定義粉色
				"retro-purple": "#cc99ff", // 自定義紫色
				"retro-blue": "#99ccff", // 自定義藍色
			},
		},
	},
	plugins: [],
};

