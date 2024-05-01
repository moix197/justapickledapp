import { BasicButton } from "components/buttons/Basic";
import { useEffect, useState } from "react";
import { checkTimePassed } from "utils/checkTimePassed";
import { delay } from "utils/delay";
import { notify } from "utils/notifications";

function BtnExecuteActionWhenTimePassed({
	children,
	unlockDate,
	timeFrame,
	clickEvent = () => {},
}) {
	const [hasTimePassed, setHasTimePassed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let time = checkTimePassed(unlockDate, timeFrame);
		setHasTimePassed(time);
	}, [unlockDate, timeFrame]);

	function fireNotifications(value) {
		if (value.err) {
			notify({
				type: "error",
				message: "Error updating",
				description: value?.error,
			});
		} else {
			notify({
				type: "success",
				message: "Aidrop updated",
				description: "Available amount has been updated",
			});
		}
	}

	return (
		<div>
			<div>
				<BasicButton
					disabled={!hasTimePassed}
					clickEvent={async () => {
						if (isLoading) return;
						setIsLoading(true);
						let result = await clickEvent();
						await delay(1000);
						setIsLoading(false);
						fireNotifications(result);
					}}
					isLoading={isLoading}
					className="pl-4 pr-4"
				>
					{children}
				</BasicButton>
			</div>
		</div>
	);
}

export default BtnExecuteActionWhenTimePassed;
