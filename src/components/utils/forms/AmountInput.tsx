import { RefreshPriceBtn } from "components/swap/RefreshPriceBtn";
import { useState } from "react";
import { addCommasToAmount } from "utils/formatAndUpdateAmount";

function AmountInput({ isLoading, setParentAmount, maxAmount = null }) {
	const [amount, setAmount] = useState("");

	return (
		<div>
			<label className="input input-bordered border-fourth flex items-center gap-2 w-full overflow-hidden mt-2 pl-2 pr-2">
				{isLoading && (
					<span className="loading loading-ring loading-md text-third"></span>
				)}

				<input
					type="text"
					placeholder="AMOUNT"
					className={`grow bg-primary 4 text-xl ${
						isLoading && "opacity-0"
					} text-secondary`}
					onChange={(e) => {
						if (!/^[0-9,.]*$/.test(e.target.value)) return;
						if (isLoading) return;
						if (maxAmount && e.target.value > maxAmount) return;
						let amountWithCommas = addCommasToAmount(e.target.value, 7);
						setParentAmount(amountWithCommas);
						setAmount(amountWithCommas);
					}}
					onBlur={(e) => {
						if (!e.target.value || e.target.value == "0") {
							setParentAmount("1");
							setAmount("1");
						}
					}}
					value={amount}
					disabled={false}
				/>
				{/*<RefreshPriceBtn></RefreshPriceBtn>*/}
			</label>
		</div>
	);
}

export default AmountInput;
