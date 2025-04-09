import { useState } from "react";
import avatarImage from "../assets/avatar.png";

function MainCard(){
    const [clicked, setClicked] = useState(false);

	return (
		<div className="bg-white border-4 border-retro-pink rounded-lg p-6 max-w-md w-full text-center shadow-xl mx-4 md:mx-0">
			{/* 像素風頭像 */}
			<img
				src={avatarImage}
				alt="avatar"
				className="mx-auto w-32 h-32 rounded-full border-4 border-retro-purple shadow-md pixelated"
			/>
			{/* 名稱 */}
			<h1 className="text-xl md:text-2xl mt-4 text-retro-pink font-pixel typing-effect">
				Hi, I'm Cherry.
			</h1>
			{/* 簡介 */}
			<p className="text-retro-purple mt-2 font-cubic text-sm md:text-base">
				前端網頁設計初學者。
			</p>
			{/* 互動按鈕 */}
			<button
				onClick={() => setClicked(!clicked)}
				className="mt-6 px-6 py-2 bg-retro-pink hover:bg-retro-purple border-2 border-retro-purple rounded-lg transition-all duration-300 relative overflow-hidden group font-pixel text-sm hover:scale-105 "
			>
				<span
					className={`text-white group-hover:underline transition-all duration-300 ${
						clicked ? "line-through" : ""
					}`}
				>
					{clicked ? "OK! Done!" : "Click OK!"}
				</span>
			</button>
		</div>
	);
}

export default MainCard;