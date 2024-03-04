import { useContext } from "react";
import { LayoutContext } from "contexts/LayoutContextProvider";

function SwitchLayoutBtn() {
	const [screenToShow, setScreenToShow] = useContext(LayoutContext);

	function toggleSwitch(value) {
		if (value == true) {
			setScreenToShow("simple");
		} else {
			setScreenToShow("classic");
		}
	}

	return (
		<div className="mr-4 flex items-center justify-center">
			{screenToShow && (
				<input
					type="checkbox"
					className="toggle toggle-success"
					onChange={(e) => {
						toggleSwitch(e.target.checked);
					}}
					checked={screenToShow == "simple" ? true : false}
				/>
			)}
		</div>
	);
}

export default SwitchLayoutBtn;
