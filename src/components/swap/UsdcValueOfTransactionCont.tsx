import { useContext } from "react";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import LoadingCont from "components/utils/LoadingCont";

function UsdcValueOfTransactionCont({
	text = "THE USDC value of this transaction is",
}) {
	const {
		originTokenData,
		destinationTokenData,
		usdcValue,
		isLoadingUsdcQuote,
	} = useContext(TransactionDataContext);

	if (
		originTokenData.symbol != "USDC" &&
		destinationTokenData.symbol != "USDC"
	) {
		return (
			<div>
				<div className="mb-4 text-secondary text-sm md:text-md">
					<div>
						THE <span className="text-yellow-500">USDC</span> value of this
						transaction is{" "}
						<span className="text-yellow-500">
							{isLoadingUsdcQuote ? <LoadingCont></LoadingCont> : usdcValue}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default UsdcValueOfTransactionCont;
