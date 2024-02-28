import { useEffect, useState, useContext, useRef } from "react";
import ContractAddress from "components/utils/ContractAddress";
import { filterTokensByInput } from "utils/filterTokensByInput";

const TokenTextInput = ({
	changeEvent = () => {},
	blurEvent = () => {},
	focusEvent = () => {},
	tokenInputText = "",
	selectedToken = {},
	filterData = {},
	setSelectedTokenAfterFilter = {
		value: false,
		setSelectedFunction: () => {},
	},
}) => {
	const [inputValue, setInputValue] = useState("");
	const [filteredData, setFilteredData] = useState([]);
	const textValueNow = useRef(0);

	useEffect(() => {
		if (!tokenInputText) return;
		setInputValue(tokenInputText);
	}, []);

	useEffect(() => {
		setInputValue(selectedToken?.name);
	}, [selectedToken]);

	function updateInput() {
		if (!setSelectedTokenAfterFilter.value) return;
		//if (filteredData.length == 0) return;
		/*debounce(textValueNow, inputValue, 1000, async () => {
			if (textValueNow == "") return;
			console.log("oka");
			console.log(textValueNow);
			setSelectedTokenAfterFilter.setSelectedFunction(filteredData[0]);
		});*/
		setSelectedTokenAfterFilter.setSelectedFunction(filteredData[0]);
	}

	return (
		<div className="w-full">
			<label className="input input-bordered border-fourth flex items-center gap-2 w-full pl-2 pr-2">
				<input
					type="text"
					className="grow bg-primary 4 tracking-wide"
					onChange={(e) => {
						setInputValue(e.target.value);
						if (filterData?.value == true) {
							let filteredData = (filteredData = filterTokensByInput(
								filterData.data,
								e.target.value
							));
							filterData.setFilteredDataFunction(filteredData);
							setFilteredData(filteredData);
						}
						changeEvent(e);
						//updateInput();
					}}
					onBlur={(e) => {
						//setInputValue(selectedToken?.name);
						updateInput();
						blurEvent(e);
					}}
					onFocus={(e) => {
						focusEvent(e);
					}}
					value={inputValue}
				/>
				<ContractAddress ca={selectedToken?.address}></ContractAddress>
			</label>
		</div>
	);
};

export default TokenTextInput;
