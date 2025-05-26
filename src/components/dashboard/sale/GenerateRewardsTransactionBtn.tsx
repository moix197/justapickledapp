import { useWallet } from "@solana/wallet-adapter-react";
import { BasicButton } from "components/buttons/Basic";
import { useState } from "react";
import { getCall, postCall } from "services/apiSkeletons/calls";
import { notify } from "utils/notifications";
import { deserializeAndSignTransaction } from "utils/transactions";
import { connection } from "utils/connection";

function GenerateRewardsTransactionBtn({
	user = null,
	saleId = null,
	reloadUsers = null,
}) {
	const [isLoading, setIsLoading] = useState(false);
	const singleRewardTransaction = "/api/priv/dashboard/getRewardsTransaction";
	const multiRewardTransaction =
		"/api/priv/dashboard/getMultiRewardsTransaction";

	const wallet = useWallet();

	async function generateRewardsTransaction() {
		if ((!user && !saleId) || isLoading) return;
		try {
			setIsLoading(true);
			let response = await getCall(
				saleId ? multiRewardTransaction : singleRewardTransaction,
				{
					saleId: saleId ? saleId : user.relatedItemId,
					userAddress: user && user.address,
				}
			);

			console.log("response");
			console.log(response);
			if (response.err) {
				throw new Error(response.error);
			}

			let sign = await deserializeAndSignTransaction(
				response.result.transaction.data,
				wallet,
				connection
			);

			if (sign.err) {
				throw new Error(sign.error);
			}

			let result = await postCall(
				"/api/priv/dashboard/confirmAndSendRewardsTransaction",
				{
					transaction: sign.serialize(),
					saleId: saleId ? saleId : user.relatedItemId,
					address: user ? [user.address] : response.result.users,
				}
			);

			if (result.err) {
				throw new Error(result.error);
			}

			setIsLoading(false);
			reloadUsers && reloadUsers();
			notify({
				type: "success",
				message: "Success",
				description: "Rewards sent successfully",
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
		<div
			onClick={() => {
				generateRewardsTransaction();
			}}
		>
			<BasicButton className="bg-primary" isLoading={isLoading}>
				Release rewards
			</BasicButton>
		</div>
	);
}

export default GenerateRewardsTransactionBtn;
