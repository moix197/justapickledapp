import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import PickleLoadingAniamtion from "components/utils/PickleLoadingAnimation";
import { useContext } from "react";

function WaitingForTransactionContent({ title = "", description = "" }) {
	const { isTransactionSigned } = useContext(TransactionDataContext);

	return (
		<div>
			<div className="mt-8">
				<PickleLoadingAniamtion
					title={
						isTransactionSigned
							? "Transaction signed succesfully"
							: `Check your wallet`
					}
					description={
						isTransactionSigned
							? "Confirming the transaction"
							: `go and sign the transaction`
					}
					width={120}
					height={120}
				></PickleLoadingAniamtion>
			</div>
		</div>
	);
}

export default WaitingForTransactionContent;
