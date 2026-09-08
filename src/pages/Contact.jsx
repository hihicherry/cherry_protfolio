import { useState } from "react";
import NavBar from "../components/NavBar";
import PixelWindow from "../components/PixelWindow";
import PageHearts from "../components/PageHearts";
import PageParticles from "../components/PageParticles";
import { contactInfo } from "../data/contact";
import { usePageEffects } from "../hooks/usePageEffects";
import emailjs from "@emailjs/browser";

function Contact() {
	const { hearts, removeHeart, addHearts, styles, trailColor } =
		usePageEffects();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const [envelopes, setEnvelopes] = useState([]); //信封動畫

	//表單處理
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "", submit: "" }));
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
		if (isSending) return;

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

		setIsSending(true);
		setErrors((prev) => ({ ...prev, submit: "" }));

		// EmailJS v4：第四參數應為 options 物件（字串仍相容，但物件為官方建議）
		emailjs
			.send(
				serviceId,
				templateId,
				{
					from_name: formData.name,
					from_email: formData.email,
					message: formData.message,
					to_email: contactInfo.email,
				},
				{ publicKey },
			)
			.then(() => {
				setSubmitted(true);
				setFormData({ name: "", email: "", message: "" });
				setTimeout(() => setSubmitted(false), 3000);

				const x = window.innerWidth / 2;
				const y = window.innerHeight / 2;
				addHearts(
					[0, 1, 2].map((i) => ({
						id: Date.now() + i,
						x: x - 20 + i * 10,
						y,
						color: trailColor,
					})),
				);

				const envelopeId = Date.now();
				setEnvelopes((prev) => [
					...prev,
					{
						id: envelopeId,
						x,
						y,
						color: trailColor,
					},
				]);
			})
			.catch((error) => {
				console.error("EmailJS send failed:", {
					status: error?.status,
					text: error?.text,
					error,
				});
				const detail =
					typeof error?.text === "string" && error.text.trim()
						? error.text.trim()
						: null;
				setErrors({
					submit: detail
						? `訊息傳送失敗（${detail}）`
						: "訊息傳送失敗，請再試一次。",
				});
			})
			.finally(() => {
				setIsSending(false);
			});
	};

	const handleClear = () => {
		setFormData({ name: "", email: "", message: "" });
		setErrors({});
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden pb-[192px] sm:pb-0">
			<PageParticles />

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
							xmlns="http://www.w3.org/2000/svg"
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
							className="font-pixel text-xs text-gray-500 hover:text-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300"
							aria-label="寄送電子郵件給 Cherry"
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
							xmlns="http://www.w3.org/2000/svg"
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
							className="font-pixel text-xs text-gray-500 hover:text-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300"
							aria-label="訪問 Cherry 的 GitHub 頁面"
							title="拜訪我的GitHub"
						>
							github/hihicherry
						</a>
					</div>
				</div>

				{/* 留言表單 */}
				<form onSubmit={handleSubmit}>
					<div className="mb-2">
						<label
							htmlFor="contact-name"
							className="font-cubic text-sm text-gray-700"
						>
							你的姓名:
						</label>
						<input
							id="contact-name"
							type="text"
							name="name"
							autoComplete="name"
							value={formData.name}
							onChange={handleChange}
							className={`w-full border-2 focus:bg-gray-50 ${
								styles.cardBorder
							} rounded-sm p-1 font-cubic text-sm focus:outline-none ${
								styles.textareaFocusBorder
							} hover:animate-pulse ${
								errors.name ? "border-red-500" : ""
							}`}
							aria-invalid={!!errors.name}
							aria-describedby={
								errors.name ? "name-error" : undefined
							}
						/>
						{errors.name && (
							<p
								id="name-error"
								className="text-red-500 font-cubic text-xs mt-1"
							>
								{errors.name}
							</p>
						)}
					</div>
					<div className="mb-4">
						<label
							htmlFor="contact-email"
							className="font-cubic text-sm text-gray-700"
						>
							你的電子郵件地址:
						</label>
						<input
							id="contact-email"
							type="email"
							name="email"
							autoComplete="email"
							value={formData.email}
							onChange={handleChange}
							className={`w-full border-2 focus:bg-gray-50 ${
								styles.cardBorder
							} rounded-sm p-1 font-cubic text-sm focus:outline-none ${
								styles.textareaFocusBorder
							} hover:animate-pulse ${
								errors.email ? "border-red-500" : ""
							}`}
							aria-invalid={!!errors.email}
							aria-describedby={
								errors.email ? "email-error" : undefined
							}
						/>
						{errors.email && (
							<p
								id="email-error"
								className="text-red-500 font-cubic text-xs mt-1"
							>
								{errors.email}
							</p>
						)}
					</div>
					<div className="mb-4">
						<label
							htmlFor="contact-message"
							className="font-cubic text-sm text-gray-700"
						>
							訊息:
						</label>
						<textarea
							id="contact-message"
							name="message"
							autoComplete="off"
							value={formData.message}
							onChange={handleChange}
							rows="4"
							maxLength="500"
							className={`w-full border-2 focus:bg-gray-50 ${
								styles.cardBorder
							} rounded-sm p-1 font-cubic text-sm focus:outline-none ${
								styles.textareaFocusBorder
							} hover:animate-pulse ${
								errors.message ? "border-red-500" : ""
							}`}
							aria-invalid={!!errors.message}
							aria-describedby={
								errors.message ? "message-error" : undefined
							}
						/>
						{errors.message && (
							<p
								id="message-error"
								className="text-red-500 font-cubic text-xs mt-1"
							>
								{errors.message}
							</p>
						)}
					</div>
					{errors.submit && (
						<p
							id="submit-error"
							className="text-red-500 font-cubic text-xs mb-2"
							role="alert"
						>
							{errors.submit}
						</p>
					)}
					<div className="flex gap-2">
						<button
							type="submit"
							disabled={isSending}
							className={`px-3 py-1 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 border-e-violet-400 border-b-violet-400 rounded-sm font-cubic text-sm text-indigo-700 transition-all hover:scale-110 hover:animate-flicker focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-60 disabled:hover:scale-100`}
							aria-label="傳送表單"
							aria-busy={isSending}
							aria-disabled={isSending}
							aria-describedby={
								errors.submit ? "submit-error" : undefined
							}
							title="送出訊息"
						>
							{isSending ? "傳送中..." : "送出"}
						</button>
						<button
							type="button"
							onClick={handleClear}
							disabled={isSending}
							className={`px-3 py-1 bg-red-100 hover:bg-red-200 border-2 border-e-violet-400 border-b-violet-400 rounded-sm font-cubic text-sm text-indigo-700 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-60`}
							aria-label="清除聯繫表單"
							title="清除表單"
						>
							清除
						</button>
					</div>
				</form>
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
			<PageHearts hearts={hearts} onRemove={removeHeart} />

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
