
//npm i @solana/web3.js @solana/spl-token @solana-developers/helpers esrun
//npm i @metaplex-foundation/mpl-token-metadata@2

//Instructions:
//npm init -y
//npm install
//npm install @solana/web3.js
//npm install dotnev --save  --?
//npm install @solana-developers/helpers

//Running code
//npx esrun transfer.ts (destination wallet address)
//npx esrun create-token-mint.ts 


import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

// This is a shortcut that runs:
// SystemProgram.createAccount
// token.createInitializeMintInstruction
// See https://www.soldev.app/course/token-program
const tokenMint = await createMint(connection, user, user.publicKey, null, 2);
/*
createMint(connection, payer, mintAuthority, freezeAuthority, decimals, keypair?, confirmOptions?, programId?): Promise<PublicKey>
*/


const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✅ Finished! Created token mint: ${link}`);

//Run: npx esrun create-token-mint.ts