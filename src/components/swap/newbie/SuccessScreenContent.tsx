import { CheckCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";

function SuccessScreenContent({ tx = "" }) {
	return (
		<div className="flex flex-col items-center">
			<div className="uppercase text-third text-lg font-bold mb-4">
				<div>transaction successfull</div>
			</div>
			<div className="mb-4">
				<CheckCircleIcon width={100} className="text-third"></CheckCircleIcon>
			</div>
			<div className="mb-4">
				<div>We've completed your transaction</div>
				<div>You can check it out on solscan</div>
			</div>
			<Link href={`https://solscan.io/tx/${tx}`}>
				<div className="text-third text-xs hover:opacity-50">{tx}</div>
			</Link>
		</div>
	);
}

export default SuccessScreenContent;
