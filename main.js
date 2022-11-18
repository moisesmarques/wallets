import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed } from "bip39-light";
import { derivePath } from "ed25519-hd-key";
//import * as bs58 from "bs58";

// works for eth and polygon
const ethereumPath = "m/44'/60'/0'/0/0";

export const createWallet = (mnemonic) => {
    const mnemonic = generateMnemonic();
    console.log("mnemonic", mnemonic);
    const seed = mnemonicToSeed(mnemonic);
    console.log('seed', seed);
    const { key } = derivePath(ethereumPath, seed.toString('hex'));
    return Keypair.fromSeed(key)
};
