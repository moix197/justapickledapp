import { useContext } from "react";
import { LayoutContext } from "contexts/LayoutContextProvider";

function SelectionScreen({ clickEvent = null }) {
	const [screenToShow, setScreenToShow] = useContext(LayoutContext);

	return (
		<div className="min-h-[calc(100vh-96px)] w-full flex justify-center items-center">
			<div className="max-w-[800px] w-full flex flex-col items-center justify-center pt-10 pb-10">
				<div className="mb-8 text-lg uppercase text-yellow-600 font-bold">
					<div>Select your custom layout</div>
				</div>
				<div className="flex flex-col sm:flex-row w-full mb-4 justify-center items-center sm:items-stretch">
					<div
						className="w-11/12 sm:w-6/12 grow border border-fourth m-4 p-4 cursor-pointer transition-transform hover:scale-105"
						onClick={() => {
							clickEvent("simple");
							setScreenToShow("simple");
						}}
					>
						<div className="mb-2 text-lg text-third">
							<div>SIMPLE SWAP</div>
						</div>
						<div>
							<div>
								A layout fit for people new to web 3, we will guide you trough
								the whole proccess of exchanging your tokens while providing all
								the needed information so that your operation is fast and safe.
							</div>
						</div>
					</div>
					<div
						className="w-11/12 sm:w-6/12 grow border border-fourth m-4 p-4 cursor-pointer transition-transform hover:scale-105"
						onClick={() => {
							clickEvent("classic");
							setScreenToShow("classic");
						}}
					>
						<div className="mb-2 text-third">
							<div>FULL SWAP</div>
						</div>
						<div>
							<div>
								The common layout you can find in almost any dex but of course
								we have added our own twist in order to make your operations
								fast and clean.
							</div>
						</div>
					</div>
				</div>
				<div className="w-full flex justify-center">
					<div className="text-sm uppercase text-yellow-600 text-center w-[90%]">
						you can always change the layout mode by pressing the switch on the
						top bar
					</div>
				</div>
			</div>
		</div>
	);
}

export default SelectionScreen;
