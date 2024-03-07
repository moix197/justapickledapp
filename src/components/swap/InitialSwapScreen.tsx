import { useContext } from "react";
import { LayoutContext } from "contexts/LayoutContextProvider";
import SwapBasicSection from "components/swap/SwapBasicSection";
import SwapNewbieSection from "components/swap/SwapNewbieSection";
import SelectionScreen from "components/swap/SelectionScreen";

function InitialSwapScreen() {
	const [screenToShow, setScreenToShow] = useContext(LayoutContext);
	return (
		<div>
			{!screenToShow && (
				<SelectionScreen clickEvent={setScreenToShow}></SelectionScreen>
			)}
			{screenToShow == "classic" && <SwapBasicSection></SwapBasicSection>}{" "}
			{screenToShow == "simple" && <SwapNewbieSection></SwapNewbieSection>}
		</div>
	);
}

export default InitialSwapScreen;
