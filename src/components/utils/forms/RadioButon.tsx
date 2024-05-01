import InputText from "./InputText";
import TooltipHelp from "../TooltipHelp";

function RadioButton({
	value,
	setValue,
	label,
	options,
	children = [],
	disabled = false,
	toolTipData = "",
}) {
	return (
		<div>
			<div className="text-secondary">
				<div className="label uppercase">
					<span className="label-text text-secondary">{label}</span>
				</div>
				<div className="flex">
					<div className=" grow justify-center border border-gray-700 p-2 rounded-lg mb-4">
						{options.map((item) => {
							return (
								<div className="form-control" key={`${item.name}_radio_option`}>
									<label className="label cursor-pointer ">
										<span className="label-text text-secondary">
											{item.name}
										</span>
										<input
											onChange={() => {
												value.value = item.value;
												setValue(value);
											}}
											type="radio"
											name={item.name}
											className="radio checked:bg-third"
											checked={value?.value === item.value}
											disabled={disabled}
										/>
									</label>
								</div>
							);
						})}
						{children.length > 0 &&
							children.map(
								(item) =>
									item?.launchValue == value?.value &&
									item?.values.map((childItem) => {
										return (
											<div key={`${childItem.name}_child_val`}>
												<InputText
													value={value}
													setValue={setValue}
													label={childItem.label}
													placeholder={childItem.placeholder}
													validation={childItem.validation}
													type={childItem.type}
													childName={childItem.name}
													isChild={true}
													disable={disabled}
													toolTipData={childItem.toolTipData}
												></InputText>
											</div>
										);
									})
							)}
					</div>
					{toolTipData && (
						<TooltipHelp
							text={toolTipData}
							type="button"
							className="ml-1 sm:ml-4"
						></TooltipHelp>
					)}
				</div>
			</div>
		</div>
	);
}

export default RadioButton;
