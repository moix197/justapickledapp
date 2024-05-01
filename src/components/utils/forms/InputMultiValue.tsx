import { useEffect, useState } from "react";
import InputText from "./InputText";
import ContractAddress from "../ContractAddress";
import { XCircleIcon } from "@heroicons/react/24/outline";

function InputMultiValue({ value, setValue, label, placeholder, validation }) {
	const [inpuTextValue, setInputTextValue] = useState("");

	function removeFromValues(address) {
		const indexToRemove = value.findIndex((item) => item === address);

		if (indexToRemove !== -1) {
			let clonedAry = [...value];
			clonedAry.splice(indexToRemove, 1);
			setValue(clonedAry);
		}
	}

	return (
		<div>
			{label && (
				<div className="label uppercase">
					<span className="label-text text-secondary">{label}</span>
				</div>
			)}
			{value?.length > 0 && (
				<div className="flex gap-2 flex-wrap mb-2">
					{value.map((item) => {
						return (
							<div
								key={`${item}_admin_wallet`}
								onClick={() => {
									removeFromValues(item);
								}}
							>
								<div className="p-2 bg-fourth rounded-full flex items-center cursor-pointer hover:opacity-50">
									<ContractAddress
										text=" "
										ca={item}
										disabled
									></ContractAddress>
									<XCircleIcon className="w-6 h-6 text-red-400"></XCircleIcon>
								</div>
							</div>
						);
					})}
				</div>
			)}
			<InputText
				value={inpuTextValue}
				setValue={setInputTextValue}
				placeholder={placeholder}
				validation={validation}
				multiValue={value}
				setMultiValue={setValue}
				isMultiValue={true}
			></InputText>
		</div>
	);
}

export default InputMultiValue;
