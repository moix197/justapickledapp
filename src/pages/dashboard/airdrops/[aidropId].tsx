import { useRouter } from "next/router";
import Layout from "components/dashboard/Layout";
import SingleAirdropContent from "components/dashboard/airdrop/SingleAirdropContent";
import { DashboardAirdropDataContainer } from "contexts/dasboard/DashboardAirdropContextProvider";

function SingleAirdropPage() {
	const router = useRouter();
	const { aidropId } = router.query;

	return (
		<div>
			<DashboardAirdropDataContainer>
				<SingleAirdropContent id={aidropId}></SingleAirdropContent>
			</DashboardAirdropDataContainer>
		</div>
	);
}

SingleAirdropPage.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default SingleAirdropPage;
