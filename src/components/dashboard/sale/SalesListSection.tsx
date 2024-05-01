import { useContext } from "react";
import { DashboardSalesDataContext } from "contexts/dasboard/DashboardSalesContextProvider";
import ListSection from "components/dashboard/ListSection";

function SalesListSection() {
	const { sales } = useContext(DashboardSalesDataContext);
	const childrenFields = {
		status: "isActive",
		id: "_id",
		values: [
			{ key: "name", value: "name" },
			{ key: "type", value: "type" },
			{ key: "price", value: "price.type" },
		],
	};
	return (
		<div>
			<ListSection
				name="Sale"
				items={sales}
				childrenFields={childrenFields}
				ctaUrl={"/dashboard/sales/new"}
				childrenUrl={"/dashboard/sales"}
				toolTipContent={"Create or Manage your sales from this screen"}
			></ListSection>
		</div>
	);
}

export default SalesListSection;
