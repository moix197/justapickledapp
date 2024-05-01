import Layout from "components/dashboard/Layout";
import SalesListSection from "components/dashboard/sale/SalesListSection";
function Sales() {
	return <SalesListSection></SalesListSection>;
}

Sales.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Sales;
