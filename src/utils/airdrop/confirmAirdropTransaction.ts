import { findDocuments, updateDocument } from "../back/db/crud";
import { connection } from "utils/back/connection";
import { failedAirdropTransaction } from "./failedAirdropTransaction";

async function confirmAirdropTransaction(signature ,address){
   try {
    let conn = await connection.confirmTransaction(
        signature,
        "processed"
    );

    if (conn?.value?.err) {
		await failedAirdropTransaction(address);
        return {
            err: true,
            error: "couldn't confirm the transaction, please try again",
        };
    }


    let airdropUserData = await findDocuments("twitter_airdrop", {
        wallet: address,
    });

    let updatedRewards = {
        available: airdropUserData[0].rewards.available,
        sending: 0,
        claimed:
            airdropUserData[0].rewards.claimed + airdropUserData[0].rewards.sending,
        locked: airdropUserData[0].rewards.locked,
    };

    let updatedResult = updateDocument(
        "twitter_airdrop",
        { _id: airdropUserData[0]._id },
        { 
            rewards: updatedRewards,
            transactions: [...airdropUserData[0].transactions.slice(0,-1), 
                { tx: "", status: "done", result: "accepted", launchTime: airdropUserData[0].transactions[airdropUserData[0].transactions.length-1].launchTime }
            ] 
        }
    );

        return {
            err: false,
            result: conn
        };
   } catch (error) {
        await failedAirdropTransaction(address);
        return {
            err:true,
            error: "We couldn't confirm the transaction",
            txid: error?.signature
        }
   }
}

export { confirmAirdropTransaction };