// This uses "@metaplex-foundation/mpl-token-metadata@2" to create tokens
import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink,
} from "@solana-developers/helpers";
import {
    Connection,
    clusterApiUrl,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const user = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
    `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

// Subtitute in your token mint account -- EYFuC4h6JF1zHKrywzdat4YwsrEkQo9osLDQ4u3EwL3N

const tokenMintAccount = new PublicKey("8Ash1GCo74a52FpUJ7FcBcZ4iAPWo8PGmDni26K6X6nU");
//  E9411KyLn7hwX2XvPZVaTV8RaVCNDFd18dEnuRCH7Fnu

const metadataData = {
    name: "Nika SolanaTT5",
    symbol: "NikaT5",
    // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
    uri: "https://arweave.net/gpEf2lGQlFc7gv5DpHzxDSTUXJdGAJIN7tqnha-E-vE",
    //"https://bafybeidfm65jzvz4zeesxp6ybinkitvpd27klk6yspstrtw5fuy5w27lkq.ipfs.w3s.link/metadata.json",
    //"https://arweave.net/LIzuZng2eQSkc2psPpoX646lVARGOmc-9kEARXhypKA"
    //"https://arweave.net/1234"
    //"https://arweave.net/Vr9tRQ3IBTa32gDJDFDKLCbmE3x1_5CQpNTxXF7ABeg/gallery#b5604114-61c0-43a8-97f0-f77732dfaa46"
    //https://v2.akord.com/public/vaults/active/Vr9tRQ3IBTa32gDJDFDKLCbmE3x1_5CQpNTxXF7ABeg/gallery#b5604114-61c0-43a8-97f0-f77732dfaa46
    //https://v2.akord.com/public/vaults/active/Vr9tRQ3IBTa32gDJDFDKLCbmE3x1_5CQpNTxXF7ABeg/gallery#777ae329-5321-4de3-9df1-2f570627b563",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
};

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
);

const metadataPDA = metadataPDAAndBump[0];

const transaction = new Transaction();

const createMetadataAccountInstruction =
    createCreateMetadataAccountV3Instruction(
        {
            metadata: metadataPDA,
            mint: tokenMintAccount,
            mintAuthority: user.publicKey,
            payer: user.publicKey,
            updateAuthority: user.publicKey,
        },
        {
            createMetadataAccountArgsV3: {
                collectionDetails: null,
                data: metadataData,
                isMutable: true,
            },
        }
    );

transaction.add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user]
);

const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet"
);

console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);

const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);