import { TitleXl } from "components/dashboard/Titles";

function MainDataSectionList({ title = "", values = [] }) {
	<div className="mb-8 bg-primary rounded-lg p-6 border border-fourth">
		{title && (
			<div className="mb-2">
				<TitleXl>{title} Data</TitleXl>
			</div>
		)}
		<ul className="flex flex-wrap justify-between">
			{values.length > 0 &&
				values.map((item) => (
					<li
						key={item.key.split(" ").join("_")}
						className="p-4 w-6/12 md:w-3/12"
					>
						<div className="text-third uppercase text-sm">{`${item.key}`}</div>
						<div>{item.value}</div>
					</li>
				))}
		</ul>
	</div>;
}

export default MainDataSectionList;
