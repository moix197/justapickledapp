import Layout from "components/dashboard/Layout";
import SingleSaleContent from "components/dashboard/sale/SingleSaleContent";

function SingleAirdropPage() {
	return (
		<div>
			<SingleSaleContent></SingleSaleContent>
		</div>
	);
}

SingleAirdropPage.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default SingleAirdropPage;
