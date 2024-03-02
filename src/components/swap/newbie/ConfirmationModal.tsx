import { BasicButton } from "components/buttons/Basic";
import { useEffect, useState } from "react";

const ConfirmationModal = ({
	children = null,
	title = "",
	btnText = "",
	modalStatus = false,
	isSafe = true,
	hideCloseBtn = false,
	setModalStatus = (argument) => {},
	clickEvent = () => {},
}) => {
	return (
		<div
			className={`fixed top-0 left-0 w-full h-screen z-10 flex justify-center items-center ${
				modalStatus ? "block" : "hidden"
			}`}
		>
			<div className="absolute top-0 left-0 w-full h-screen bg-primary opacity-80"></div>
			<div className="relative w-11/12 md:w-10/12 md:max-w-lg">
				<div
					className={`hover:shadow-third flex justify-center items-center cursor-pointer bg-red-800 border 
					border-primary rounded-full absolute top-1 right-1 w-10 h-10 z-20 ${
						hideCloseBtn && "hidden"
					}`}
					onClick={() => {
						setModalStatus(false);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18 18 6M6 6l12 12"
						/>
					</svg>
				</div>
				<div className="w-full p-8 bg-primary border border-fourth rounded-lg z-10 text-secondary">
					{title && (
						<div>
							<h5>{title}</h5>
						</div>
					)}
					<div>{children && children}</div>
					<div className="flex justify-center">
						<div>
							{btnText && (
								<div
									onClick={() => {
										clickEvent();
										setModalStatus(false);
									}}
								>
									<BasicButton
										className="bg-primary p-10 border-error"
										error={!isSafe}
									>
										{btnText}
									</BasicButton>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
