import Layout from "components/dashboard/Layout";
import TeamsListSection from "components/dashboard/teams/TeamsListSection";

function Sales() {
	return <TeamsListSection></TeamsListSection>;
}

Sales.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Sales;
