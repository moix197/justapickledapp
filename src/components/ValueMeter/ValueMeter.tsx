import { useEffect, useState } from "react";

function ValueMeter() {
	const [amount, setAmount] = useState(null);

	useEffect(() => {
		initValue();
	}, []);

	async function initValue() {
		let amountValue = await getAmountVal();

		setAmount(amountValue);
	}

	async function getAmountVal() {
		let url = `api/getBonusPoolAmount`;
		let response = await fetch(url);
		let data = await response.json();
		return data.amount;
	}

	function calculatePercentageLeft() {
		let percentageLeft = (amount?.left * 100) / amount?.begin;
		let percentageSold = 100 - percentageLeft;
		let left = percentageLeft ? percentageSold.toFixed(6) : 0;
		return left;
	}
	return (
		<div className="w-full mb-6">
			<div className="text-center mb-4 uppercase text-yellow-500 font-bold text-2xl">
				<div>Bonus Pool SOld</div>
			</div>
			<div className="relative w-full h-12 bg-primary rounded-full overflow-hidden border border-fourth">
				<div
					className="absolute top-0 left-0 h-full bg-gradient-to-r from-third to-fourth transition-all duration-1000"
					style={{ width: `${calculatePercentageLeft() || 0}%` }}
				></div>
				<div className="relative flex items-center justify-center h-full text-white text-sm font-semibold">
					{calculatePercentageLeft() || 0}%
				</div>
			</div>
		</div>
	);
}

export default ValueMeter;
