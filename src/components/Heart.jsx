import { useEffect } from "react";

function Heart({ x, y, targetX, targetY, rotation, color = "#ff99cc", size = 36, isFirework, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(); // 通知父組件移除愛心
    }, isFirework ? 1200 : 800);
    return () => clearTimeout(timer);
  }, [onRemove, isFirework]);

  return (
		<div
			className={`heart fixed pointer-events-none z-[100] ${
				isFirework ? "firework-heart" : ""
			}`}
			style={{
				left: `${x - size / 2}px`,
				top: `${y - size / 2}px`,
				...(isFirework && {
					"--target-x": `${targetX - x}px`,
					"--target-y": `${targetY - y}px`,
					"--rotation": `${rotation}deg`,
				}),
			}}
		>
			<svg
				width={size}
				height={size}
				viewBox="0 0 36 36"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
					stroke={color}
					strokeWidth="1"
					strokeLinecap="square"
					strokeLinejoin="miter"
					style={{ filter: "url(#pixelate)" }}
				/>
				<defs>
					<filter id="pixelate">
						<feMorphology operator="dilate" radius="1" />
					</filter>
				</defs>
			</svg>
		</div>
  );
}

export default Heart;