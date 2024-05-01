import ListSingleItem from "components/dashboard/ListSingleItem";
import { BasicButton } from "components/buttons/Basic";
import Link from "next/link";
import { TitleXl } from "./Titles";
import { PlusIcon } from "@heroicons/react/24/outline";
import TooltipHelp from "components/utils/TooltipHelp";

function ListSection({
	name = "",
	items = [],
	title = null,
	text = "you do not have any items",
	children = null,
	childrenFields = null,
	ctaUrl = null,
	childrenUrl = null,
	hideStatus = false,
	cb = null,
	childrenCtaTarget = null,
	childrenCtaText = null,
	toolTipContent = null,
}) {
	function prepareItemValue(item, value) {
		let newVal = item[value];

		if (value.split(".").length == 2) {
			let splittedVal = value.split(".");
			newVal = item[splittedVal[0]][splittedVal[1]];
		}

		return newVal;
	}

	return (
		<div>
			<div>
				{name && (
					<div>
						<TitleXl>{name}</TitleXl>
					</div>
				)}
				<div className="flex justify-end items-center mb-4">
					<div>
						{ctaUrl && (
							<Link href={`${ctaUrl}`}>
								<BasicButton className="bg-primary flex justify-center items-center">
									New {name}{" "}
								</BasicButton>
							</Link>
						)}
					</div>
					{toolTipContent && (
						<TooltipHelp
							className="ml-4"
							text={toolTipContent}
							type="button"
						></TooltipHelp>
					)}
					{children}
				</div>
			</div>
			{items?.length == 0 && <div>{text}</div>}
			{items?.length > 0 && (
				<div>
					{title && (
						<div className="mb-6">
							<div>{title}</div>
						</div>
					)}
					<div className="flex w-full bg-fourth  uppercase text-secondary font-bold hidden md:flex md:p-4 md:pl-6 md:pr-6">
						{childrenFields.values.map((item, index) => (
							<div
								key={`list_header_item_${index}`}
								className="grow flex flex-1 justify-center"
							>
								<div>{item.key}</div>
							</div>
						))}
						{!hideStatus && (
							<div className="grow flex flex-1 justify-center">
								<div>STATUS</div>
							</div>
						)}
						<div className="flexjustify-center md:w-20"></div>
					</div>
					<div className="flex flex-wrap gap-6 md:gap-0">
						{items.map((item, index) => (
							<ListSingleItem
								key={`list_item_${index}`}
								status={
									item[childrenFields.status]
										? item[childrenFields.status]
										: false
								}
								hideStatus={hideStatus}
								id={item[childrenFields.id] ? item[childrenFields.id] : false}
								values={childrenFields.values.map((cItem) => {
									return {
										key: cItem.key,
										value: prepareItemValue(item, cItem.value),
									};
								})}
								href={childrenUrl ? childrenUrl : false}
								cb={cb}
								item={item}
								childrenCtaTarget={childrenCtaTarget}
								childrenCtaText={childrenCtaText}
							></ListSingleItem>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default ListSection;
