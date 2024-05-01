import { BasicButton } from "components/buttons/Basic";
import { TitleXl } from "components/dashboard/Titles";
import GeneralData from "components/sales/GeneralData";
import Layout from "components/sales/Layout";
import SaleMarketPriceSection from "components/sales/SaleMarketPriceSection";
import TokenData from "components/sales/TokenData";
import TypeCont from "components/sales/TypeCont";
import VaultCont from "components/sales/VaultCont";
import VestingCont from "components/sales/VestingCont";
import EventCountdown from "components/utils/EventCountdown";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getCall } from "services/apiSkeletons/calls";
import { convertDateToMDY } from "utils/convertDateToMDY";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { checkDateIsAfterToday } from "utils/checkTimePassed";

function SingleSale() {
	const router = useRouter();
	const { salesId } = router.query;
	const [data, SetData] = useState(null);
	const [userPublicKey] = useContext(WalletDataContext);
	const [isSaleLive, setIsSaleLive] = useState(true);

	useEffect(() => {
		getSale();
	}, [salesId]);

	useEffect(() => {
		let result = checkDateIsAfterToday(data?.datesData.launch);
		console.log("result");
		console.log(result);
		setIsSaleLive(!result);
	}, [data]);
	async function getSale() {
		let response = await getCall(
			`/api/services/getSingleCompleteTokenSale?id=${salesId}`
		);

		SetData(response.result);
	}

	return (
		<div>
			{!data?.saleData?.isActive ? (
				<div className="h-[calc(100vh-69px)] w-full flex justify-center items-center text-center">
					<TitleXl>THIS sale is not active</TitleXl>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center">
					<div className="text-center mt-10 mb-4">
						<TitleXl>
							<TypeCont
								value={data?.saleData?.type}
								coinName={data?.tokenData?.metadata?.name}
							></TypeCont>
						</TitleXl>
					</div>
					<div className="flex flex-col justify-center items-center mb-8">
						<EventCountdown
							launchDate={data?.datesData.launch}
						></EventCountdown>
					</div>

					{data?.vaultData?.amount.inVault <
						data?.vaultData?.amount.initial && (
						<div className="mb-4">
							<div className="text-red-400 uppercase text-center text-xs tracking-wider">
								notice that there's not enough token in the vault to cover the
								sale amount
							</div>
						</div>
					)}
					<div className="flex flex-wrap gap-5 w-full justify-center mb-10">
						<TokenData tokenData={data?.tokenData}></TokenData>
						<GeneralData saleData={data?.saleData}></GeneralData>
						<VaultCont
							vaultData={data?.vaultData}
							saleType={data?.saleData?.type}
						></VaultCont>
						{data?.vestingData?.nextDate && (
							<VestingCont vestingData={data?.vestingData}></VestingCont>
						)}
					</div>
					<div className="w-10/12 mb-10">
						{isSaleLive && (
							<div className="w-full mb-8">
								<SaleMarketPriceSection
									destinationToken={{
										symbol: data?.tokenData?.metadata?.symbol,
										decimals: data?.tokenData?.info?.decimals,
										ca: data?.tokenData?.address,
									}}
									saleType={data?.saleData?.price?.type}
									tokenPrice={data?.saleData?.price?.amount}
									saleId={data?.saleData?._id}
									userAddress={userPublicKey?.toString()}
									cb={getSale}
								></SaleMarketPriceSection>
							</div>
						)}
						{data?.saleData?.target == "private" && (
							<div>
								<div className="text-center uppercase mb-2 text-yellow-600 font-bold">
									<div>
										Check your allocation without connecting your wallet
									</div>
								</div>
								<Link href={`/sales/check/${salesId}`}>
									<BasicButton className="w-full">
										<div>Go check</div>
									</BasicButton>
								</Link>
							</div>
						)}
					</div>

					{data?.vestingData?.nextDate && (
						<div className="text-center max-w-xl text-secondary tracking-wider mb-8">
							<div className="tex-center text-red-400 uppercase">
								<div>important</div>
							</div>
							<div className=" text-sm">
								<div>
									This sale has a vesting strategy, which means that your total
									allocation will be released in {data?.vestingData?.parts}{" "}
									parts with intervals of {data?.vestingData?.interval} hours
									each, and the first release date is:{" "}
									{convertDateToMDY(data?.vestingData?.nextDate)}
								</div>
							</div>
						</div>
					)}

					<div className="text-center">
						<div className="text-sm uppercase mb-2 text-yellow-600 font-bold">
							<div>check the token at</div>
						</div>
						<div className="flex justify-center mb-4 gap-5 uppercase text-xs tracking-wider">
							<div className="cursor-pointer hover:text-third">
								<Link
									href={`https://solana.fm/address/${data?.tokenData?.address}`}
									target="_blank"
								>
									<div>
										<div>SolanaFm</div>
									</div>
								</Link>
							</div>
							<div className="cursor-pointer hover:text-third">
								<Link
									href={`https://birdeye.so/token/${data?.tokenData?.address}?chain=solana`}
									target="_blank"
								>
									<div>
										<div>birdeye</div>
									</div>
								</Link>
							</div>
							<div className="cursor-pointer hover:text-third">
								<Link
									href={`https://rugcheck.xyz/tokens/${data?.tokenData?.address}`}
									target="_blank"
								>
									<div>
										<div>Rugcheck</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

SingleSale.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default SingleSale;
