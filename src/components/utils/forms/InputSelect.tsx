import TooltipHelp from "../TooltipHelp";

function InputSelect({
	value,
	setValue,
	label,
	placeholder,
	options = null,
	children = null,
	disable = false,
	toolTipData = "",
}) {
	return (
		<div className="mb-2">
			<div className="label uppercase">
				<span className="label-text text-secondary">{label}</span>
			</div>
			<div className="flex">
				<label className="form-control grow">
					<select
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
						}}
						className="select select-bordered text-secondary uppercase"
						disabled={disable}
					>
						<option value="default" className=" cursor-pointer" disabled>
							{placeholder}
						</option>

						{options &&
							options.map((item, index) => {
								return (
									<option
										value={item._id}
										className=""
										key={`${item._id}_${index}`}
									>
										{item.name}
									</option>
								);
							})}
					</select>
				</label>
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

export default InputSelect;
