import { createContext, useContext, useState } from "react";

const IconContext = createContext();

export function IconProvider({ children }) {
	const [icons, setIcons] = useState({
		home: { bottom: "16rem", zIndex: 20 },
		about: { bottom: "20rem", zIndex: 22 },
		contact: { bottom: "24rem", zIndex: 24 },
	});

	return (
		<IconContext.Provider value={{ icons, setIcons }}>
			{children}
		</IconContext.Provider>
	);
}

export function useIcons() {
	return useContext(IconContext);
}
