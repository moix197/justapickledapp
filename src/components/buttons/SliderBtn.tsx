import React, { useState, ChangeEvent } from "react";

const SliderBtn: React.FC = () => {
	const [value, setValue] = useState<boolean>(false);

	const handleSlide = (e: ChangeEvent<HTMLInputElement>) => {
		if (parseInt(e.target.value) >= 100) {
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
