import AmountsDisplay from "components/utils/AmountsDisplay";
import { useEffect, useRef, useState } from "react";
import { debounce } from "utils/debounce";
import { getJupQuote } from "services/getJupQuote";
import {
	addDecimalPoint,
	addDecimalPointToNumber,
	removeDecimalPointAndAddNumbers,
} from "utils/manageDecimals";
import { BasicButton } from "components/buttons/Basic";
import { removeCommasFromAmount } from "utils/formatAndUpdateAmount";
import { getTokenPrice } from "services/getTokenPrice";
import { postCall } from "services/apiSkeletons/calls";
import { deserializeAndSignTransaction } from "utils/transactions";
import { useWallet } from "@solana/wallet-adapter-react";
import { connection } from "utils/connection";
import { notify } from "utils/notifications";
import ConnectToContentBtn from "components/buttons/ConnectToContentBtn";

function SaleMarketPriceSection({
	originToken = {
		symbol: "USDC",
		ca: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
		decimals: 6,
	},
	destinationToken = { symbol: "", decimals: null, ca: "" },
	saleType = "market",
	tokenPrice,
	saleId,
	userAddress,
	cb = null,
}) {
	const [amount, setAmount] = useState("0");
	const [isLoading, setIsLoading] = useState(false);
	const [quote, setQuote] = useState(null);
	const [destinationAmount, setDestinationAmount] = useState("0");
	const [pricePerUsd, setPricePerUsd] = useState(0);
	const amountValueNow = useRef(0);
	const wallet = useWallet();

	useEffect(() => {
		if (!amount) return;

		if (saleType == "market") {
			getMarketPrice();
		} else if (saleType == "fixed") {
			getFixedPrice();
		}
	}, [amount]);

	useEffect(() => {
		if (saleType == "fixed") return;
		getPricePerUsd();
	}, [saleType]);

	function getMarketPrice() {
		debounce(amountValueNow, amount, 1000, () => {
			getQuote();
		});
	}

	async function getPricePerUsd() {
		let response = await getTokenPrice(destinationToken?.ca);

		setPricePerUsd(response.data[destinationToken?.ca].price);
	}

	function getFixedPrice() {
		const finalPrice = (1 / tokenPrice) * removeCommasFromAmount(amount);
		const priceResult = addDecimalPointToNumber(finalPrice, 0);
		setDestinationAmount(priceResult.toString());
	}

	async function getQuote() {
		setIsLoading(true);
		let response = await getJupQuote(
			"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
			destinationToken?.ca,
			removeDecimalPointAndAddNumbers(amount, originToken.decimals)
		);

		setQuote(response);

		let destinationAmountWDecimals = addDecimalPoint(
			response?.outAmount,
			destinationToken.decimals
		);
		setDestinationAmount(destinationAmountWDecimals);
		setIsLoading(false);
	}

	async function fireTokenSalePurchase() {
		try {
			setIsLoading(true);
			let response = await postCall("/api/sales/generateTransaction", {
				saleId: saleId,
				amount: parseFloat(removeCommasFromAmount(amount)),
				quote,
				address: userAddress,
			});

			if (response.err) {
				throw new Error(response.error);
			}

			let sign = await deserializeAndSignTransaction(
				response.result.data,
				wallet,
				connection
			);

			if (sign.err) {
				throw new Error(sign.error);
			}

			let result = await postCall("/api/sales/confirmAndSendSaleTransaction", {
				transaction: sign.serialize(),
				saleId: saleId,
				amount: parseFloat(removeCommasFromAmount(amount)),
				address: userAddress,
			});

			if (result.err) {
				throw new Error(result.error);
			}
			setIsLoading(false);
			cb && cb();

			notify({
				type: "success",
				message: "Success",
				description: "Purchase successfull",
			});
		} catch (error) {
			setIsLoading(false);

			notify({
				type: "error",
				message: "Error",
				description: error.message,
			});
		}
	}

	return (
		<div>
			<div>
				<ConnectToContentBtn
					clickEvent={() => {
						if (isLoading) return;
						fireTokenSalePurchase();
					}}
					ctaText="Buy Tokens"
				>
					<div className="text-center text-xl uppercase text-yellow-600 font-bold">
						<div>Buy tokens</div>
					</div>
					<AmountsDisplay
						isLoading={isLoading}
						amount={amount}
						setAmount={setAmount}
						originToken={originToken}
						destinationToken={destinationToken}
						destinationAmount={destinationAmount}
						destinationTokenPrice={tokenPrice ? tokenPrice : pricePerUsd}
					></AmountsDisplay>
				</ConnectToContentBtn>
			</div>
			<div className="divider mb-8 mt-10">OR</div>
		</div>
	);
}

export default SaleMarketPriceSection;
