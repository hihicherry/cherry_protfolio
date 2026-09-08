import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { ThemeProvider } from "./contexts/ThemeContext";

// 與 vite.config.js 的 base 同步（BASE_URL 含尾端 /，Router basename 不應有）
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
	return (
		<ThemeProvider>
			<Router basename={basename}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
