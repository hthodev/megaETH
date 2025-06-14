import { ethers } from "ethers";

const RPC_URL = "https://carrot.megaeth.com/rpc";
const provider = new ethers.JsonRpcProvider(RPC_URL);
const ROUTER_ADDRESS = "0xa6b579684e943f7d00d616a48cf99b5147fc57a5";

const amountOutMin = BigInt("43075991243938");
const path = [
  "0x776401b9BC8aAe31A685731B7147D4445fD9FB19",
  "0xE9b6e75C243B6100ffcb1c66e8f78F96FeeA727F",
];
const to = "0x1c7dE542C038e84A421D06601da1BBf19cf529e3";
const deadline = 1748800162796;

async function swapETHForTokens(ethAmountIn, wallet) {
  ethAmountIn = ethers.parseEther(ethAmountIn.toString());
  console.log("Đang swap ETH sang USD");

  const ROUTER_ABI_ETH_TO_TOKENS = [
    {
      inputs: [
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        { internalType: "address[]", name: "path", type: "address[]" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
      ],
      name: "swapExactETHForTokens",
      outputs: [
        { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      ],
      stateMutability: "payable",
      type: "function",
    },
  ];
  const router = new ethers.Contract(
    ROUTER_ADDRESS,
    ROUTER_ABI_ETH_TO_TOKENS,
    wallet
  );

  const tx = await router.swapExactETHForTokens(
    amountOutMin,
    path,
    to,
    deadline,
    {
      value: ethAmountIn,
      gasLimit: 300000,
    }
  );

  console.log("⏳ Gửi giao dịch:", tx.hash);
  const receipt = await tx.wait();
  console.log("✅ Thành công! Giao dịch đã xác nhận:", receipt.hash);
}

async function swapTokensForETH(wallet) {
  console.log("Đang swap tất cả USD sang ETH");

  const ABI_TOKEN_TO_ETH = [
    {
      name: "swapExactTokensForETH",
      type: "function",
      stateMutability: "nonpayable",
      inputs: [
        {
          name: "amountIn",
          type: "uint256",
        },
        {
          name: "amountOutMin",
          type: "uint256",
        },
        {
          name: "path",
          type: "address[]",
        },
        {
          name: "to",
          type: "address",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
      outputs: [
        {
          name: "amounts",
          type: "uint256[]",
        },
      ],
    },
  ];
  const usdToken = new ethers.Contract(
    "0xE9b6e75C243B6100ffcb1c66e8f78F96FeeA727F",
    [
      "function balanceOf(address owner) view returns (uint256)",
      "function approve(address spender, uint256 amount) public returns (bool)",
    ],
    wallet
  );
  const routerAddress = "0xa6b579684e943f7d00d616a48cf99b5147fc57a5";
  const router = new ethers.Contract(routerAddress, ABI_TOKEN_TO_ETH, wallet);

  const balance = await usdToken.balanceOf(wallet.address);
  if (balance === 0n) {
    console.log("❌ Ví không có USD token để swap.");
    return;
  }

  const amountIn = balance;
  const amountOutMin = 0n;
  const path = [
    "0xE9b6e75C243B6100ffcb1c66e8f78F96FeeA727F",
    "0x776401b9BC8aAe31A685731B7147D4445fD9FB19",
  ];
  const to = wallet.address;
  const deadline = BigInt("1748801344561");

  // Approve USD token
  const approveTx = await usdToken.approve(routerAddress, amountIn);
  await approveTx.wait();

  // Gửi transaction swap
  const tx = await router.swapExactTokensForETH(
    amountIn,
    amountOutMin,
    path,
    to,
    deadline,
    { gasLimit: 300000 }
  );

  console.log("Swap tx hash:", tx.hash);
  await tx.wait();
  console.log("✅ Swap completed!");
}

export async function swapDappGTE(ethAmountIn, PRIVATE_KEY, chuKy) {
  console.log("Swap với Dapp GTE");
  for (let i = 0; i < chuKy; i++) {
    try {
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      await swapETHForTokens(ethAmountIn, wallet);
      await swapTokensForETH(wallet);
    } catch (error) {
      console.error("❌ Lỗi khi swap:", error);
    }
  }
}
