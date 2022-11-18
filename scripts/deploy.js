
async function main() {

    const contractFactory = await ethers.getContractFactory("UBQFitCoin")
  
    // Start deployment, returning a promise that resolves to a contract object
    const contract = await contractFactory.deploy()
    await contract.deployed()
    const txHash = contract.deployTransaction.hash
    const txReceipt = await ethers.provider.waitForTransaction(txHash)
    const contractAddress = txReceipt.contractAddress
    console.log("Contract deployed to address:", contractAddress)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  