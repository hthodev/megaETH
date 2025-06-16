import fs from "fs/promises";
import readline from "readline/promises";
import { SwapDapp } from "./swap.js";
import { swapDappGTE } from "./swap2.js";
import { mintTokenDappTeko } from "./mintToken.js";

const walletStr = await fs.readFile("wallets.txt", "utf-8");
const wallets = walletStr
  .trim()
  .split("\n")
  .map((a) => a.trim());

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const swap = await rl.question("Bạn có muốn swap không? y/n ");
  const mintToken = await rl.question(
    "Bạn có muốn mintToken hằng ngày không? y/n "
  );

  let number;
  let chuKy;
  if (swap === "y") {
    number = await rl.question("Số lượng muốn swap: ");
    chuKy = await rl.question("Số lần swap cho mỗi chu kỳ trong 1 ngày: ");
  }
  rl.close();
  while (true) {
    for (let i = 0; i < wallets.length; i++) {
      const [address, privateKey] = wallets[i].split("|");
      console.log("Đang thực hiện ví", address);
      if (swap) {
        await SwapDapp(address, privateKey, Number(chuKy), number);
        await swapDappGTE(number, privateKey);
      }
      if (mintToken) {
        await mintTokenDappTeko(privateKey);
      }
    }
    console.log("Chờ 1 ngày để tiếp tục");

    await new Promise((resolve) => setTimeout(resolve, 24 * 60 * 60 * 1000));
  }
}

main().catch(console.error);
