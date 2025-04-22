import { useState } from "react";

function PixelWindow ({ title, children, styles, windowClassName, onOpen }) {
	const [isWindowOpen, setIsWindowOpen] = useState(true);

	// 關閉視窗
	const handleCloseWindow = () => {
		setIsWindowOpen(false);
	};

	// 開啟視窗
	const handleOpenWindow = () => {
		setIsWindowOpen(true);
        onOpen?.();
	};

    return (
		<>
			{isWindowOpen ? (
				<div
					className={`sparkle ${styles.windowBg} border-2 ${styles.windowBorder} rounded-lg p-1 w-full max-w-[95%] md:max-w-lg min-w-[300px] max-h-[80vh] fade-in z-10 relative transition-all duration-300 animate-expand ${windowClassName}`}
				>
					{/* 標題欄 */}
					<div
						className={`${styles.titleBg} border-2 ${styles.windowBorder} text-indigo-700 font-pixel text-sm px-2 py-1 flex justify-between items-center`}
					>
						<span className="truncate">{title}</span>
						<span className="flex gap-1">
							<span
								className="border border-indigo-700 p-1 flex items-center justify-center cursor-pointer hover:bg-pink-300 hover:animate-flicker"
								onClick={handleCloseWindow}
								title="關閉視窗"
							>
								<svg
									width="12"
									height="12"
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

					{/* 內容 */}
					<div
						className={`p-4 bg-white border-2 ${styles.cardBorder} overflow-auto max-h-[70vh]`}
					>
						{children}
					</div>
				</div>
			) : (
				<button
					className="fixed bottom-20 right-4 p-2 bg-gradient-to-r from-pink-200 to-purple-200 border-2 border-e-violet-400 border-b-violet-400 rounded-sm hover:scale-110 hover:animate-flicker animate-pulse z-20"
					onClick={handleOpenWindow}
					title={`開啟 ${title}`}
				>
					{icon || (<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-pink-400"
					>
						<path
							d="M2 2H14V14H2V2ZM4 4V12H12V4H4Z"
							fill="currentColor"
						/>
					</svg>)}
				</button>
			)}
		</>
	);
}

export default PixelWindow;