import { findDocuments, updateDocument } from "../back/db/crud";

async function failedAirdropTransaction(address){
    let userData = await findDocuments("twitter_airdrop", {
        wallet: address,
    });

    let lastTransactionsItem =
        userData[0].transactions[userData[0].transactions.length - 1];

    if(lastTransactionsItem.status !== "pending"){
        return;
    }

    let updated = await updateDocument(
        "twitter_airdrop",
        {
            wallet: address,
        },
        {
            transactions:
                lastTransactionsItem.status == "pending"
                    ? userData[0].transactions.slice(0, -1)
                    : userData[0].transactions,
            rewards: {
                sending: 0,
                available:
                    userData[0].rewards.available + userData[0].rewards.sending,
                locked: userData[0].rewards.locked,
                claimed: userData[0].rewards.claimed,
            },
        }
    );
}

export { failedAirdropTransaction };