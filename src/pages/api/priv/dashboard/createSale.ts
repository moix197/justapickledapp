import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { insertDocument } from "utils/back/db/crud";
import { checkifVaultIsLocked } from "utils/dashboard/db/checkIfVaultIsLocked";
import { createDate } from "utils/dashboard/db/createDate";
import { createVesting } from "utils/dashboard/db/createVesting";
import { bulkValidate } from "utils/formSubmitValidation";
import { getSessionWalletAddress } from "utils/getSessionWalletAddress";

async function createSale(req) {
	try {
		const address = await getSessionWalletAddress(req);
		const { name, type, redeem, price, target, vesting, launch, end, vault } =
			req.body;

		let validationResponse = bulkValidate({
			name,
			type,
			redeem,
			price,
			target,
			vesting,
			launch,
			end,
			vault,
		});

		if (validationResponse.length > 0) {
			throw new Error(
				"Form didn't pass the validation, please check that the fields were filled correctly"
			);
		}

		let vestingResponse = await createVesting(vesting);
		if (vestingResponse.err) {
			throw new Error(vestingResponse.error);
		}

		let datesResponse = await createDate({
			launch: launch,
			end: end,
		});

		if (datesResponse.err) {
			throw new Error(datesResponse.error);
		}

		const linkedId = new ObjectId();

		let checkVaultLock = await checkifVaultIsLocked(vault, address);

		if (checkVaultLock.err) {
			throw new Error(checkVaultLock.error);
		}

		const data = {
			_id: linkedId,
			owner: address,
			name,
			status: "pre",
			isActive: false,
			usersQty: 0,
			type: type.value,
			redeem: redeem.value,
			price: {
				type: price.value,
				extra: !price.extra ? 0 : parseFloat(price.extra),
				amount: !price.amount ? 0 : parseFloat(price.amount),
			},
			target: target.value,
			tiers: [],
			vestingId: vestingResponse.result.id,
			datesId: datesResponse.result.id,
			vaultId: new ObjectId(vault),
			teamId: null,
		};

		let insertItem = await insertDocument("tokenSalesData", data);

		if (!insertItem.acknowledged) {
			throw new Error("We couldn't create the new token sale");
		}

		return {
			err: false,
			success: "New sale created successfully",
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
			allError: error,
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await createSale(req));
}
