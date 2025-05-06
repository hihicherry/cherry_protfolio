import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import NavBar from "../components/NavBar";
import PixelWindow from "../components/PixelWindow";
import Heart from "../components/Heart";
import emailjs from "@emailjs/browser";

function Contact() {
	const { theme, themeStyles } = useTheme();
	const lastTrailTime = useRef(0);
	const lastHeartTime = useRef(0);
	const trailContainerRef = useRef(null);
	const [hearts, setHearts] = useState([]); //管理愛心動畫
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [envelopes, setEnvelopes] = useState([]);  //信封動畫

	//個人聯繫資訊
	const contactInfo = {
		email: "bubibuuu@gmail.com",
		github: "https://github.com/hihicherry",
	};

	// 滑鼠軌跡
	useEffect(() => {
		const maxTrails = 20; //控制元素生成數量
		const trails = [];

		const handleMouseMove = (e) => {
			const now = Date.now();
			if (now - lastTrailTime.current < 80) return;

			lastTrailTime.current = now;

			const trail = document.createElement("div");
			trail.className = "trail";
			trail.style.left = `${e.clientX - 5}px`;
			trail.style.top = `${e.clientY - 5}px`;
			trail.style.backgroundColor = themeStyles[theme].trail || "#ff99cc";
			document.body.appendChild(trail);
			trails.push(trail);

			//檢查軌跡是否超過上限，超過則刪除最早的
			if (trails.length > maxTrails) {
				const oldTrail = trails.shift();
				oldTrail.remove();
			}

			setTimeout(() => {
				trail.remove();
				const index = trails.indexOf(trail);
				if (index !== -1) trails.splice(index, 1);
			}, 1000);
		};

		document.addEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, [theme, themeStyles]);

	//點擊or觸控生成愛心
	useEffect(() => {
		const handleClickOrTouch = (e) => {
			const now = Date.now();
			//愛心生成頻率 200ms一次
			if (now - lastHeartTime < 200) return;
			lastHeartTime.current = now;

			//獲得點擊或是觸控的位置
			const x = e.clientX || e.touches?.[0]?.clientX;
			const y = e.clientY || e.touches?.[0]?.clientY;

			if (!x || !y) return; // 確保有有效座標

			const id = Date.now();
			setHearts((prev) => [
				...prev,
				{ id, x, y, color: themeStyles[theme].trail || "#ff99cc" },
			]);
		};

		document.addEventListener("click", handleClickOrTouch);
		document.addEventListener("touchstart", handleClickOrTouch);

		return () => {
			document.removeEventListener("click", handleClickOrTouch);
			document.removeEventListener("touchstart", handleClickOrTouch);
		};
	}, [theme, themeStyles]);

	//確保愛心動畫結束後從狀態移除
	const removeHeart = (id) => {
		setHearts((prev) => prev.filter((heart) => heart.id !== id));
	};

	//表單處理
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.name.trim()) newErrors.name = "請輸入姓名";
		if (!formData.email.trim()) {
			newErrors.email = "請輸入 Email";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "請輸入有效的 Email";
		}
		if (!formData.message.trim()) newErrors.message = "請輸入訊息";
		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = validateForm();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		// 檢查環境變數
		const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
		const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
		const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

		if (!serviceId || !templateId || !publicKey) {
			setErrors({
				submit: "伺服器配置錯誤，請稍後再試！",
			});
			console.error("Missing EmailJS env variables:", {
				serviceId,
				templateId,
				publicKey,
			});
			return;
		}

		//emailJS發送
		emailjs
			.send(
				serviceId,
				templateId,
				{
					from_name: formData.name,
					from_email: formData.email,
					message: formData.message,
					to_email: contactInfo.email, //我的email
				},
				publicKey
			)
			.then(() => {
				setSubmitted(true);
				setFormData({ name: "", email: "", message: "" });
				setTimeout(() => setSubmitted(false), 3000);

				// 提交成功生成三個愛心
				const x = window.innerWidth / 2;
				const y = window.innerHeight / 2;
				for (let i = 0; i < 3; i++) {
					const id = Date.now() + i;
					setHearts((prev) => [
						...prev,
						{
							id,
							x: x - 20 + i * 10,
							y,
							color: themeStyles[theme].trail || "#ff99cc",
						},
					]);
				}

				//生成信封動畫
				const envelopeId = Date.now();
				setEnvelopes((prev) => [
					...prev,
					{
						id: envelopeId,
						x,
						y,
						color: themeStyles[theme].trail || "#ff99cc",
					},
				]);
			})
			.catch((error) => {
				setErrors({
					submit: "訊息傳送失敗，請再試一次。",
				});
			});
	};

	const handleClear = () => {
		setFormData({ name: "", email: "", message: "" });
		setErrors({});
	};

	const removeEnvelope = (id) => {
		setEnvelopes((prev) => prev.filter((envelope) => envelope.id !== id));
	};

	const styles = themeStyles[theme];

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden pb-[192px] sm:pb-0">
			{/* 背景粒子 */}
			<div ref={trailContainerRef} className="absolute inset-0 z-0">
				<div className="particle top-10 left-10"></div>
				<div className="particle top-20 left-1/4"></div>
				<div className="particle top-30 left-1/2"></div>
				<div className="particle top-40 left-3/4"></div>
				<div className="particle top-50 right-10"></div>
			</div>

			{/* Email 視窗 */}
			<PixelWindow
				title="To: Cherry"
				styles={styles}
				pageKey="contact"
				icon={
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-pink-400"
					>
						<path
							d="M2 2H14V12H2V2ZM2 5L8 8L14 5"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="square"
						/>
					</svg>
				}
			>
				{/* 聯繫資訊 */}
				<div className="mb-2 flex flex-col md:flex-row gap-2">
					<div
						className={`flex items-center gap-1 border-2 ${styles.cardBorder} rounded-sm p-2 bg-pink-50 text-xs`}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="<http://www.w3.org/2000/svg>"
						>
							<path
								d="M4 4H20V16H4V4ZM4 8L12 13L20 8"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="square"
							/>
						</svg>
						<a
							href={`mailto:${contactInfo.email}`}
							className="font-pixel text-xs text-gray-500 hover:text-pink-500 transition-colors"
							title="寄email給我"
						>
							Gmail/bubibuuu
						</a>
					</div>
					<div
						className={`flex items-center gap-1 border-2 ${styles.cardBorder} rounded-sm p-2 bg-purple-50 text-xs`}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="<http://www.w3.org/2000/svg>"
						>
							<path
								d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.21 4 16 5.79 16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 10.21 19.37 8.56 18.34 7.34C18.73 8.34 19 9.44 19 10.58C19 14.07 16.07 17 12.58 17C9.99 17 7.84 15.48 7.07 13.34C5.86 14.37 5 15.7 5 17C5 17.55 5.45 18 6 18H9C9 19.66 10.34 21 12 21C13.66 21 15 19.66 15 18H18C18.55 18 19 17.55 19 17C19 15.7 18.14 14.37 16.93 13.34C16.16 15.48 13.99 17 11.42 17C7.93 17 5 14.07 5 10.58C5 9.44 5.27 8.34 5.66 7.34C4.63 8.56 4 10.21 4 12Z"
								stroke="black"
								strokeWidth="2"
							/>
						</svg>
						<a
							href={contactInfo.github}
							target="_blank"
							rel="noopener noreferrer"
							className="font-pixel text-xs text-gray-500 hover:text-purple-500 transition-colors"
							title="拜訪我的GitHub"
						>
							github/hihicherry
						</a>
					</div>
				</div>

				{/* 留言表單 */}
				<div className="mb-2">
					<label className="font-cubic text-sm text-gray-700">
						你的姓名:
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className={`w-full border-2 ${
							styles.cardBorder
						} rounded-sm p-1 font-cubic text-sm focus:outline-none ${
							styles.textareaFocusBorder
						} hover:animate-pulse ${
							errors.name ? "border-red-500" : ""
						}`}
						aria-label="請輸入你的姓名"
					/>
					{errors.name && (
						<p className="text-red-500 font-cubic text-xs mt-1">
							{errors.name}
						</p>
					)}
				</div>
				<div className="mb-4">
					<label className="font-cubic text-sm text-gray-700">
						你的電子郵件地址:
					</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={`w-full border-2 ${
							styles.cardBorder
						} rounded-sm p-1 font-cubic text-sm focus:outline-none ${
							styles.textareaFocusBorder
						} hover:animate-pulse ${
							errors.email ? "border-red-500" : ""
						}`}
						aria-label="請輸入你的電子郵件地址"
					/>
					{errors.email && (
						<p className="text-red-500 font-cubic text-xs mt-1">
							{errors.email}
						</p>
					)}
				</div>
				<div className="mb-4">
					<label className="font-cubic text-sm text-gray-700">
						訊息:
					</label>
					<textarea
						name="message"
						value={formData.message}
						onChange={handleChange}
						rows="4"
						maxLength="500"
						className={`w-full border-2 ${
							styles.cardBorder
						} rounded-sm p-1 font-cubic text-sm focus:outline-none ${
							styles.textareaFocusBorder
						} hover:animate-pulse ${
							errors.message ? "border-red-500" : ""
						}`}
						aria-label="請輸入你的訊息"
					/>
					{errors.message && (
						<p className="text-red-500 font-cubic text-xs mt-1">
							{errors.message}
						</p>
					)}
				</div>
				<div className="flex gap-2">
					<button
						onClick={handleSubmit}
						className={`px-3 py-1 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 border-e-violet-400 border-b-violet-400 rounded-sm font-cubic text-sm text-indigo-700 transition-all hover:scale-110 hover:animate-flicker`}
						title="Send message"
						aria-label="傳送"
					>
						送出
					</button>
					<button
						onClick={handleClear}
						className={`px-3 py-1 bg-red-100 hover:bg-red-200 border-2 border-e-violet-400 border-b-violet-400 rounded-sm font-cubic text-sm text-indigo-700 transition-all hover:scale-110`}
						title="Clear form"
						aria-label="清除"
					>
						清除
					</button>
				</div>
			</PixelWindow>

			{/* 提交成功提示 */}
			{submitted && (
				<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-100 border-2 border-e-violet-400 border-b-violet-400 rounded-sm p-4 z-20 fade-in">
					<p className="font-cubic text-sm text-center text-indigo-700">
						{formData.name
							? `${formData.name}, Cherry 已收到你的訊息！<3`
							: "Cherry 已收到你的訊息！<3"}
					</p>
					<p className="font-cubic text-sm text-center text-indigo-700">
						請檢查你的郵箱以獲取訊息備份。
					</p>
				</div>
			)}

			<NavBar className="fade-in-delayed" />
			{hearts.map((heart) => (
				<Heart
					key={heart.id}
					x={heart.x}
					y={heart.y}
					color={heart.color}
					onRemove={() => removeHeart(heart.id)}
				/>
			))}

			{envelopes.map((envelope) => (
				<div
					key={envelope.id}
					className="envelope fixed pointer-events-none z-[100]"
					style={{
						left: `${envelope.x - 20}px`,
						top: `${envelope.y - 20}px`,
					}}
				>
					<svg
						width="40"
						height="40"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 4H20V16H4V4ZM4 8L12 13L20 8"
							stroke={envelope.color}
							strokeWidth="2"
							strokeLinecap="square"
						/>
					</svg>
				</div>
			))}
		</div>
	);
}

export default Contact;
