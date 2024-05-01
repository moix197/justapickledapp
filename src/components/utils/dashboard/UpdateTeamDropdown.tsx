import { useContext, useEffect, useState } from "react";
import BasicForm from "../forms/BasicForm";
import { TitleLg } from "components/dashboard/Titles";
import { getCall, postCall } from "services/apiSkeletons/calls";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { updateCollection } from "services/dashboard/updateCollection";
import { DashboardSalesDataContext } from "contexts/dasboard/DashboardSalesContextProvider";

function UpdateTeamDropdown({ collectionItemId, teamId, collection }) {
	const { setReloadSales } = useContext(DashboardSalesDataContext);
	const [userPublicKey] = useContext(WalletDataContext);
	const [teams, setTeams] = useState(null);

	const fields = [
		{
			name: "teamId",
			label: "Team",
			placeholder: "Select a team",
			defaultValue: teamId ? teamId : "default",
			options: teams,
			type: "select",
		},
	];

	useEffect(() => {
		if (!userPublicKey) return;
		let getTeams = async () => {
			let result = await getCall(
				`/api/services/getTeams?wallet=${userPublicKey?.toString()}`
			);
			setTeams(result.result);
		};
		getTeams();
	}, [userPublicKey]);

	return (
		<div>
			{fields.length > 0 && (
				<div>
					<TitleLg>Team data</TitleLg>
					{teams && (
						<BasicForm
							formValues={fields}
							btnText={"Update team"}
							cb={async (item) => {
								let result = await updateCollection(
									item,
									collection,
									collectionItemId
								);
								if (!result.err) {
									setReloadSales(true);
								}
							}}
						></BasicForm>
					)}
				</div>
			)}
		</div>
	);
}

export default UpdateTeamDropdown;
