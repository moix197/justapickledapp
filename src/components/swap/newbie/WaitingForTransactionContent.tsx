import PickleLoadingAniamtion from "components/utils/PickleLoadingAnimation";

function WaitingForTransactionContent({ title = "", description = "" }) {
	return (
		<div>
			<div className="mt-8">
				<PickleLoadingAniamtion
					title="transaction in progress"
					description="Don't forget to sign the transaction"
					width={120}
					height={120}
				></PickleLoadingAniamtion>
			</div>
		</div>
	);
}

export default WaitingForTransactionContent;
