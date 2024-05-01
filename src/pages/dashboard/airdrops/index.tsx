import Layout from "components/dashboard/Layout";
import AirdropsListSection from "components/dashboard/airdrop/AirdropsListSection";
import { DashboardAirdropDataContainer } from "contexts/dasboard/DashboardAirdropContextProvider";

function Airdrops() {
	return (
		<DashboardAirdropDataContainer>
			<AirdropsListSection></AirdropsListSection>
		</DashboardAirdropDataContainer>
	);
}

Airdrops.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Airdrops;
