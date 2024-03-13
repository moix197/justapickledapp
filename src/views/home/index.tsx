// Next, React
import { FC } from "react";
import Link from "next/link";

import { BasicButton } from "components/buttons/Basic";
import ValueMeter from "components/ValueMeter/ValueMeter";

export const HomeView: FC = ({}) => {
	return (
		<div className="min-h-[calc(100vh-69px)] mx-auto p-4 w-full flex justify-center items-center">
			<div className="max-w-full w-[400px] flex flex-col items-center">
				<ValueMeter></ValueMeter>
				<div className="text-center mb-6 uppercase tracking-wider">
					<div>
						Everyday there's less tokens left in the pool, don't miss the
						opportunity to get some extra{" "}
						<span className="text-third font-bold">$Pickle</span>
					</div>
				</div>
				<Link href="/swap">
					<BasicButton className="p-10">GO TO SWAP</BasicButton>
				</Link>
			</div>
		</div>
	);
};
