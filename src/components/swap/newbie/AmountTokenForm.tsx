import { useEffect, useState, useRef, useContext } from "react";
import QuickAmountBtns from "components/swap/QuickAmountBtns";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { BasicButton } from "components/buttons/Basic";
import { useRouter } from "next/router";
import {
	addCommasToAmount,
	removeCommasFromAmount,
} from "utils/formatAndUpdateAmount";
import { debounce } from "utils/debounce";
import { TokensInAccountContext } from "contexts/TokensInAccountContextProvider";
import ConfirmationModal from "./ConfirmationModal";
import ConfirmTransactionModalContent from "./ConfirmTransactionModalContent";
import { TokenAmountInput } from "components/swap/TokenAmountInput";
import { RefreshPriceBtn } from "../RefreshPriceBtn";
import UsdcValueOfTransactionCont from "../UsdcValueOfTransactionCont";
import WaitingForTransactionContent from "./WaitingForTransactionContent";
import SuccessScreenContent from "./SuccessScreenContent";

const CoinInput = ({
	disable = false,
	isLoading = false,
	token,
	showRefreshPrice = { value: false, getNewQuote: (value) => {} },
	showTokenList = () => {},
}) => {
	const router = useRouter();
	const [amount, setAmount] = useState("0");
	const [tokensInWallet, setTokensInWallet] = useState(null);
	const [isAmountEnough, setIsAmountEnough] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { walletTokenListProcesed } = useContext(TokensInAccountContext);

	const amountValueNow = useRef(0);
	const {
		originTokenData,
		originTokenAmount,
		destinationTokenData,
		destinationTokenAmount,
		isLoadingTransaction,
		transactionSignature,
		isLoadingQuote,
		setGetNewQuote,
		setTransactionSignature,
		destinationTokenValuePerUsd,
		originTokenValuePerUsd,
	} = useContext(TransactionDataContext);

	useEffect(() => {
		getAmountInWallet();
	}, [originTokenData]);

	useEffect(() => {
		handleChange(amount);
		checkIfAmountIsEnough();
	}, [amount]);

	useEffect(() => {
		if (!originTokenAmount) return;
		let finalAmount = addCommasToAmount(
			originTokenAmount,
			originTokenData?.decimals
		);
		setAmount(finalAmount);
	}, [originTokenAmount]);

	function handleChange(amount) {
		debounce(amountValueNow, amount, 1000, async () => {
			router.query["amount"] = removeCommasFromAmount(amount);
			router.push({
				pathname: "/swap",
				query: router.query,
			});
		});
	}

	function getAmountInWallet() {
		let walletItem = walletTokenListProcesed.find(
			(element) => element.address == originTokenData.address
		);

		if (!walletItem) return;
		let finalAmount = addCommasToAmount(
			walletItem?.uiAmountString,
			walletItem?.decimals
		);

		let tokensInWalletObj = {
			amountWithcommas: finalAmount,
			...walletItem,
		};

		setTokensInWallet(tokensInWalletObj);
	}

	function checkIfAmountIsEnough() {
		let noCommasAmount = removeCommasFromAmount(amount);
		if (!tokensInWallet) return;
		setIsAmountEnough(tokensInWallet.uiAmount >= noCommasAmount);
	}

	function showCorrectModalContent() {
		if (transactionSignature && transactionSignature?.type != "error") {
			return (
				<SuccessScreenContent
					tx={transactionSignature.txid}
				></SuccessScreenContent>
			);
		} else if (transactionSignature && transactionSignature?.type == "error") {
			setGetNewQuote(true);
		} else if (isLoadingTransaction) {
			return <WaitingForTransactionContent></WaitingForTransactionContent>;
		}

		return <ConfirmTransactionModalContent></ConfirmTransactionModalContent>;
	}

	return (
		<div className="w-full flex flex-col mt-14 tracking-wide">
			<div className="mb-2 uppercase text-md md:text-lg text-yellow-600 font-bold">
				<div>ENTER YOUR SWAP AMOUNT Below</div>
			</div>
			{tokensInWallet && (
				<div className="text-third uupercase text-sm mb-2">
					<div>
						YOU HAVE
						<span className="text-lg font-bold">{` ${tokensInWallet?.amountWithcommas} ${originTokenData?.name} `}</span>
						TOKENS
					</div>
				</div>
			)}
			<div className="flex justify-center mb-1">
				<QuickAmountBtns
					selectedToken={originTokenData}
					isLoading={isLoading}
				/>
			</div>
			<label className="input input-bordered border-fourth flex items-center gap-2 w-full overflow-hidden mt-2 pl-2 pr-2">
				{isLoadingQuote && (
					<span className="loading loading-ring loading-md text-third"></span>
				)}

				<input
					type="text"
					placeholder="AMOUNT"
					className={`grow bg-primary 4 text-xl ${
						isLoadingQuote && "opacity-0"
					} text-secondary`}
					onChange={(e) => {
						if (!/^[0-9,.]*$/.test(e.target.value)) return;
						if (isLoading) return;
						let amountWithCommas = addCommasToAmount(
							e.target.value,
							token?.decimals
						);

						setAmount(amountWithCommas);
					}}
					onBlur={(e) => {
						if (!e.target.value || e.target.value == "0") {
							setAmount("1");
						}
					}}
					value={amount}
					disabled={disable}
				/>
				<RefreshPriceBtn></RefreshPriceBtn>
			</label>
			<div className="uppercase mt-4">
				{!isAmountEnough && (
					<div className="text-red-400 font-bold text-sm mb-4">
						You don't have anough tokens for the amount you inputed
					</div>
				)}
				{<UsdcValueOfTransactionCont></UsdcValueOfTransactionCont>}
				<div className="flex justify-evenly mb-6 text-secondary">
					<div className="w-6/12 ">
						<div className="mb-1">
							<div>you send</div>
						</div>
						<div className="mb-2 font-bold">
							<div className="text-lg md:text-3xl text-red-400 ">{amount}</div>
							<div className="text-xs md:text-md text-red-400">{`${originTokenData.symbol}`}</div>
							{originTokenData.symbol != "USDC" && (
								<div className="font-normal text-xs mt-1">
									<div>
										1
										{` ${originTokenData.symbol} = ${originTokenValuePerUsd} USDC`}
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="w-6/12">
						<div className="mb-1">
							<div>you get</div>
						</div>
						<div className="font-bold">
							<div className="text-lg md:text-3xl text-third">
								{!isLoadingQuote ? (
									addCommasToAmount(
										destinationTokenAmount,
										destinationTokenData.decimals
									)
								) : (
									<span className="loading loading-ring loading-md text-third"></span>
								)}
							</div>
							<div className="text-xs md:text-md  text-third">{`${destinationTokenData.symbol}`}</div>
							<div className="font-normal text-xs mt-1">
								{destinationTokenData.symbol != "USDC" && (
									<div>
										1
										{` ${destinationTokenData.symbol} = ${destinationTokenValuePerUsd} USDC`}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div>
					<div
						onClick={() => {
							setGetNewQuote(true);
						}}
					>
						<BasicButton
							className="bg-primary p-10 border-error"
							clickEvent={() => {
								setIsModalOpen(true);
							}}
						>
							SEND TRANSACTION
						</BasicButton>
					</div>
				</div>
			</div>
			<ConfirmationModal
				modalStatus={isModalOpen}
				setModalStatus={() => {
					setIsModalOpen(false);
				}}
				hideCloseBtn={isLoadingTransaction}
				//clickEvent={clickEvent}
			>
				{showCorrectModalContent()}
			</ConfirmationModal>
		</div>
	);
};

export default CoinInput;
