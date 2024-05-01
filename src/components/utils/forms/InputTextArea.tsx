import { useState } from "react";
import TooltipHelp from "../TooltipHelp";

function InputTextArea({
	value,
	setValue,
	label,
	placeholder,
	toolTipData = "",
}) {
	const [textValue, setTextValue] = useState("");

	return (
		<div>
			{label && (
				<div className="label uppercase">
					<span className="label-text text-secondary">{label}</span>
				</div>
			)}
			<div className="flex">
				<textarea
					onChange={(e) => {
						let result = e.target.value
							.split("\n")
							.filter((item) => item !== "");
						setValue(result);
					}}
					value={value}
					className="textarea textarea-bordered w-full h-[300px] mb-6 grow"
					placeholder={placeholder}
				></textarea>
				{toolTipData && (
					<TooltipHelp
						text={toolTipData}
						type="button"
						className="ml-1 sm:ml-4"
					></TooltipHelp>
				)}
			</div>
		</div>
	);
}

export default InputTextArea;
