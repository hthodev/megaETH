import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://carrot.megaeth.com/rpc");
const wallet = new ethers.Wallet(
  "privateKey",
  provider
);

const addresses = [
"0x1c7dE542C038e84A421D06601da1BBf19cf529e3",
"0xaf4E085DF9148142B7e723C22f5BDe1e597BF0B6",
/.../
];

const amountToSend = ethers.parseEther("0.03");

async function sendETH() {
  for (const address of addresses) {
    try {
      const tx = await wallet.sendTransaction({
        to: address,
        value: amountToSend,
      });

      console.log(`✅ Gửi thành công đến ${address} | TX: ${tx.hash}`);
      await tx.wait();
    } catch (error) {
      console.error(`❌ Lỗi khi gửi đến ${address}:`, error);
    }
  }
}

sendETH();
