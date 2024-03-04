import { useEffect, useState, useContext } from "react";
import { TokenDataContext } from "contexts/TokenDataContextProvider";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import TokenList from "components/utils/TokenList";
import TokenTextInput from "components/swap/TokenTextInput";
import { useRouter } from "next/router";
import { setUrlFromInput } from "utils/setUrlFromInput";
import ConfirmationModal from "components/swap/newbie/ConfirmationModal";
import InWalletTokens from "../InWalletTokens";
import ContractAddress from "components/utils/ContractAddress";
import Link from "next/link";
import { GlobeAltIcon } from "@heroicons/react/outline";
import { TokensInAccountContext } from "contexts/TokensInAccountContextProvider";
import ModalTokenData from "./ModalTokenData";

const OriginTokenForm = ({
	isOpen = false,
	setIsOpen,
	isLoading = false,
	urlParameter = "",
	title = "",
	clickEvent = () => {},
}) => {
	const router = useRouter();
	const { walletTokenListProcesed } = useContext(TokensInAccountContext);
	const { rawTokensData } = useContext(TokenDataContext);
	const [filteredTokenData, setFilteredTokenData] = useState([]);
	const { originTokenData, destinationTokenData } = useContext(
		TransactionDataContext
	);
	const [activeInput, setActiveInput] = useState(1);
	const [drawerSelectedToken, setDrawerSelectedToken] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isTokenSafe, setIsTokenSafe] = useState(false);
	const [isToken2022, setIsToken2022] = useState(false);
	const [isTokenInWallet, setIsTokenInWallet] = useState(false);
	const [activeToken, setActiveToken] = useState(null);

	useEffect(() => {
		setActiveToken(
			urlParameter == "originToken" ? originTokenData : destinationTokenData
		);
	}, []);

	useEffect(() => {
		setFilteredTokenData(rawTokensData);
	}, [rawTokensData]);

	useEffect(() => {
		document.getElementsByTagName("body")[0].style.overflow = isModalOpen
			? "hidden"
			: "scroll-y";
	}, [isModalOpen]);

	useEffect(() => {
		setActiveToken(
			urlParameter == "originToken" ? originTokenData : destinationTokenData
		);
	}, [urlParameter == "originToken" ? originTokenData : destinationTokenData]);

	useEffect(() => {
		if (!activeToken) return;
		activeToken?.tags?.find((element) => element == "unknown")
			? setIsTokenSafe(false)
			: setIsTokenSafe(true);

		activeToken?.address == "6hQb4SPG9dyMVyaqFeAaMGsnQbcAcNcCtkTm6ED34oC7" &&
			setIsTokenSafe(true);

		activeToken?.tags?.find((element) => element == "token-2022")
			? setIsToken2022(true)
			: setIsToken2022(false);

		walletTokenListProcesed.find(
			(element) => element.address == activeToken.address
		)
			? setIsTokenInWallet(true)
			: setIsTokenInWallet(false);
	}, [activeToken]);

	function resetTokenData() {
		if (filteredTokenData.length == rawTokensData.length) return;
		setFilteredTokenData(rawTokensData);
	}

	return (
		<div
			className={`relative w-full tracking-wide flex flex-col justify-start bg-primary transition-transform 
				}`}
		>
			{title && (
				<div className="text-secondary uppercase">
					<div className="text-md md:text-lg text-yellow-600 font-bold mb-2">
						<h5>{title}</h5>
					</div>
				</div>
			)}

			<div className="pb-2 pl-1 pr-1">
				<div className="flex flex-col justify-center text-center">
					<div className="w-full flex text-secondary  justify-center items-center mb-2">
						<InWalletTokens
							clickEvent={(item) => {
								if (isLoading) return;
								setIsModalOpen(true);
								setUrlFromInput(urlParameter, item, router);
							}}
							title="These are the coins in your wallet"
							limit={10}
						></InWalletTokens>
					</div>
					<div className="">
						<div className="text-xs text-center uppercase text-secondary mb-4 tracking-wider">
							<div>you can paste the contract address if you have it</div>
						</div>
						<div>
							<TokenTextInput
								focusEvent={() => {
									resetTokenData();
									setActiveInput(1);
									setDrawerSelectedToken(activeToken);
								}}
								selectedToken={activeToken}
								filterData={{
									value: true,
									data: rawTokensData,
									setFilteredDataFunction: setFilteredTokenData,
								}}
							></TokenTextInput>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="text-xs mb-2 mt-2 text-center uppercase text-secondary"></div>
				<div className="text-xs text-center uppercase text-secondary mb-4 tracking-wider">
					<div>
						{walletTokenListProcesed.length > 0 && "or"} you can write into the
						input to filter the tokens
					</div>
					<div>and select one from the list below</div>
				</div>
				<div className="h-96">
					<TokenList
						tokenData={filteredTokenData}
						selectedToken={activeToken}
						clickEvent={(item) => {
							if (isLoading) return;
							setIsModalOpen(true);
							if (urlParameter == "originToken") {
								setUrlFromInput("originToken", item, router);
							} else {
								setUrlFromInput("destinationToken", item, router);
							}
						}}
					></TokenList>
				</div>
			</div>
			<ConfirmationModal
				modalStatus={isModalOpen}
				setModalStatus={() => {
					setIsModalOpen(false);
				}}
				btnText="NEXT"
				isSafe={isTokenSafe}
				clickEvent={clickEvent}
			>
				<ModalTokenData
					tokenData={
						urlParameter == "originToken"
							? originTokenData
							: destinationTokenData
					}
					isTokenSafe={isTokenSafe}
					isTokenInWallet={isTokenInWallet}
					isToken2022={isToken2022}
				></ModalTokenData>
			</ConfirmationModal>
		</div>
	);
};

export default OriginTokenForm;
