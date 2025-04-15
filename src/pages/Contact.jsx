import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import NavBar from "../components/NavBar";

function Contact() {
	const { theme, themeStyles } = useTheme();
	const lastTrailTime = useRef(0);
	const lastHeartTime = useRef(0);
	const trailContainerRef = useRef(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	//個人聯繫資訊
	const contactInfo = {
		email: "bubibuuu@gmail.com",
		github: "https://github.com/hihicherry",
	};

	// 滑鼠軌跡
	useEffect(() => {
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

			setTimeout(() => {
				trail.remove();
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

			const heart = document.createElement("div");
			heart.className = "heart";
			heart.style.left = `${x - 18}px`; // 偏移使愛心居中
			heart.style.top = `${y - 18}px`;

			// 內嵌 SVG 愛心
			heart.innerHTML = `
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="${themeStyles[theme].trail || "#ff99cc"}"
            stroke-width="2"
            stroke-linecap="square"
            stroke-linejoin="miter"
            style="filter: url(#pixelate)"
          />
          <defs>
            <filter id="pixelate">
              <feMorphology operator="dilate" radius="1" />
            </filter>
          </defs>
        </svg>
      `;

			document.body.appendChild(heart);

			// 0.8秒後移除愛心
			setTimeout(() => {
				heart.remove();
			}, 800);
		};

		document.addEventListener("click", handleClickOrTouch);
		document.addEventListener("touchstart", handleClickOrTouch);

		return () => {
			document.removeEventListener("click", handleClickOrTouch);
			document.removeEventListener("touchstart", handleClickOrTouch);
		};
	}, [theme, themeStyles]);

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

		// 模擬提交（可替換為 API）
		setSubmitted(true);
		setFormData({ name: "", email: "", message: "" });
		setTimeout(() => setSubmitted(false), 3000);

		// 觸發額外愛心動畫
		const x = window.innerWidth / 2;
		const y = window.innerHeight / 2;
		for (let i = 0; i < 3; i++) {
			const heart = document.createElement("div");
			heart.className = "heart";
			heart.style.left = `${x - 20 + i * 10}px`;
			heart.style.top = `${y - 20}px`;
			heart.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="<http://www.w3.org/2000/svg>">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="${themeStyles[theme].trail || "#ff99cc"}"
            stroke-width="3"
            stroke-linecap="square"
            stroke-linejoin="miter"
            style="filter: url(#pixelate)"
          />
          <defs>
            <filter id="pixelate">
              <feMorphology operator="dilate" radius="1" />
            </filter>
          </defs>
        </svg>
      `;
			document.body.appendChild(heart);
			setTimeout(() => heart.remove(), 800);
		}
	};

	const handleClear = () => {
		setFormData({ name: "", email: "", message: "" });
		setErrors({});
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
      <div
        className={`sparkle ${styles.windowBg} border-4 border-black rounded-lg p-1 w-full max-w-[95%] md:max-w-lg min-w-[300px] max-h-[70vh] fade-in z-10 relative transition-all duration-300`}
      >
        {/* 標題欄 */}
        <div
          className={`${styles.titleBg} bg-gradient-to-r from-pink-300 to-purple-300 text-white font-pixel text-sm px-2 py-1 flex justify-between items-center`}
        >
          <span className="truncate">Contact Cherry</span>
          <span className="flex gap-1">
            <span className="border border-white p-1 flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="<http://www.w3.org/2000/svg>"
                className="text-white"
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
        <div className="p-4 bg-white">
          {/* 聯繫資訊 */}
          <div className="mb-2 flex flex-col md:flex-row gap-2">
            <div className="flex items-center gap-2 border-2 border-black rounded-md p-2 bg-pink-50">
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
                className="font-pixel text-xs text-gray-700 hover:text-pink-500 transition-colors"
                title="寄email給我"
              >
                Gmail/bubibuuu
              </a>
            </div>
            <div className="flex items-center gap-2 border-2 border-black rounded-md p-2 bg-purple-50">
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
                className="font-pixel text-xs text-gray-700 hover:text-purple-500 transition-colors"
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
              className={`w-full border-2 border-black rounded-md p-1 font-pixel text-sm focus:outline-none focus:border-pink-300 hover:animate-pulse ${
                errors.name ? "border-red-500" : ""
              }`}
              aria-label="請輸入你的姓名"
            />
            {errors.name && (
              <p className="text-red-500 font-pixel text-xs mt-1">
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
              className={`w-full border-2 border-black rounded-md p-1 font-pixel text-sm focus:outline-none focus:border-pink-300 hover:animate-pulse ${
                errors.email ? "border-red-500" : ""
              }`}
              aria-label="請輸入你的電子郵件地址"
            />
            {errors.email && (
              <p className="text-red-500 font-pixel text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="font-cubic text-sm text-gray-700">訊息:</label>
            <textarea
              name="訊息內容"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              maxLength="500"
              className={`w-full border-2 border-black rounded-md p-1 font-pixel text-sm focus:outline-none focus:border-pink-300 hover:animate-pulse ${
                errors.message ? "border-red-500" : ""
              }`}
              aria-label="請輸入你的訊息"
            />
            {errors.message && (
              <p className="text-red-500 font-pixel text-xs mt-1">
                {errors.message}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className={`px-4 py-1 ${styles.buttonBg} ${styles.buttonHoverBg} border-2 border-black rounded-md font-cubic text-sm transition-all hover:scale-110 hover:animate-flicker`}
              title="Send message"
              aria-label="Send message"
            >
              送出
            </button>
            <button
              onClick={handleClear}
              className={`px-4 py-1 bg-red-100 hover:bg-red-200 border-2 border-black rounded-md font-cubic text-sm transition-all hover:scale-110`}
              title="Clear form"
              aria-label="Clear form"
            >
              清除
            </button>
          </div>
        </div>
      </div>

      {/* 提交成功提示 */}
      {submitted && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-100 border-4 border-black rounded-lg p-4 z-20 fade-in">
          <p className="font-pixel text-sm text-center">
            成功傳送訊息！謝謝你～ 
          </p>
        </div>
      )}

      <NavBar className="fade-in-delayed" />
    </div>
  );
}

export default Contact;
