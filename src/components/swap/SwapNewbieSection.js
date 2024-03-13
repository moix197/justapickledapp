import { useState } from "react";
import OriginTokenForm from "./newbie/originTokenForm";
import AmountTokenForm from "./newbie/AmountTokenForm";
import Timeline from "components/swap/newbie/Timeline";
import NotiAlert from "./NotiAlert";

function SwapNewbieSection(props) {
	const [activeStage, setActiveStage] = useState(1);

	const layouts = [
		<OriginTokenForm
			urlParameter="originToken"
			title="SELECT THE coin you want to swap"
			clickEvent={() => {
				setActiveStage(activeStage + 1);
			}}
		></OriginTokenForm>,
		<OriginTokenForm
			urlParameter="destinationToken"
			title="select the coin you want to get"
			clickEvent={() => {
				setActiveStage(activeStage + 1);
			}}
		></OriginTokenForm>,
		<AmountTokenForm></AmountTokenForm>,
	];

	return (
		<div className="min-h-[calc(100vh-69px)] bg-fade bg-no-repeat bg-cover bg-center flex flex-col justify-start items-center max-w-90 pl-2 pr-2 md:pl-10 md:pr-10">
			<div className="w-[600px] max-w-full">
				<div className="w-full flex flex-col justify-center items-center">
					<div className="mt-2 md:mt-8">
						<Timeline
							activeItem={activeStage}
							clickEvent={(item) => {
								setActiveStage(item);
							}}
						></Timeline>
					</div>
				</div>
				<NotiAlert></NotiAlert>
				<div className="relative max-w-full flex justify-center items-center text-center">
					{layouts[activeStage - 1]}
				</div>
			</div>
		</div>
	);
}

export default SwapNewbieSection;
