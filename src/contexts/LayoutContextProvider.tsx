import { createContext, useState, useEffect } from "react";

const LayoutContext = createContext(null);

export default function LayoutContainer({ children }) {
	const [screenToShow, setScreenToShow] = useState(null);

	useEffect(() => {
		let savedLayout = localStorage.getItem("layout");

		savedLayout && setScreenToShow(savedLayout);
	}, []);

	useEffect(() => {
		if (!screenToShow) return;
		localStorage.setItem("layout", screenToShow);
	}, [screenToShow]);

	return (
		<LayoutContext.Provider value={[screenToShow, setScreenToShow]}>
			{children}
		</LayoutContext.Provider>
	);
}

export { LayoutContainer, LayoutContext };
