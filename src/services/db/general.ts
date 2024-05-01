import { updateDocument } from "utils/back/db/crud";

async function updateQty(collection, collectionItemId, qtyToAdd) {
	let updateDoc = await updateDocument(
		`${collection === "sales" ? "tokenSales" : collection}Data`,
		{ _id: collectionItemId },
		false,
		{ $inc: { usersQty: qtyToAdd } }
	);

	return updateDoc;
}

function getValuesFromTransaction(
	tokenBalances,
	tokenToCheck,
	sourceAddress,
	destinationAddress
) {
	let results = { source: 0, destination: 0 };
	for (const item of tokenBalances) {
		if (item.mint == tokenToCheck && item.owner == sourceAddress) {
			results.source = item.uiTokenAmount.uiAmount;
		} else if (item.mint == tokenToCheck && item.owner == destinationAddress) {
			results.destination = item.uiTokenAmount.uiAmount;
		}
	}
	return results;
}

function checkTransactionAgainstVaultAndGetAmount({
	transactionData,
	tokenToCheck,
	sourceAddress,
	destinationAddress,
	isSwapTransaction,
}) {
	const preValues = getValuesFromTransaction(
		transactionData.meta.preTokenBalances,
		tokenToCheck,
		sourceAddress,
		destinationAddress
	);

	const postValues = getValuesFromTransaction(
		transactionData.meta.postTokenBalances,
		tokenToCheck,
		sourceAddress,
		destinationAddress
	);

	let sourceTransactionAmount = {
		pre: preValues.source,
		post: postValues.source,
		total: preValues.source - postValues.source,
	};
	let destinationTransactionAmount = {
		pre: preValues.destination,
		post: postValues.destination,
		total: preValues.destination
			? postValues.destination - preValues.destination
			: postValues.destination,
	};

	if (
		(sourceTransactionAmount.pre == 0 && sourceTransactionAmount.post == 0) ||
		(!isSwapTransaction && destinationTransactionAmount.post == 0) ||
		(!isSwapTransaction &&
			destinationTransactionAmount.total - sourceTransactionAmount.total > 0.1)
	) {
		console.log(
			`denied: The transaction is not related to this address ${destinationAddress}`
		);
		return {
			err: true,
			error: `The transaction is not related to this address ${destinationAddress}`,
		};
	}

	return {
		err: false,
		transactionAmount: sourceTransactionAmount.total,
	};
}

export { updateQty, checkTransactionAgainstVaultAndGetAmount };
