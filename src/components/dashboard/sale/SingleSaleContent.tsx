import { DashboardSalesDataContext } from "contexts/dasboard/DashboardSalesContextProvider";
import ItemDataSection from "../ItemDataSection";
import { useContext, useEffect, useState } from "react";
import TrueFalseWithIcons from "components/utils/TrueFalseWithIcons";
import UpdateStatusToggle from "components/utils/dashboard/UpdateStatusToggle";
import { TitleLg } from "../Titles";
import UpdateSaleForm from "./UpdateSaleForm";
import UpdateDatesForm from "components/utils/dashboard/UpdateDatesForm";
import UpdateVestingForm from "components/utils/dashboard/UpdateVestingForm";
import UpdateVaultDropdown from "components/utils/dashboard/UpdateVaultDropdown";
import UpdateTeamDropdown from "components/utils/dashboard/UpdateTeamDropdown";
import SectionLayout from "../SectionLayout";
import { BasicButton } from "components/buttons/Basic";
import Link from "next/link";
import LockBtn from "../LockBtn";
import TooltipHelp from "components/utils/TooltipHelp";

function SingleSaleContent() {
	const { sales, selectedSale, setReloadSales, activeId } = useContext(
		DashboardSalesDataContext
	);

	const items = [
		{
			key: "Status",
			value: <div className="uppercase">{selectedSale?.status}</div>,
		},
		{
			key: "Has Vesting",
			value: <TrueFalseWithIcons value={selectedSale?.vestingId} />,
		},
		{
			key: "is Sale Active",
			value: <TrueFalseWithIcons value={selectedSale?.isActive} />,
		},
		{
			key: "has team assigned",
			value: <TrueFalseWithIcons value={selectedSale?.teamId} />,
		},
		{ key: "Sale Type", value: selectedSale?.type },
		{ key: "Users", value: selectedSale?.usersQty },
		{ key: "Redeem type", value: selectedSale?.redeem },
		{ key: "Price strategy", value: selectedSale?.price?.type },
	];
	return (
		<div className="flex flex-wrap gap-4">
			{selectedSale?.status != "locked" && (
				<div className="w-full">
					<SectionLayout>
						<div className="flex">
							<div className="grow">
								<LockBtn
									collection="sales"
									itemId={activeId}
									reload={setReloadSales}
								>
									Lock sale now
								</LockBtn>
							</div>
							<TooltipHelp
								className="ml-4"
								text={
									"Lock the sale only when you are sure that your sale data is totally ready, you won't be able to undo the locking of a sale"
								}
								type="button"
							></TooltipHelp>
						</div>
					</SectionLayout>
				</div>
			)}
			<div className="w-full md:w-[calc(70%-0.5rem)] ">
				<ItemDataSection
					items={items}
					name={selectedSale?.name}
				></ItemDataSection>
			</div>
			<div className="w-full md:w-[calc(30%-0.5rem)] flex flex-col gap-4 ">
				<SectionLayout>
					<div className="mb-8">
						<div className="mb-4">
							<TitleLg>Manage sale </TitleLg>
						</div>
						<div className="w-full flex items-center justify-between">
							<div className="uppercase">
								<div>
									{selectedSale?.isActive ? (
										<span className="text-third">ACTIVE</span>
									) : (
										<span className="text-red-400">INACTIVE</span>
									)}
								</div>
							</div>
							<UpdateStatusToggle
								value={selectedSale?.isActive}
								id={activeId}
								cb={() => {
									setReloadSales(true);
								}}
							></UpdateStatusToggle>
						</div>
					</div>
					{selectedSale?.isActive && (
						<div className="mb-3">
							<Link href={`/sales/${activeId}`} target="_blank">
								<BasicButton className="bg-primary pb-2 pt-2 text-sm">
									Preview Sale
								</BasicButton>
							</Link>
						</div>
					)}
					<Link href={`/dashboard/sales/users/${activeId}`}>
						<BasicButton className="bg-primary pb-2 pt-2 text-sm">
							Manage users
						</BasicButton>
					</Link>
				</SectionLayout>
			</div>
			<div className="w-full">
				<SectionLayout>
					{selectedSale?._id && (
						<UpdateSaleForm
							collection="tokenSales"
							collectionItemId={activeId}
							saleData={selectedSale}
							cb={() => {
								setReloadSales(true);
							}}
							disabled={selectedSale?.status == "locked"}
						></UpdateSaleForm>
					)}
				</SectionLayout>
			</div>
			<div className="w-full ">
				<SectionLayout>
					<UpdateVaultDropdown
						vaultId={selectedSale?.vaultId}
						collection="tokenSales"
						collectionItemId={activeId}
						disabled={selectedSale?.status == "locked"}
					></UpdateVaultDropdown>
				</SectionLayout>
			</div>
			{/*<div className="w-full md:w-[calc(50%-0.5rem)]">
				<SectionLayout>
					<UpdateTeamDropdown
						teamId={selectedSale?.teamId}
						collection="tokenSales"
						collectionItemId={activeId}
					></UpdateTeamDropdown>
				</SectionLayout>
			</div>*/}
			<div className="w-full">
				<SectionLayout>
					<UpdateDatesForm
						datesId={selectedSale?.datesId}
						collection="tokenSales"
						collectionItemId={activeId}
						disabled={selectedSale?.status == "locked"}
					></UpdateDatesForm>
				</SectionLayout>
			</div>
			<div className="w-full">
				<SectionLayout>
					<UpdateVestingForm
						vestingId={selectedSale?.vestingId}
						collection="tokenSales"
						collectionItemId={activeId}
						disabled={selectedSale?.status == "locked"}
					></UpdateVestingForm>
				</SectionLayout>
			</div>
		</div>
	);
}

export default SingleSaleContent;
