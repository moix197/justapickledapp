import { TitleXl } from "components/dashboard/Titles";
import Layout from "components/sales/Layout";
import SingleSaleCard from "components/sales/SingleSaleCard";
import { useEffect, useState } from "react";
import { getCall } from "services/apiSkeletons/calls";
import ContractAddress from "components/utils/ContractAddress";
import Image from "next/image";
import { addCommasToAmount } from "utils/formatAndUpdateAmount";
import WarningText from "components/utils/WarningText";

function SalesIndex() {
	const [sales, setSales] = useState([]);

	useEffect(() => {
		getSales();
	}, []);

	async function getSales() {
		const dbSales = await getCall(`/api/services/getAllSales`);
		console.log(dbSales.result);
		setSales(dbSales.result);
	}

	return (
		<div>
			<div className="text-center mb-6 mt-4">
				<TitleXl>Available Sales</TitleXl>
			</div>
			<div className="mb-6">
				<WarningText>
					IMPORTANT: at the moment all sales that you will see or set in the
					platform are mockups, none of these are real so make sure that you
					only proceed with transactions of your own sales otherwise you may
					lose your funds.<br></br>
					All data here will be wipe out when we move this to our production
					enviroment
				</WarningText>
			</div>
			<div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{sales &&
						sales.map((item, index) => {
							return (
								<SingleSaleCard
									id={item._id}
									name={item.name}
									items={[
										{
											title: "Token",
											value: (
												<div className="uppercase flex justify-center items-center">
													<div className="mr-2 w-8 h-8 relative rounded-full overflow-hidden">
														<Image
															fill
															className="object-cover"
															src={item.tokenData[0].metadata.image}
															alt={`${item.tokenData[0].metadata.symbol}_alt_image_${index}`}
														></Image>
													</div>
													<div>{item.tokenData[0].metadata.symbol}</div>
												</div>
											),
										},
										{
											title: "Vault Status",
											value: <div className="uppercase">{item.status}</div>,
										},
										{
											title: "Vault Address",
											value: (
												<ContractAddress
													ca={item.owner}
													text=" "
												></ContractAddress>
											),
										},
										{
											title: "Tokens Left",
											value: addCommasToAmount(
												item.vaultData.amount.left.toString(),
												0
											),
										},
										{
											title: "Target",
											value:
												item.target == "private" ? "PRIVATE" : "OPEN TO ALL",
										},
									]}
								></SingleSaleCard>
							);
						})}
				</div>
			</div>
		</div>
	);
}

SalesIndex.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default SalesIndex;
