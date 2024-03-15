import WaitingForTransactionContent from "components/swap/newbie/WaitingForTransactionContent";
import PickleLoadingAniamtion from "./PickleLoadingAnimation";

export default function LoadingScreen() {
	return (
		<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col z-20">
			<div className="absolute top-0 left-0 w-full h-full bg-primary opacity-80"></div>
			<WaitingForTransactionContent></WaitingForTransactionContent>
		</div>
	);
}
