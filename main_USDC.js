require('dotenv').config();
const { generateMnemonic, mnemonicToSeed } = require("bip39-light");
const { hdkey } = require('ethereumjs-wallet');
const { ethers } = require("ethers");
const { PRIVATE_KEY } = process.env;

// works for eth and polygon
const ethereumPath = "m/44'/60'/0'/0/0";

// Dummy ERC20 token address, get the address of the USDC contract and replace this.
const usdcAddress = "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1";

// the wallet where the contract was deployed
const usdcWalletAddress = "0x53dfd4581d64ef84f98236914014393b734be0ce";


const createWallet = (mnemonic) => {
    mnemonic = generateMnemonic(128);
    console.log("mnemonic:", mnemonic);
    const hdwallet = hdkey.fromMasterSeed(mnemonicToSeed(mnemonic));
    const wallet = hdwallet.derivePath(ethereumPath).getWallet();
    console.log("privateKey:", wallet.getPrivateKeyString());
    console.log("address:", wallet.getAddressString());
    return wallet;
};

const main = async () => {

    const receiverWallet = createWallet();

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    //const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    //await provider.send("eth_requestAccounts", []);

    // The provider also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...
    //const signer = provider.getSigner();

    // If you don't specify a //url//, Ethers connects to the default 
    // (i.e. ``http:/\/localhost:8545``)
    const provider = new ethers.providers.JsonRpcProvider({
        url: "https://rpc-mumbai.maticvigil.com"
     });
    
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);

    const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, provider);

    balance = await usdcContract.balanceOf(usdcWalletAddress);

    console.log("USDC wallet balance:" + balance);

    const usdcContractWriter = usdcContract.connect(signer);

    const amountToTransfer = 1;

    const tx = await usdcContractWriter.transfer(receiverWallet.getAddressString(), amountToTransfer);
    
    console.log("tx:", tx.hash);

    // check the balance of the receiver wallet
    // setTimeout(async () => {
    //     balance = await usdcContract.balanceOf(receiverWallet.getAddressString(), 0);
    //     console.log("Receiver wallet balance:" + balance);
    // }, 5000);
    
}

const usdcAbi = [
    "function balanceOf(address account) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool success)"
];

main()
    .catch((error) => {
    console.error(error)
    process.exit(1)
});
  