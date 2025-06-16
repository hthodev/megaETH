import { ethers } from "ethers";
import { dirname as __dirname } from "node:path";
import readline from "readline/promises";
import fs from "fs/promises";

// Network Configuration
const NETWORK_CONFIG = {
  name: "MEGA Testnet",
  chainId: 6342,
  networkId: 6342,
  rpcUrl: "https://carrot.megaeth.com/rpc",
  nativeToken: "ETH",
  decimals: 18,
  blockTime: 1000, // 1s for EVM blocks
  explorer: "https://megaexplorer.xyz",
};

// Contract Addresses
const CONTRACTS = {
  WETH: "0x776401b9bc8aae31a685731b7147d4445fd9fb19",
  cUSD: "0xe9b6e75c243b6100ffcb1c66e8f78f96feea727f",
  ROUTER: "0xa6b579684e943f7d00d616a48cf99b5147fc57a5",
};

// Router ABI (simplified for swapping)
const ROUTER_ABI = [
  "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
  "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
];

// ERC20 ABI (for approvals)
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
];

const provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);

async function swapTokensForETH(tokenAmount, address, privateKey) {
  try {
      const wallet = new ethers.Wallet(privateKey, provider);
  const router = new ethers.Contract(CONTRACTS.ROUTER, ROUTER_ABI, wallet);
  const cUSDContract = new ethers.Contract(CONTRACTS.cUSD, ERC20_ABI, wallet);
  const amountIn = ethers.parseUnits(tokenAmount.toString(), 18);
  const path = [CONTRACTS.cUSD, CONTRACTS.WETH];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

  console.log(`🔄 Swapping ${tokenAmount} cUSD for ETH...`);

  // Check and approve if necessary
  const allowance = await cUSDContract.allowance(address, CONTRACTS.ROUTER);
  if (allowance < amountIn) {
    console.log("🔑 Approving cUSD spending...");
    const approveTx = await cUSDContract.approve(
      CONTRACTS.ROUTER,
      ethers.MaxUint256,
      { gasLimit: 100000 }
    );
    await approveTx.wait();
    console.log("✅ Approval successful");
  }

  const tx = await router.swapExactTokensForETH(
    amountIn,
    0, // Accept any amount of ETH out
    path,
    address,
    deadline,
    { gasLimit: 500000 }
  );

  console.log(`📝 Transaction hash: ${tx.hash}`);
  console.log(`🔗 Explorer: ${NETWORK_CONFIG.explorer}/tx/${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`⛏️  Mined in block: ${receipt.blockNumber}`);
  } catch (error) {
    console.log(error);
    
  }
}

async function swapETHForTokens(ethAmount, address, privateKey) {
  try {
      const wallet = new ethers.Wallet(privateKey, provider);
  const router = new ethers.Contract(CONTRACTS.ROUTER, ROUTER_ABI, wallet);
  const amountIn = ethers.parseEther(ethAmount.toString());
  const path = [CONTRACTS.WETH, CONTRACTS.cUSD];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

  console.log(`🔄 Swapping ${ethAmount} ETH for cUSD...`);

  const tx = await router.swapExactETHForTokens(
    0, // Accept any amount of tokens out
    path,
    address,
    deadline,
    { value: amountIn, gasLimit: 500000 }
  );

  console.log(`📝 Transaction hash: ${tx.hash}`);
  console.log(`🔗 Explorer: ${NETWORK_CONFIG.explorer}/tx/${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`⛏️  Mined in block: ${receipt.blockNumber}`);
  } catch (error) {
    console.log(error);
    
  }
}

export async function SwapDapp(address, privateKey, chuKy, number) {
  console.log("Swap với Dapp");
  
  for (let i = 0; i < chuKy; i++) {
    try {
      console.log(`Đang swap cho ví ${address}`);
      await swapETHForTokens(number, address, privateKey);
      await swapTokensForETH(number, address, privateKey);
    } catch (error) {
      console.log("Đã xảy ra lỗi trong khi swap");
    }
  }
}