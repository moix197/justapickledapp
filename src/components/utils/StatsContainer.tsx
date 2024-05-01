import SectionLayout from "components/dashboard/SectionLayout";
import { TitleLg } from "components/dashboard/Titles";

function StatsContainer({ data = [], title = null }) {
	return (
		<div className="w-full md:w-auto">
			<SectionLayout>
				<div className="text-center mb-2 uppercase">
					{title && <TitleLg>{title}</TitleLg>}
				</div>
				<div className="flex flex-1 flex-col sm:flex-row md:flex-col flex-wrap justify-center text-secondary">
					{data &&
						data.map((item) => {
							return (
								<div className="stat border-b sm:border-r sm:border-b-0 sm:last:border-r-0 md:border-r-0 md:border-b  last:border-b-0 text-center last:pb-0 p-2 sm:w-4/12 md:w-auto">
									<div className="stat-title uppercase text-third text-xs">
										{item.title}
									</div>
									<div className="stat-value uppercase text-3xl">
										{item.value}
									</div>
									{item.desc && <div className="stat-desc"></div>}
								</div>
							);
						})}
				</div>
			</SectionLayout>
		</div>
	);
}

export default StatsContainer;
