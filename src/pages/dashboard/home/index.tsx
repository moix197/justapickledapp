import Layout from "components/dashboard/Layout";
import ListSection from "components/dashboard/ListSection";
import SectionLayout from "components/dashboard/SectionLayout";
import { TitleLg, TitleXl } from "components/dashboard/Titles";
import WarningText from "components/utils/WarningText";
import Link from "next/link";
function Sales() {
	return (
		<div>
			<SectionLayout className="mb-4">
				<div className="mb-4">
					<TitleXl>Welcome to Pickle Sales</TitleXl>
				</div>
				<div>
					<WarningText>
						IMPORTANT: at the moment all sales that you will see or set in the
						platform are mockups, none of these are real so make sure that you
						only proceed with transactions of your own sales otherwise you may
						lose your funds.<br></br>
						All data here will be wipe out when we move this to our production
						enviroment
					</WarningText>
				</div>
			</SectionLayout>
			<SectionLayout>
				<div className="flex flex-col justify-center items-center">
					<div className="mb-4">
						<TitleLg>In order to create a new sale you need to:</TitleLg>
					</div>
					<ul className="text-left w-full max-w-md child:mb-2 uppercase text-sm tracking-wider">
						<li>
							<span className="text-yellow-600 font-bold">1. </span>Open the
							menu on the left and go to "Vaults"
						</li>
						<li>
							<span className="text-yellow-600 font-bold">2. </span> Click on
							the "New Vault" button
						</li>
						<li>
							<span className="text-yellow-600 font-bold">3. </span> Fill out
							the data and click on "Create New Vault"
						</li>
						<li>
							<span className="text-yellow-600 font-bold">4. </span> Open the
							menu on the left again and select "Token Sales" this time
						</li>
						<li>
							<span className="text-yellow-600 font-bold">5. </span> Click on
							the "New Sale" button{" "}
						</li>
						<li>
							<span className="text-yellow-600 font-bold">6. </span> Fill out
							the data and click on "Create New Token Sale"{" "}
						</li>
						<li>
							<span className="text-yellow-600 font-bold">7. </span> Go back to
							the Sales page find the Sale name you just created and lick the
							"Manage" button
						</li>
						<li>
							<span className="text-yellow-600 font-bold">8. </span> Confirm
							that all your data is correct and click the "Lock Sale Now" button{" "}
						</li>
						<li>
							<span className="text-yellow-600 font-bold">9. </span> Now in the
							same page find the "Manage Sale" section and click the Toggle
							button
						</li>
						<li>
							<span className="text-yellow-600 font-bold">10. </span> A "Preview
							Sale" button should have appeared, click on it and it should open
							a new tab with your sale on it
						</li>
						<li>
							<span className="text-third font-bold">11. </span> You should also
							be able to see your sale from{" "}
							<Link
								href="https://dapp.justapickle.tech/sales"
								className="text-third"
							>
								https://dapp.justapickle.tech/sales
							</Link>
						</li>
					</ul>
				</div>
			</SectionLayout>
		</div>
	);
}

Sales.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Sales;
