import fetch from "node-fetch"
import { HttpsProxyAgent } from 'https-proxy-agent';
import fs from 'fs/promises';
import chalk from 'chalk';
import readline from 'readline/promises';
import { TurnstileTask } from 'node-capmonster';
import { Solver } from "@2captcha/captcha-solver";
import bestcaptchasolver from 'bestcaptchasolver';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const pageurl = "https://testnet.megaeth.com/#1"
const sitekey = "0x4AAAAAABA4JXCaw9E2Py-9"
console.log("1. 2Captcha - 2. Capmonster - 3. CapResolve (khuyến khích vì nó rẻ nhất) - 4. Bestcaptchasolver");
const type = await rl.question("Nhập loại service giải captcha: ");
const apiKey = await rl.question("Nhập api key của bạn: ");

async function solverCaptcha() {
  if (type === "1") {
    console.log("Đang giải captcha bằng 2Captcha");
    const solver = new Solver(apiKey);
    const result = (await solver.cloudflareTurnstile({ pageurl, sitekey })).data;
    console.log("Đã giải xong captcha");
    return result;
  }
  if (type === "2") {
    console.log("Đang giải captcha bằng Capmonster");
    const capMonster = new TurnstileTask(apiKey);
    const task = capMonster.task({
        websiteKey: sitekey,
        websiteURL: pageurl
    });
    const taskId = await capMonster.createWithTask(task)
    const result = await capMonster.joinTaskResult(taskId)
    console.log("Đã giải xong captcha");
    return result.token
  }
  if (type === "3") {
    const Solver = (await import("capsolver-npm")).Solver;
    const solver = new Solver({
      apiKey,
    });
    try {
      const token = await solver.turnstileproxyless({
        websiteURL: pageurl,
        websiteKey: sitekey,
      });
      console.log("Đã giải xong captcha");
      return token.token
    } catch (error) {
      console.log("CapResolve Error: ", error.message);
    }
  }
  if (type === "4") {
    bestcaptchasolver.set_access_token(apiKey);
    try {
      const id = await bestcaptchasolver.submit_turnstile({
        page_url: pageurl,
        site_key: sitekey,
      })
      const token = await bestcaptchasolver.retrieve_captcha(id);
      console.log("Đã giải xong captcha");
      return token.solution
    } catch (error) {
      console.log("Bestcaptchasolver Error: ", error.message);
    }
  }
}

async function faucet(address, agent) {
  try {
    const url = "https://carrot.megaeth.com/claim"
    const token = await solverCaptcha()
    if (!token) return
    const body = JSON.stringify({
        addr: address,
        token,
    })
    const rq = await fetch(url, {
      method: "POST",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "content-type": "application/json",
        "accept": "application/json, text/plain, */*",
        "origin": "https://testnet.megaeth.com",
        "referer": "https://testnet.megaeth.com/"
      },
      agent,
      body
    })
    const res = await rq.json()
    console.log(res);
    return res
  } catch (error) {
   logger(`Faucet thất bại ${error.message}`, 'error');
   return;
  }
}

function logger(message, level = 'info') {
  const now = new Date().toISOString();
  const colors = {
      info: chalk.blue,
      warn: chalk.yellow,
      error: chalk.red,
      success: chalk.green,
      debug: chalk.magenta,
  };
  const color = colors[level] || chalk.white;
  console.log(color(`[${now}] [${level.toUpperCase()}]: ${message}`));
}

async function main() {
  const addressData = await fs.readFile('wallets.txt', 'utf-8');
  const addresses = addressData.trim().split('\n').map(o => o.trim());
  const proxyData = await fs.readFile('proxies.txt', 'utf-8');
  const proxies = proxyData.trim().split('\n').map(o => o.trim());

  for (let i = 0; i < addresses.length; i++) {
    const [address] = addresses[i].split('|');
    logger(`Đang faucet token megaETH cho địa chỉ thứ ${i + 1} ví ${address}`)
    const agent = new HttpsProxyAgent(proxies[i])
    faucet(address, agent)
    logger(`Faucet thành công`)
  }
}

main()