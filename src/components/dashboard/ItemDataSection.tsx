import SectionLayout from "./SectionLayout";
import { TitleLg } from "./Titles";

function ItemDataSection({ name, items }) {
	return (
		<SectionLayout>
			<div className="mb-2">
				<TitleLg>{name} Data</TitleLg>
			</div>
			<ul className="flex flex-wrap justify-sstart">
				{items.map((item) => (
					<li
						key={item.key.split(" ").join("_")}
						className="p-2 sm:p-4 w-full sm:w-6/12 md:w-4/12 lg:w-3/12"
					>
						<div className="text-third uppercase text-sm">{`${item.key}`}</div>
						<div>{item.value}</div>
					</li>
				))}
			</ul>
		</SectionLayout>
	);
}

export default ItemDataSection;
