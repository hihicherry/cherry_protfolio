import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { ThemeProvider } from "./contexts/ThemeContext";
import { IconProvider } from "./contexts/IconContext";

function App() {
  return (
		<ThemeProvider>
			<IconProvider>
				<Router>
					<Routes>
						<Route path="/cherry_protfolio/" element={<Home />} />
						<Route
							path="/cherry_protfolio/about"
							element={<About />}
						/>
						<Route
							path="/cherry_protfolio/projects"
							element={<Projects />}
						/>
						<Route
							path="/cherry_protfolio/contact"
							element={<Contact />}
						/>
					</Routes>
				</Router>
			</IconProvider>
		</ThemeProvider>
  );
}
export default App;
