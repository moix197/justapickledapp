import { useEffect, useState } from "react";
import { delay } from "utils/delay";
import { TitleXl } from "components/dashboard/Titles";
import InputText from "components/utils/forms/InputText";
import { BasicButton } from "components/buttons/Basic";
import RadioButton from "./RadioButon";
import Toggle from "./Toggle";
import { validate, bulkValidate } from "utils/formSubmitValidation";
import { notify } from "utils/notifications";
import InputSelect from "./InputSelect";
import InputMultiValue from "./InputMultiValue";
import InputTextArea from "./InputTextArea";

function BasicForm({
	formValues,
	title = null,
	btnText = "",
	cb,
	disabled = false,
	importantText = "",
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [errorsAry, setErrorsAry] = useState([]);

	// Dynamically create state variables and setters
	const [state, setState] = useState(() => {
		const initialState = {};
		for (const item of formValues) {
			initialState[item?.name] = item.defaultValue ? item.defaultValue : "";
		}

		return initialState;
	});

	// Dynamically generate setter functions
	const setters = {};

	for (const item of formValues) {
		setters[item.name] = (value) =>
			setState((prevState) => ({ ...prevState, [item?.name]: value }));
	}

	useEffect(() => {
		for (const item of formValues) {
			if (item.defaultValue) {
				setters[item.name](item.defaultValue);
			}
		}
	}, [formValues]);

	async function checkValidation(errResult) {
		if (errResult && errResult.length == 0 && cb) {
			let response = await cb(state);
			return response;
		}

		let messageToShow = [];

		for (const item of errResult) {
			if (errResult[0].err) {
				messageToShow.push(`- ${item.name} ${item.result[0].message}\n`);
			}
		}

		notify({
			type: "error",
			message: "Error",
			description: messageToShow.join(" "),
		});
	}

	async function launchAction() {
		if (isLoading) return;
		setIsLoading(true);
		let errResult = bulkValidate(state);
		setErrorsAry(errResult);
		await delay(1000);
		await checkValidation(errResult);
		setIsLoading(false);
	}

	return (
		<div>
			<div className="mb-6 ">
				<TitleXl>{title}</TitleXl>
			</div>
			{importantText && (
				<div className="text-red-400 uppercase tracking-wider text-xs flex justify-center">
					<div className="w-12/12 md:w-6/12">
						<div>{importantText}</div>
					</div>
				</div>
			)}
			{formValues.map((item) => {
				if (item.type == "text" || item.type == "number") {
					return (
						<div key={item.name}>
							<InputText
								value={state[item.name]}
								setValue={setters[item.name]}
								label={item.label}
								placeholder={item.placeholder}
								validation={item.validation}
								type={item.type}
								disable={disabled}
								toolTipData={item?.toolTipData ? item?.toolTipData : null}
							></InputText>
						</div>
					);
				} else if (item.type == "radio") {
					return (
						<div key={item.name}>
							<RadioButton
								value={state[item.name]}
								setValue={setters[item.name]}
								label={item.label}
								options={item.options}
								children={item.children}
								disabled={disabled}
								toolTipData={item?.toolTipData ? item?.toolTipData : null}
							></RadioButton>
						</div>
					);
				} else if (item.type == "toggle") {
					return (
						<div key={item.name}>
							<Toggle
								value={state[item.name]}
								setValue={setters[item.name]}
								label={item.label}
								children={item.children}
								disable={disabled}
								toolTipData={item?.toolTipData ? item?.toolTipData : null}
							></Toggle>
						</div>
					);
				} else if (item.type == "select") {
					return (
						<div key={item.name}>
							<InputSelect
								value={state[item.name]}
								setValue={setters[item.name]}
								label={item.label}
								placeholder={item.placeholder}
								options={item.options}
								disable={disabled}
								toolTipData={item?.toolTipData ? item?.toolTipData : null}
							></InputSelect>
						</div>
					);
				} else if (item.type == "multiValue") {
					return (
						<div key={item.name}>
							<InputMultiValue
								value={state[item.name]}
								setValue={setters[item.name]}
								label={item.label}
								placeholder={item.placeholder}
								validation={item.validation}
							></InputMultiValue>
						</div>
					);
				} else if (item.type == "textarea") {
					return (
						<div key={item.name}>
							<InputTextArea
								value={state[item.name]}
								setValue={setters[item.name]}
								label={item.label}
								placeholder={item.placeholder}
								toolTipData={item?.toolTipData ? item?.toolTipData : null}
							></InputTextArea>
						</div>
					);
				}
			})}
			{!disabled && (
				<div
					className="mt-6"
					onClick={() => {
						launchAction();
					}}
				>
					<BasicButton isLoading={isLoading} className="bg-primary">
						{btnText}
					</BasicButton>
				</div>
			)}
		</div>
	);
}

export default BasicForm;
