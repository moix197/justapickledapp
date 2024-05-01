import { useState } from "react";
import { BasicButton } from "components/buttons/Basic";
import { postCall } from "services/apiSkeletons/calls";
import { notify } from "utils/notifications";
import ConfirmationModal from "components/swap/newbie/ConfirmationModal";
import { TitleLg } from "./Titles";
import SliderBtn from "components/buttons/SliderBtn";

function LockBtn({ children, collection = null, itemId, reload }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	async function lockItem() {
		const response = await postCall("/api/priv/dashboard/lockItem", {
			collection: collection,
			id: itemId,
		});

		if (!response?.err) {
			reload(true);
		} else {
			setIsLoading(false);
		}

		notify({
			type: response?.err ? "error" : "success",
			message: response?.err ? "Error" : "success",
			description: response?.err ? response.error : "Item has been locked",
		});
	}

	return (
		<div>
			<ConfirmationModal
				modalStatus={isOpen}
				setModalStatus={setIsOpen}
				btnText={"confirm lock"}
				isSafe={false}
				clickEventOnClose={() => {
					setIsLoading(false);
				}}
				clickEvent={() => {
					lockItem();
				}}
			>
				<TitleLg>confirm sale lock</TitleLg>
				<div className="pb-8 pt-8">
					<div className="mb-4">
						<div className="mb-2">
							<div>Are you sure that you want to lock this sale?</div>
							<div>
								You won't be able to change any of the sale or linked vault
								values after locking
							</div>
						</div>
						<div>You'll be able to manage the users as usual</div>
					</div>
					<div className="text-red-400">
						<div>
							This action cannot be undone, make sure that all your sale values
							are ok before proceeding
						</div>
					</div>
				</div>
				{/*<div>
					<SliderBtn></SliderBtn>
	</div>*/}
			</ConfirmationModal>
			<div
				onClick={() => {
					if (isLoading) return;
					setIsLoading(true);
					setIsOpen(true);
				}}
			>
				<BasicButton className="bg-primary" isLoading={isLoading}>
					{children}
				</BasicButton>
			</div>
		</div>
	);
}

export default LockBtn;
