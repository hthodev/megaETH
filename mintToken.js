import { ethers } from "ethers";
const RPC_URL = "https://carrot.megaeth.com/rpc";

const ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export async function mintTokenDappTeko(privateKey) {
  console.log("Swap với Dapp Teko");

  const contracts_address = [
    "0x176735870dc6c22b4ebfbf519de2ce758de78d94",
    "0xfaf334e157175ff676911adcf0964d7f54f2c424",
    "0xf82ff0799448630eb56ce747db840a2e02cde4d8",
    "0xe9b6e75c243b6100ffcb1c66e8f78f96feea727f",
  ];
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(privateKey, provider);

  for (const ca of contracts_address) {
    const contract = new ethers.Contract(ca, ABI, wallet);
    const tx = await contract.mint("0x1c7dE542C038e84A421D06601da1BBf19cf529e3", ethers.parseEther("0.00"));

    console.log("Minting... Tx hash:", tx.hash);
    await tx.wait();
    console.log("✅ Minted token successfully!");
  }
}