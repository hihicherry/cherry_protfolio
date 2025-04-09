// src/components/NavBar.jsx
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<div className="fixed bottom-8 flex flex-col md:flex-row gap-4 md:gap-6">
			<Link
				to="/cherry_protfolio/about"
				className="px-4 py-2 bg-retro-blue border-2 border-retro-purple rounded-lg text-white font-pixel text-sm hover:bg-retro-purple transition-all hover:scale-110 hover:shadow-lg "
			>
				About
			</Link>
			<Link
				to="/cherry_protfolio/projects"
				className="px-4 py-2 bg-retro-blue border-2 border-retro-purple rounded-lg text-white font-pixel text-sm hover:bg-retro-purple transition-all hover:scale-110 hover:shadow-lg "
			>
				Projects
			</Link>
			<Link
				to="/cherry_protfolio/contact"
				className="px-4 py-2 bg-retro-blue border-2 border-retro-purple rounded-lg text-white font-pixel text-sm hover:bg-retro-purple transition-all hover:scale-110 hover:shadow-lg "
			>
				Contact
			</Link>
		</div>
	);
}

export default NavBar;
