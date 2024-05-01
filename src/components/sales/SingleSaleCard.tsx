import { BasicButton } from "components/buttons/Basic";
import SectionLayout from "components/dashboard/SectionLayout";
import { TitleLg } from "components/dashboard/Titles";
import Link from "next/link";

function SingleSaleCard({ items = [], name = "", id }) {
	return (
		<div>
			<SectionLayout>
				<div>
					<div className="mb-4">{name && <TitleLg>{name}</TitleLg>}</div>
					<div className="mb-4">
						{items &&
							items.map((item) => (
								<div className=" mb-2 flex justify-between">
									<div className="text-third uppercase">
										<div>{item.title}</div>
									</div>
									<div>
										<div>{item.value}</div>
									</div>
								</div>
							))}
					</div>
					<div>
						<Link href={`/sales/${id}`}>
							<BasicButton className="pt-2 pb-2">Check</BasicButton>
						</Link>
					</div>
				</div>
			</SectionLayout>
		</div>
	);
}

export default SingleSaleCard;
