import { useState } from "react";

const SliderBtn = () => {
	const [value, setValue] = useState(false);

	const handleSlide = (e) => {
		if (e.target.value >= 100) {
			setValue(true);
			return;
		}
	};

	return (
		<div className="w-full">
			<input
				type="range"
				min="0"
				max="100"
				step="1"
				onChange={handleSlide}
				className="relative w-6/12 h-4 appearance-none bg-gray-300 rounded-full outline-none"
			/>
		</div>
	);
};

export default SliderBtn;
