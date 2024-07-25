import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
);

// Add the recipient public key here.
const recipient = new PublicKey("7TWtg24wvoV8oBi4QhevnBYy6Yjw9c77qdeMuZiZPtZv");

// Subtitute in your token mint account
const tokenMintAccount = new PublicKey("8Ash1GCo74a52FpUJ7FcBcZ4iAPWo8PGmDni26K6X6nU");

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

console.log(`💸 Attempting to send 1 token to ${recipient.toBase58()}...`);

// Get or create the source and destination token accounts to store this token
const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    sender.publicKey
);


const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
);

// Transfer the tokens
const signature = await transfer(
    connection,
    sender,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    sender,
    1 * MINOR_UNITS_PER_MAJOR_UNITS
);

const explorerLink = getExplorerLink("transaction", signature, "devnet");

console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);