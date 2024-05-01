import { postCall } from "services/apiSkeletons/calls";
import { notify } from "utils/notifications";

async function updateCollection(
	item,
	collection,
	collectionItemId,
	collectionToUpdate = null
) {
	let result = await postCall("/api/priv/dashboard/updateCollection", {
		collection: collection,
		itemId: collectionItemId,
		collectionToUpdate: collectionToUpdate,
		newValues: {
			...item,
		},
	});

	notify({
		type: result.err ? "error" : "success",
		message: result.err ? "error" : "success",
		description: result.err ? result.error : result.success,
	});

	return result;
}

export { updateCollection };
