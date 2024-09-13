import { useContext } from "react";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { TokenImage } from "components/utils/TokenImages";
import { StartSwapBtn } from "../StartSwapBtn";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

const ConfirmTransactionModalContent = () => {
	const {
		originTokenData,
		originTokenAmount,
		destinationTokenData,
		destinationTokenAmount,
	} = useContext(TransactionDataContext);

	return (
		<div>
			<div className="uppercase font-bold mb-6 text-yellow-600">
				<h5>confirm to begin the swap</h5>
			</div>
			<div className="flex justify-center items-center mb-6">
				<div className="flex flex-col justify-center items-center w-5/12 ">
					<TokenImage src={originTokenData.logoURI} width={10}></TokenImage>
					<div className="text-xl">
						<div>{originTokenAmount}</div>
					</div>
					<div>{originTokenData.name}</div>
				</div>
				<div className="ml-6 mr-6 text-third">
					<ChevronDoubleRightIcon></ChevronDoubleRightIcon>
				</div>
				<div className="flex flex-col justify-center items-center w-5/12 ">
					<TokenImage
						src={destinationTokenData.logoURI}
						width={10}
					></TokenImage>
					<div className="text-xl">
						<div>{destinationTokenAmount}</div>
					</div>
					<div>{destinationTokenData.symbol}</div>
				</div>
			</div>
			<div className="mb-6">
				You are sending{" "}
				<span className="font-bold text-red-400">
					{originTokenAmount} {originTokenData.name}
				</span>{" "}
				and getting{" "}
				<span className="font-bold text-third">
					{destinationTokenAmount} {destinationTokenData.name}
				</span>{" "}
				are you sure you want to continue?
			</div>
			<div className="mb-6">
				<div className="uppercase text-third font-bold">
					<div>important</div>
				</div>
				<div className="text-red-600 text-sm">
					<div>
						We have no way to REVERT this transaction so make sure that the
						tokens (check the contract addresses) and the amount are correct
					</div>
				</div>
			</div>
			<div>
				<StartSwapBtn></StartSwapBtn>
			</div>
		</div>
	);
};

export default ConfirmTransactionModalContent;
