import { useEffect, useState } from "react";
import { delay } from "utils/delay";
import {
	validateWalletAddress,
	validateMultiWalletAddress,
	validateNumbers,
	validatePlainTextNumber,
	validatePlainText,
	validateDate,
	validatePrice,
	validateName,
} from "utils/formTypingValidation";
import TooltipHelp from "../TooltipHelp";

function InputText({
	value,
	setValue,
	label = null,
	placeholder,
	validation,
	type = null,
	isChild = false,
	childName = null,
	multiValue = null,
	setMultiValue = null,
	isMultiValue = false,
	disable = false,
	toolTipData = "",
}) {
	const [error, setError] = useState();
	const [success, setSuccess] = useState(false);
	let validationFuncs = {
		wallet: validateWalletAddress,
		multiWallet: validateMultiWalletAddress,
		text: validatePlainText,
		number: validateNumbers,
		alphanumeric: validatePlainTextNumber,
		date: validateDate,
		price: validatePrice,
		name: validateName,
	};

	function validate(newValue) {
		let hasError = validationFuncs[validation](newValue, true);

		if (hasError.err) {
			setSuccess(false);
			handleError(hasError);
		}
		return hasError.err;
	}

	async function handleError(errorValue) {
		if (error) return;
		setError(errorValue.message);
		await delay(3000);
		setError(null);
	}

	function selectVal(isChild) {
		return !isChild ? value : value[childName];
	}

	return (
		<div>
			{label && (
				<div className="label uppercase">
					<span className="label-text text-secondary">{label}</span>
				</div>
			)}
			<div className="flex">
				<label
					className={`input input-bordered flex items-center gap-2 grow ${
						error ? "!border-red-400" : ""
					} ${success && "!border-third"}`}
				>
					<input
						type="text"
						placeholder={placeholder}
						value={!isChild ? value : value[childName]}
						disabled={disable}
						onChange={(e) => {
							let hasError = validate(e.target.value);
							if (hasError) return;
							let newVal = null;
							newVal = e.target.value;

							if (isChild) {
								newVal = value;
								newVal[childName] = e.target.value;
							}

							if (isMultiValue) {
								const itemExists = multiValue.findIndex(
									(item) => item === e.target.value
								);
								if (itemExists !== -1) {
									handleError({ message: "That address is already an admin" });
									return;
								}

								let valAry = multiValue;
								valAry.push(newVal);
								setMultiValue(valAry);
								return;
							}

							setValue(newVal);
						}}
						className={`grow`}
					/>
					{!disable && (
						<div
							onClick={() => {
								let newVal = null;

								if (isChild) {
									newVal = value;
									newVal[childName] = "";
								}
								setValue(newVal);
							}}
							className={`text-xs hover:opacity-50 cursor-pointer text-red-400 ${
								selectVal(isChild) == "" && "hidden"
							}`}
						>
							clear
						</div>
					)}
				</label>
				{toolTipData && (
					<TooltipHelp
						text={toolTipData}
						type="button"
						className="ml-1 sm:ml-4"
					></TooltipHelp>
				)}
			</div>

			<div className="label pb-0 pt-1 justify-center">
				<span className="label-text-alt text-red-400 text-[10px] h-2">
					{` ${error ? error : ""}`}
				</span>
			</div>
		</div>
	);
}

export default InputText;
