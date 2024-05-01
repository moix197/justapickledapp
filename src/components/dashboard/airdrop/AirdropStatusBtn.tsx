import LoadingCont from "components/utils/LoadingCont";
import { useEffect, useState } from "react";
import { delay } from "utils/delay";
import { notify } from "utils/notifications";

function AirdropStatusBtn({ value = false, airdropName = "", cb = null }) {
	const [status, setStatus] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setStatus(value);
	}, [value]);

	async function toggleSwitch(givenValue) {
		if (isLoading) return;
		await updateAmountReleased(givenValue);
		cb && (await cb(true));
		setStatus(givenValue);
	}

	async function updateAmountReleased(givenValue) {
		if (!airdropName) return;
		setIsLoading(true);

		const url = "/api/airdrop/auth/db/update";
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: "airdrops",
				filter: { name: airdropName },
				update: { isActive: givenValue },
			}),
		});
		let data = await response.json();
		await delay(1000);
		notify({
			type: data.error == true ? "error" : "success",
			message: "Status updated",
			description: `Airdrop has been ${status ? "deactivated" : "activated"}`,
		});
		setIsLoading(false);
		return data;
	}

	return (
		<div className="flex">
			<div className="mr-2">
				<LoadingCont isLoading={isLoading}></LoadingCont>
			</div>
			<input
				type="checkbox"
				className="toggle toggle-success"
				checked={status}
				onChange={(e) => {
					toggleSwitch(e.target.checked);
				}}
			/>
		</div>
	);
}

export default AirdropStatusBtn;
