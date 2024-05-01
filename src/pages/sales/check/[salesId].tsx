import Layout from "components/sales/Layout";
import CheckIfParticipant from "components/sales/CheckIfParticipant";
import SectionLayout from "components/dashboard/SectionLayout";
import { useRouter } from "next/router";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function AllocationCheckPage() {
	const router = useRouter();
	const { salesId } = router.query;

	return (
		<div className="w-full h-full flex justify-center items-center mb-8">
			<div className="w-full md:w-8/12 ">
				<SectionLayout className="w-full mb-4">
					<CheckIfParticipant
						title="check allocation"
						itemId={salesId}
						collection={"sales"}
					></CheckIfParticipant>
				</SectionLayout>
				<div className="text-center">
					<Link href={`/sales/${salesId}`}>
						<div className="flex justify-center items-center text-secondary hover:text-third uppercase font-bold text-sm text-center cursor-pointer">
							<div>Go back to sale page</div>
							<div className="ml-2">
								<ArrowUturnLeftIcon className="w-6"></ArrowUturnLeftIcon>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

AllocationCheckPage.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default AllocationCheckPage;
