import { BasicButton } from "components/buttons/Basic";
import { TitleLg, TitleXl } from "components/dashboard/Titles";
import BasicForm from "components/utils/forms/BasicForm";
import { useState } from "react";
import { getCall } from "services/apiSkeletons/calls";
import { addCommasToAmount } from "utils/formatAndUpdateAmount";

function CheckIfParticipant({ title = null, collection, itemId }) {
	const [allocation, setAllocation] = useState(null);

	async function checkAllocation(item) {
		let response = await getCall(`/api/services/getUsers`, {
			address: item.walletAddress,
			relatedItemId: itemId,
			collection: collection,
		});

		setAllocation(response.result);
	}

	const formValues = [
		{
			name: "walletAddress",
			label: "",
			placeholder: "PASTE WALLET ADDRESS HERE",
			type: "text",
			validation: "wallet",
		},
	];

	function checkDifferentWallet() {
		return (
			<div
				onClick={() => {
					setAllocation(null);
				}}
			>
				<BasicButton className="bg-primary">Check different wallet</BasicButton>
			</div>
		);
	}

	return (
		<div className="flex justify-center w-full">
			{!allocation ? (
				<div className="w-full">
					{formValues.length > 0 && (
						<div>
							<TitleLg>Check sale allocation</TitleLg>
							<BasicForm
								formValues={formValues}
								btnText={"Check"}
								cb={async (item) => {
									checkAllocation(item);
								}}
							></BasicForm>
						</div>
					)}
				</div>
			) : allocation.length > 0 ? (
				<div className="text-center text-secondary">
					<div className="mb-4">
						<TitleXl>Congratulations</TitleXl>
					</div>
					<div>
						<div className="text-lg uppercase mb-2">
							<div>You have an spot in this sale</div>
						</div>
						<div className="mb-4">
							<div>
								You can buy up to{" "}
								<span className="text-lg text-third">
									{`${addCommasToAmount(
										allocation[0]?.rewards?.toBuy.toString(),
										0
									)} `}{" "}
									tokens
								</span>
							</div>
						</div>
						<div className="mb-10">{checkDifferentWallet()}</div>
						<div className="text-red-400 text-[10px] uppercase tracking-wider">
							<div>
								please remember to do your own research about the team and
								revise the vault and vesting information/rules before proceeding
								with any purchase.
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="w-full text-center text-secondary">
					<div className="mb-4">
						<TitleXl>We are sorry</TitleXl>
					</div>
					<div className="mb-4">
						<div>You do not have any buy allocation for this sale.</div>
					</div>
					<div>{checkDifferentWallet()}</div>
				</div>
			)}
		</div>
	);
}

export default CheckIfParticipant;
