import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");

// Subtitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
    "8Ash1GCo74a52FpUJ7FcBcZ4iAPWo8PGmDni26K6X6nU"
);

// Substitute in your own, or a friend's token account address, based on the previous step.
const recipientAssociatedTokenAccount = new PublicKey(
    "9cqmSqc3GQq36go48xZ9S9Gx8JBDgN6UKxf7iapR412u"
);

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);