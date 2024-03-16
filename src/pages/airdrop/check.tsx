"use client";
import type { NextPage } from "next";

import { WalletDataContainer } from "contexts/WalletDataContextProvider";
import { useState } from "react";
import { BasicButton } from "components/buttons/Basic";
import Link from "next/link";

const SwapIndex: NextPage = (props) => {
	const [key, setKey] = useState("");
	const [wasAllocationChecked, setWasAllocationChecked] = useState(false);
	const [finalAllocation, setFinalAllocation] = useState({
		isElegible: false,
		allocation: "0",
	});

	async function checkAllocation() {
		if (key == "") return;

		let url = `/api/checkAllocation?address=${key}`;
		let response = await fetch(url);
		let data = await response.json();

		setFinalAllocation(data);
		setWasAllocationChecked(true);
	}

	function showContent() {
		return finalAllocation.isElegible == false ? esto[0] : esto[1];
	}

	let esto = [
		<div>
			<div className="text-red-400 text-lg uppercase font-bold">
				<div>Sorry, you do not have a $pickle allocation</div>
			</div>
			<div>
				make sure that you
				{` `}
				<Link
					className="text-third hover:opacity-50"
					href="https://twitter.com/_justapickle"
					target="_blank"
				>
					follow us on X
				</Link>{" "}
				and{" "}
				<Link
					className="text-third hover:opacity-50"
					href="https://twitter.com/_justapickle"
					target="_blank"
				>
					are part of our discord
				</Link>{" "}
				to be up to date for future airdrops
			</div>
		</div>,
		<div>
			<div className="mb-4">
				<div className="text-third text-lg uppercase font-bold">
					<div>Congratulations, you've secured a $pickle allocation</div>
				</div>
				<div>
					{`You've been asigned an allocation of ${finalAllocation.allocation} $Pickle`}
				</div>
			</div>
			<div>
				make sure that you
				{` `}
				<Link
					className="text-third hover:opacity-50"
					href="https://twitter.com/_justapickle"
					target="_blank"
				>
					follow us on X
				</Link>{" "}
				and{" "}
				<Link
					className="text-third hover:opacity-50"
					href="https://twitter.com/_justapickle"
					target="_blank"
				>
					are part of our discord
				</Link>{" "}
				to be up to date about the claiming dates
			</div>
		</div>,
	];

	return (
		<WalletDataContainer>
			<div className="min-h-[calc(100vh-69px)] bg-fade bg-no-repeat bg-cover bg-center flex justify-center items-center max-w-90 pl-2 pr-2 md:pl-10 md:pr-10">
				<div className="w-[800px] text-center">
					<div className="mb-6 uppercase">
						<div className="text-2xl text-yellow-600 font-bold">
							<div>Checkout your $Pickle allocation</div>
						</div>
						<div>
							<div>paste your wallet address into the input below</div>
						</div>
					</div>
					<div className="mb-6">
						<label className="input input-bordered flex items-center gap-2">
							<input
								type="text"
								onChange={(e) => {
									setKey(e.target.value);
								}}
								className="grow"
								placeholder="Check"
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								className="w-4 h-4 opacity-70"
							>
								<path
									fill-rule="evenodd"
									d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
									clip-rule="evenodd"
								/>
							</svg>
						</label>
					</div>
					<div className="mb-6">{wasAllocationChecked && showContent()}</div>
					<div
						onClick={() => {
							checkAllocation();
						}}
					>
						<BasicButton className="bg-primary">
							{!wasAllocationChecked
								? "Check my allocation"
								: "Check allocation for a different wallet"}
						</BasicButton>
					</div>
				</div>
			</div>
		</WalletDataContainer>
	);
};

export default SwapIndex;
