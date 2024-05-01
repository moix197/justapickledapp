import { TitleLg, TitleXl } from "components/dashboard/Titles";
import BtnExecuteActionWhenTimePassed from "../BtnExecuteActionWhenTimePassed";
import AirdropStatusBtn from "./AirdropStatusBtn";
import { addCommasToAmount } from "utils/formatAndUpdateAmount";
import { getCall } from "services/apiSkeletons/calls";
import { useContext, useEffect, useState } from "react";
import ContractAddress from "components/utils/ContractAddress";
import { BasicButton } from "components/buttons/Basic";
import { DashboardAirdropDataContext } from "contexts/dasboard/DashboardAirdropContextProvider";
import TrueFalseWithIcons from "components/utils/TrueFalseWithIcons";

function SingleAirdropContent({ id = null }) {
	const [users, setUsers] = useState([]);
	const { selectedAirdrop, setActiveId, setReloadAirdrops } = useContext(
		DashboardAirdropDataContext
	);
	const [values, setValues] = useState([]);

	useEffect(() => {
		getAllAirdropUsers();
	}, []);

	useEffect(() => {
		setValues([
			{ key: "Airdrop Name", value: selectedAirdrop?.name },
			{ key: "Token Name", value: selectedAirdrop?.tokenName },
			{
				key: "is Active",
				value: <TrueFalseWithIcons value={selectedAirdrop?.isActive} />,
			},
			{ key: "Vesting Parts", value: selectedAirdrop?.breakRewardInParts },
			{
				key: "Holders snapshot",
				value: (
					<TrueFalseWithIcons value={selectedAirdrop?.tookHoldersSnapshot} />
				),
			},
			{ key: "Vesting time release", value: selectedAirdrop?.partsTimeFrame },
			{
				key: "Total Amount",
				value: selectedAirdrop?.fullAmount
					? addCommasToAmount(selectedAirdrop?.fullAmount.toString(), 0)
					: 0,
			},
			{
				key: "Amount release",
				value: selectedAirdrop?.partAmount
					? addCommasToAmount(selectedAirdrop?.partAmount.toString(), 0)
					: 0,
			},
			{
				key: "Parts Sent till date",
				value: selectedAirdrop?.amountPartsReleased,
			},
			{ key: "Airdrop Users", value: selectedAirdrop?.participantsQty },
			{
				key: "Released per user",
				value: addCommasToAmount(
					(
						selectedAirdrop?.partAmount * selectedAirdrop?.amountPartsReleased
					).toString(),
					0
				),
			},
			{
				key: "Released total",
				value: addCommasToAmount(
					(
						selectedAirdrop?.partAmount * selectedAirdrop?.participantsQty
					).toString(),
					0
				),
			},
			{ key: "Next Unlock Date", value: selectedAirdrop?.unlockDate },
		]);
	}, [selectedAirdrop]);

	useEffect(() => {
		setActiveId(id);
	}, [id]);

	async function updateAmountReleased() {
		const url = "/api/airdrop/auth/tasks/updateAvailableAirdrop";
		let response = await fetch(url);
		let data = await response.json();
		setReloadAirdrops(true);
		return data;
	}

	async function getAllAirdropUsers() {
		let dbUsers = await getCall(
			`/api/airdrop/auth/db/getAirdropUsers?airdropName=twitter_airdrop`
		);
		setUsers(dbUsers.result);
	}

	return (
		<div>
			<div className="flex flex-wrap text-secondary">
				<div className="mb-8 bg-primary rounded-lg p-6 border border-fourth">
					<div className="mb-2">
						<TitleXl>{selectedAirdrop?.name} Data</TitleXl>
					</div>
					<ul className="flex flex-wrap justify-between">
						{values.map((item) => (
							<li
								key={item.key.split(" ").join("_")}
								className="p-4 w-6/12 md:w-3/12"
							>
								<div className="text-third uppercase text-sm">{`${item.key}`}</div>
								<div>{item.value}</div>
							</li>
						))}
					</ul>
				</div>
				<div className="w-full mb-8 bg-primary rounded-lg p-6 border border-fourth">
					<div className="mb-4">
						<TitleLg>Manage your airdrop</TitleLg>
					</div>
					<div>
						<div className="w-full flex items-center justify-between mb-4">
							<div className="mb-2 uppercase">
								<div>Release next vested round</div>
							</div>
							<BtnExecuteActionWhenTimePassed
								unlockDate={selectedAirdrop?.unlockDate}
								timeFrame={selectedAirdrop?.partsTimeFrame}
								clickEvent={updateAmountReleased}
							>
								Release funds
							</BtnExecuteActionWhenTimePassed>
						</div>
						<div className="w-full flex items-center justify-between ">
							<div className="mb-2 uppercase">
								<div>Update Airdrop Status</div>
							</div>
							<AirdropStatusBtn
								airdropName={selectedAirdrop?.name}
								value={selectedAirdrop?.isActive}
								cb={setReloadAirdrops}
							></AirdropStatusBtn>
						</div>
					</div>
				</div>
				<div className="w-full">
					<div className="bg-primary rounded-lg p-6 border border-fourth">
						<div className="mb-6">
							<TitleLg>Manage Airdrop Users</TitleLg>
						</div>
						<div className="w-full">
							<div className="flex justify-between p-3 text-center uppercase bg-fourth mb-4">
								<div className="w-6/12 md:w-3/12">
									<div>Wallet</div>
								</div>
								<div className="hidden md:block md:w-3/12">
									<div>Airdropped</div>
								</div>

								<div className="hidden md:block md:w-3/12">
									<div>Claimed</div>
								</div>
								<div className="w-6/12 md:w-3/12">
									<div></div>
								</div>
							</div>
							{users &&
								users.map((item) => (
									<div
										key={`${item.wallet}_cto`}
										className="flex p-3 text-center justify-between items-center border-b border-gray-800"
									>
										<div className="w-6/12 md:w-3/12">
											<ContractAddress
												text=" "
												ca={item.wallet}
											></ContractAddress>
										</div>
										<div className="hidden md:w-3/12 md:flex md:justify-center">
											{item.wasAirdropped == true ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-6 h-6 text-third"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
													/>
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-6 h-6 text-red-600"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
													/>
												</svg>
											)}
										</div>

										<div className="hidden md:block md:w-3/12">
											<div>{item.rewards.claimed}</div>
										</div>
										<div className="w-6/12 md:w-3/12">
											<div>
												<BasicButton className="pt-2 pb-2 bg-primary font-normal text-sm">
													Check
												</BasicButton>
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleAirdropContent;
