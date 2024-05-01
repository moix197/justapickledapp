import { BasicButton } from "components/buttons/Basic";
import ContractAddress from "components/utils/ContractAddress";
import Link from "next/link";

function ListSingleItem({
	status = false,
	id = false,
	values,
	href = null,
	hideStatus,
	cb = null,
	item,
	childrenCtaTarget = null,
	childrenCtaText = null,
}) {
	return (
		<div className="w-full sm:w-6/12 md:w-full flex flex-col items-start content-between md:flex-row md:justify-between md:items-center  p-6 md:p-3 md:pl-6 md:pr-6 border border-gray-900 md:border-0 md:border-b rounded-lg md:rounded-none bg-primary text-secondary">
			{values.length > 0 &&
				values.map((item, index) => (
					<div
						key={`item_${item.key}_${index}`}
						className="w-full flex-1 grow md:w-auto flex justify-between md:justify-center items-center md:flex-col mb-3 md:mb-0"
					>
						<div className="md:hidden mr-2 md:mr-0 md:mb-4 uppercase text-yellow-600 text-sm">
							<div>{item.key}</div>
						</div>
						<div className="capitalize">
							<div>
								{item.key == "address" || item.key == "txid" ? (
									<ContractAddress ca={item.value} text=" "></ContractAddress>
								) : (
									item.value
								)}
							</div>
						</div>
					</div>
				))}

			{!hideStatus && (
				<div className="w-full grow flex-1 md:w-auto flex justify-between md:justify-center items-center md:flex-col">
					<div className="md:hidden mr-2 md:mr-0 md:mb-5 uppercase text-yellow-600 text-sm">
						<div>Status</div>
					</div>
					<div className="flex justify-center">
						{status ? (
							<span className="w-6 h-6 rounded-full bg-green-400 block animate-pulse"></span>
						) : (
							<span className="w-6 h-6 rounded-full bg-red-600 block animate-pulse"></span>
						)}
					</div>
				</div>
			)}
			{href && (
				<div
					className="w-full md:w-20"
					onClick={() => {
						cb && cb(item);
					}}
				>
					<Link
						href={`${href}${id ? "/" + id : ""}`}
						target={childrenCtaTarget ? childrenCtaTarget : ""}
					>
						<BasicButton className="bg-primary text-xs md:pt-2 md:pb-2 mt-4 md:mt-0 !pl-2 !pr-2">
							{childrenCtaText ? childrenCtaText : "Manage"}
						</BasicButton>
					</Link>
				</div>
			)}
		</div>
	);
}
export default ListSingleItem;
