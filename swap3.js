import { ethers } from "ethers";

const RPC_URL = "https://carrot.megaeth.com/rpc";
const ROUTER_ADDRESS = "0x3335733c454805df6a77f825f266e136fb4a3333";
const abiCoder = ethers.AbiCoder.defaultAbiCoder();

// ABI phù hợp với function selector `0xe1fcde8e`
const ABI = [
  {
    name: "swap",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "caller", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amountIn", type: "uint256" },
      { name: "input", type: "bytes" },
      { name: "output", type: "bytes" },
    ],
    outputs: [],
  },
];

async function swapETHForTokens(privateKey) {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(ROUTER_ADDRESS, ABI, wallet);
  const deadline = Math.floor(Date.now() / 1000) + 1800; // 30 phút sau

  const intermediary = "0xc063017b825091798e60e776be426c54c10cee0c"; // Contract trung gian
  const pool = "0x8d635c4702ba38b1f1735e8e784c7265dcc0b623";
  const amountIn = ethers.parseEther("0.011");
  const amountOut = ethers.parseUnits("25.400399", 6);
  const routeData =
    "0x4eb2bd7bee16f38b1f4a0a5796fffd028b6040e90000648d635c4702ba38b1f1735e8e784c7265dcc0b623";

  const inputBytes = abiCoder.encode(
    [
      "address", // router or intermediary
      "address", // input token or intermediary again
      "address", // output token
      "uint256", // amountOut
      "uint256", // deadline
      "uint256", // amountIn
      "bytes", // route data
    ],
    [intermediary, intermediary, pool, amountOut, deadline, amountIn, routeData]
  );
  const outputBytes = ethers.getBytes(
    "0x4eb2bd7bee16f38b1f4a0a5796fffd028b6040e90000648d635c4702ba38b1f1735e8e784c7265dcc0b623"
  );

  try {
    const tx = await contract.swap(
      wallet.address, // caller
      wallet.address, // recipient
      amountIn, // amountIn
      inputBytes,
      outputBytes,
      {
        value: amountIn, // gửi ETH cùng giao dịch
        gasLimit: 600000, // chỉnh theo yêu cầu
      }
    );

    console.log("⏳ Đã gửi giao dịch:", tx.hash);
    const receipt = await tx.wait();
    console.log("✅ Giao dịch thành công trong block", receipt);
  } catch (err) {
    console.error("❌ Lỗi khi swap:", err);
  }
}

