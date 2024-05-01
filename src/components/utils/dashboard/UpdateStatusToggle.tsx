import LoadingCont from "components/utils/LoadingCont";
import { useEffect, useState } from "react";
import { postCall } from "services/apiSkeletons/calls";
import { delay } from "utils/delay";
import { notify } from "utils/notifications";

function UpdateStatusToggle({ value = false, id, cb = null }) {
	const [status, setStatus] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setStatus(value);
	}, [value]);

	async function toggleSwitch(givenValue) {
		if (isLoading) return;
		let response = await updateAmountReleased(givenValue);
		if (response.err) return;
		cb && (await cb(true));
		setStatus(givenValue);
	}

	async function updateAmountReleased(givenValue) {
		setIsLoading(true);
		let data = await postCall("/api/priv/dashboard/updateStatus", {
			id: id,
			collection: "tokenSales",
			status: value,
		});

		await delay(1000);
		notify({
			type: data.err ? "error" : "success",
			message: data.err ? "Failed" : "Status updated",
			description: data.err
				? data.error
				: `Sale has been ${status ? "deactivated" : "activated"}`,
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

export default UpdateStatusToggle;
