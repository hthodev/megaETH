import { ethers } from "ethers";
import fs from "fs/promises";
import readline from "readline/promises";
const RPC_URL = "https://carrot.megaeth.com/rpc";

const walletStr = await fs.readFile("wallets.txt", "utf-8");
const wallets = walletStr
  .trim()
  .split("\n")
  .map((a) => a.trim());

const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_currency",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_pricePerToken",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "bytes32[]",
            name: "proof",
            type: "bytes32[]",
          },
          {
            internalType: "uint256",
            name: "quantityLimitPerWallet",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pricePerToken",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
        ],
        internalType: "struct IClaimCondition.AllowlistProof",
        name: "_allowlistProof",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const ABI_1 = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const CONTRACT_ADDRESSES = [];
  console.log(
    `Bạn muốn mint NFT nào?
    Có 388 NFT có sẵn. VD: Bạn muốn mint NFT 3 6 9 NFT thì gõ
    3 6 9`
  );
  const choose = await rl.question("");
  const arrChoose = choose.split(" ");

  arrChoose.forEach((arr) => {
    switch (arr.toString()) {
      case "1":
        CONTRACT_ADDRESSES.push({
          contract: "0xb9bbfc6030b4d3876b90c0f76e8559a020ed4246",
          price: "0.001",
        });
        break;
      case "2":
        CONTRACT_ADDRESSES.push({
          contract: "0x88bad6f1f4e32e270ac879452bcad9e3f11aeb1e",
          price: "0.0007",
        });
        break;
      case "3":
        CONTRACT_ADDRESSES.push({
          contract: "0xd7637c422233db03b379bdc68374d8bf40731b6a",
          price: "0.001",
        });
        break;
      case "4":
        CONTRACT_ADDRESSES.push({
          contract: "0x6e35194aaa456f6ca840f95ee5ef101c9f491d5c",
          price: "0.000",
        });
        break;
      case "5":
        CONTRACT_ADDRESSES.push({
          contract: "0xb8027dca96746f073896c45f65b720f9bd2afee7",
          price: "0.000",
        });
        break;

      case "6":
        CONTRACT_ADDRESSES.push({
          contract: "0xff3ec2a81a7a3a5c870a58749cd1a1cb4a193170",
          price: "0.0001",
        });
        break;
      case "7":
        CONTRACT_ADDRESSES.push({
          contract: "0xd7f4dbcf002dbf44018f1d297b2ecb49bc5ed24c",
          price: "0.0001",
        });
        break;
      case "8":
        CONTRACT_ADDRESSES.push({
          contract: "0x17c5A7F79a9758740b833F5eb6cb762A198e6BFC",
          price: "0.095",
        });
        break;
      case "9":
        CONTRACT_ADDRESSES.push({
          contract: "0x41114c72181a064f1D0290DcbC15B649d64c4b15",
          price: "0.00001",
        });
        break;
      case "10":
        CONTRACT_ADDRESSES.push({
          contract: "0xe60DD42F436ed2E6300c9E85A8bc4B710E842F0a",
          price: "0.0001",
        });
        break;
      case "11":
        CONTRACT_ADDRESSES.push({
          contract: "0x1865f4AA9710e0E6fA2f2fecA4C932F829802989",
          price: "0.00001",
        });
        break;
      case "12":
        CONTRACT_ADDRESSES.push({
          contract: "0xb1B7170920c057f3FbA6F62395A81456fb779ab1",
          price: "0.0003",
        });
        break;
      case "13":
        CONTRACT_ADDRESSES.push({
          contract: "0xa9Db0123761c2bd0182fb4f49028fdC74b4e4102",
          price: "0.01",
        });
        break;
      case "14":
        CONTRACT_ADDRESSES.push({
          contract: "0xEf04Fb11D9f94d9bdc61Bba15ea5d61Fb0FAbE35",
          price: "0.0001",
        });
        break;
      case "15":
        CONTRACT_ADDRESSES.push({
          contract: "0xcb103122B634C7cf6Cfa082eded0092EC040258a",
          price: "0.00005",
        });
        break;
      case "16":
        CONTRACT_ADDRESSES.push({
          contract: "0xD31fC8B3af1EdF783f9d7f5882E41D7075D19A9D",
          price: "0.0001",
        });
        break;
      case "17":
        CONTRACT_ADDRESSES.push({
          contract: "0x32F8338B6d6E31804a8C91302EA559817ec80ba1",
          price: "0.0005 ",
        });
        break;
      case "18":
        CONTRACT_ADDRESSES.push({
          contract: "0x072E6616b3b9901880d50a50B8F2d068f42326fD",
          price: "0.0005",
        });
        break;
      case "19":
        CONTRACT_ADDRESSES.push({
          contract: "0x262539aD90f77d0156a221538a24431849B17F7E",
          price: "0.00001",
        });
        break;
      case "20":
        CONTRACT_ADDRESSES.push({
          contract: "0x32F8338B6d6E31804a8C91302EA559817ec80ba1",
          price: "0.0005",
        });
        break;
      case "21":
        CONTRACT_ADDRESSES.push({
          contract: "0x072E6616b3b9901880d50a50B8F2d068f42326fD",
          price: "0.0005",
        });
        break;
      case "22":
        CONTRACT_ADDRESSES.push({
          contract: "0x262539aD90f77d0156a221538a24431849B17F7E",
          price: "0.00001",
        });
        break;

      case "23":
        CONTRACT_ADDRESSES.push({
          contract: "0x2237F26199743b9fFaDAcbE7F07ea8Fbb5a8570a",
          price: "0.0001",
        });
        break;
      case "24":
        CONTRACT_ADDRESSES.push({
          contract: "0x9dE92b83e10cCf79810A6004807DF3E1d15d0A6D",
          price: "0.001",
        });
        break;
      case "25":
        CONTRACT_ADDRESSES.push({
          contract: "0xB7DC2a1953ea7Ea8E47f471915FC4176286144b1",
          price: "0.004",
        });
        break;
      case "26":
        CONTRACT_ADDRESSES.push({
          contract: "0xC7Aec987BEcb17ea06308756d31b28d4000e17B9",
          price: "0.002",
        });
        break;
      case "27":
        CONTRACT_ADDRESSES.push({
          contract: "0x4482b9C34cA72e5Ab81362aC8eFc764A31918099",
          price: "0.001",
        });
        break;
      case "28":
        CONTRACT_ADDRESSES.push({
          contract: "0xf3F8a0154B9E061BA67FFf6061736b02174D09F4",
          price: "0.001",
        });
        break;
      case "29":
        CONTRACT_ADDRESSES.push({
          contract: "0x0b8Ff522cFfEd3046e19ecb42E669990567B05c3",
          price: "0.000005",
        });
        break;
      case "30":
        CONTRACT_ADDRESSES.push({
          contract: "0x64B60Db9978229C6c74F7236102ec707A9a18906",
          price: "0.0000051 ",
        });
        break;
      case "31":
        CONTRACT_ADDRESSES.push({
          contract: "0xC01FE853Cb243bfCC4FA7f63D622e95e276d7310",
          price: "0.00075",
        });
        break;
      case "32":
        CONTRACT_ADDRESSES.push({
          contract: "0x899E342576dc30FA5C82Fe39073c6c9512599bc4",
          price: "0.00000548",
        });
        break;
      case "33":
        CONTRACT_ADDRESSES.push({
          contract: "0xb7dE31E812d5760AC88b97845E3f596C7561F15a",
          price: "0.0000099",
        });
        break;
      case "34":
        CONTRACT_ADDRESSES.push({
          contract: "0x266d3f4400a7EBB294760C2365391f4E9b79Aa64",
          price: "0.0000051",
        });
        break;
      case "35":
        CONTRACT_ADDRESSES.push({
          contract: "0xc31b65635F5cd7ce0C2616089a9edeed4aDD25C8",
          price: "0.0000055",
        });
        break;
      case "36":
        CONTRACT_ADDRESSES.push({
          contract: "0xF1bf13A7b1Faf12c18C282c6b4dCD9DEa7e048d6",
          price: "0.001",
        });
        break;
      case "37":
        CONTRACT_ADDRESSES.push({
          contract: "0x095F3e0CdaC51AB4b0F0b8F185fC72A48D7C78af",
          price: "0.00001",
        });
        break;
      case "38":
        CONTRACT_ADDRESSES.push({
          contract: "0x3780655dde2C38298d9a1D589347b7676BC4914E",
          price: "0.000005",
        });
        break;
      case "39":
        CONTRACT_ADDRESSES.push({
          contract: "0x12B940cB73077b63bF98b4d265Bf6878fd3cF6f4",
          price: "0.00001",
        });
        break;
      case "40":
        CONTRACT_ADDRESSES.push({
          contract: "0x793ca7A19dAF9551ebf5588c3ac53FD6aFa6cc77",
          price: "0.0002",
        });
        break;
      case "41":
        CONTRACT_ADDRESSES.push({
          contract: "0x6C7452A5A48A259B8F2f9895A0098C518D880B8d",
          price: "0.0005",
        });
        break;
      case "42":
        CONTRACT_ADDRESSES.push({
          contract: "0x6ffF54b3E7522d21D84eFcB428B09CA41535FbaD",
          price: "0.000005",
        });
        break;
      case "43":
        CONTRACT_ADDRESSES.push({
          contract: "0xE03e6E33781E7CD6C4649C106c5530a7Ee6ADca8",
          price: "0.0000069",
        });
        break;
      case "44":
        CONTRACT_ADDRESSES.push({
          contract: "0xA40820c56F01cE90e47Cc34766947087A285276e",
          price: "0.003",
        });
        break;
      case "45":
        CONTRACT_ADDRESSES.push({
          contract: "0xF1bf13A7b1Faf12c18C282c6b4dCD9DEa7e048d6",
          price: "0.001",
        });
        break;
      case "46":
        CONTRACT_ADDRESSES.push({
          contract: "0x56047f1fE560091E554d36aE4B6237ef61Ee5D5a",
          price: "0.000",
        });
        break;
      case "47":
        CONTRACT_ADDRESSES.push({
          contract: "0x4dA1226d33AfE8b85bc54d867ED7D4e3E4479331",
          price: "0.0005",
        });
        break;
      case "48":
        CONTRACT_ADDRESSES.push({
          contract: "0x6bb0543E112c8960058c287c810a84Df3f100E66",
          price: "0.00001",
        });
        break;
      case "49":
        CONTRACT_ADDRESSES.push({
          contract: "0xAAADf651C3f3e23f0BcC60F5b36E8fEFA9E8cDcd",
          price: "0.000",
        });
        break;
      case "50":
        CONTRACT_ADDRESSES.push({
          contract: "0xeF73Df056e30B9226E31e5f81B236E4aE92c82D8",
          price: "0.00001",
        });
        break;
      case "51":
        CONTRACT_ADDRESSES.push({
          contract: "0x23f1038353b8062dFc0EBB5ea22b7798DD87c864",
          price: "0.000005",
        });
        break;
      case "52":
        CONTRACT_ADDRESSES.push({
          contract: "0x1d83149999876c814B1da24A01ED8c458247A42E",
          price: "0.000",
        });
        break;
      case "53":
        CONTRACT_ADDRESSES.push({
          contract: "0xE254B9C2b279662Bfe2bf35AfF09D3868f991373",
          price: "0.00001",
        });
        break;
      case "54":
        CONTRACT_ADDRESSES.push({
          contract: "0x5A6Eb956FD9e3FEFb83a8AA16F4427Dc559846AA",
          price: "0.000041",
        });
        break;
      case "55":
        CONTRACT_ADDRESSES.push({
          contract: "0xC47b1e66FFFe397a7880d97Ea0948c73eB584960",
          price: "0.000005",
        });
        break;
      case "56":
        CONTRACT_ADDRESSES.push({
          contract: "0x7e876aa849edD77CF0Bf700d8466cB1cEB3725C1",
          price: "0.00001",
        });
        break;
      case "57":
        CONTRACT_ADDRESSES.push({
          contract: "0xE262D46fa0c6D14099e3C9e9a8Bfc108f8cE1A87",
          price: "0.000",
        });
        break;
      case "58":
        CONTRACT_ADDRESSES.push({
          contract: "0x8c7B37605615080E2e1124b6bfB6e1b55f1815e7",
          price: "0.005",
        });
        break;
      case "59":
        CONTRACT_ADDRESSES.push({
          contract: "0xfc69D64dda97c1FB3f858c7804bA4b433b37a6C9",
          price: "0.005",
        });
        break;
      case "60":
        CONTRACT_ADDRESSES.push({
          contract: "0x24a21Dc9c9955fbfF74d7238C065A8e3d5a9C148",
          price: "0.001",
        });
        break;
      case "61":
        CONTRACT_ADDRESSES.push({
          contract: "0x7AD53C8Dfb7cc3387FcC6131bFbc853702DcCa9c",
          price: "0.00",
        });
        break;
      case "62":
        CONTRACT_ADDRESSES.push({
          contract: "0x48F878D23f6aBBe533249d027Ab5711BFfC42839",
          price: "0.001",
        });
        break;
      case "63":
        CONTRACT_ADDRESSES.push({
          contract: "0xc34967d02CDa85e11b511f3cc77D213D7Fe2cA92",
          price: "0.00",
        });
        break;
      case "64":
        CONTRACT_ADDRESSES.push({
          contract: "0x97a2FD5b2F60af1a782CD45bE70fC9944116A059",
          price: "0.00",
        });
        break;
      case "65":
        CONTRACT_ADDRESSES.push({
          contract: "0x350795976A02d27D15c2b0e3503bBC81A916b403",
          price: "0.00",
        });
        break;
      case "66":
        CONTRACT_ADDRESSES.push({
          contract: "0x87B5010097C65C589Ec432d09c5Ee553fC512F3E",
          price: "0.0003",
        });
        break;
      case "67":
        CONTRACT_ADDRESSES.push({
          contract: "0x2dfE90Ec8f598AEBaEF7087f54390a3533998900",
          price: "0.0001",
        });
        break;
      case "68":
        CONTRACT_ADDRESSES.push({
          contract: "0x277a5CB1931BC29afB05458557e9b828B3EE7de1",
          price: "0.0001",
        });
        break;
      case "69":
        CONTRACT_ADDRESSES.push({
          contract: "0x7f41717aDA53EA21b182AF7A6869aB8Fbff88827",
          price: "0.000005",
        });
        break;
      case "70":
        CONTRACT_ADDRESSES.push({
          contract: "0xA4005EecD8200da988bA68a0f784C32794fd2302",
          price: "0.0001",
        });
        break;
      case "71":
        CONTRACT_ADDRESSES.push({
          contract: "0x473BD54805c451aDaAA5faaB57D79146033f0A69",
          price: "0.001",
        });
        break;
      case "72":
        CONTRACT_ADDRESSES.push({
          contract: "0x4A9bE3D324AdF9e93deD6B203DBDbBf143735B23",
          price: "0.000005",
        });
        break;
      case "73":
        CONTRACT_ADDRESSES.push({
          contract: "0x65894A2Dcd4dd0aE41A4BD5Ac87ceA70d92544a5",
          price: "0.005",
        });
        break;
      case "74":
        CONTRACT_ADDRESSES.push({
          contract: "0xE89e920408947E96167FCA26067DfA9733a44548",
          price: "0.000005",
        });
        break;
      case "76":
        CONTRACT_ADDRESSES.push({
          contract: "0x2b1659014CA7C798fC28D919dB67E3aF2a322Ece",
          price: "0.0001",
        });
        break;
      case "77":
        CONTRACT_ADDRESSES.push({
          contract: "0x982EAaf76b335081B356D8Dab478359Df6B95e3B",
          price: "0.0001",
        });
        break;
      case "78":
        CONTRACT_ADDRESSES.push({
          contract: "0x817a1E779C0073da7531A518D091e92a58DEa8Df",
          price: "0.0001",
        });
        break;
      case "79":
        CONTRACT_ADDRESSES.push({
          contract: "0x4C293d7dA592F4e7e6B4872d36B1E6CF3EF1Cd3C",
          price: "0.00001",
        });
        break;
      case "80":
        CONTRACT_ADDRESSES.push({
          contract: "0xcEe5E8b2698f6578e3Bd3d965DA94bE4841437Cd",
          price: "0.0001 ",
        });
        break;
      case "81":
        CONTRACT_ADDRESSES.push({
          contract: "0x40f080e468d8b45a6AE7a53b2c5437377ec86dEF",
          price: "0.0005",
        });
        break;
      case "82":
        CONTRACT_ADDRESSES.push({
          contract: "0x0c0f6783d7beBB4151060c7E6a1EC648a96cDEeC",
          price: "0.0001",
        });
        break;
      case "83":
        CONTRACT_ADDRESSES.push({
          contract: "0x324413501b11d9E1Bf6ea1070ccb3DC6147B5e2C",
          price: "0.0001",
        });
        break;
      case "84":
        CONTRACT_ADDRESSES.push({
          contract: "0x3764CC2361F8ba2e30267FE545CB54C44C74C644",
          price: "0.00001",
        });
        break;
      case "85":
        CONTRACT_ADDRESSES.push({
          contract: "0xB87a73DCFB08Cd71542557b9DfCaD37Bd6e2744B",
          price: "0.000005",
        });
        break;
      case "86":
        CONTRACT_ADDRESSES.push({
          contract: "0xA9fdcCA7D1Ee26021457877503160657310fd66c",
          price: "0.00",
        });
        break;
      case "87":
        CONTRACT_ADDRESSES.push({
          contract: "0x2aF83620Ad76E8676A40D551337669Df18e7C365",
          price: "0.00035",
        });
        break;
      case "88":
        CONTRACT_ADDRESSES.push({
          contract: "0xC62e4e700345FC525b498412289CeCCD00D275BE",
          price: "0.00",
        });
        break;
      case "89":
        CONTRACT_ADDRESSES.push({
          contract: "0x87C99E2f0a9d263BC17691b7Aa64Ca0d02cb789f",
          price: "0.00",
        });
        break;
      case "90":
        CONTRACT_ADDRESSES.push({
          contract: "0x1f5277C180e18aC4b811D03a4f26CbBAF4A194Cf",
          price: "0.00005",
        });
        break;
      case "91":
        CONTRACT_ADDRESSES.push({
          contract: "0x1D553424272184A4E701A49F1eACE3862532E66A",
          price: "0.00001",
        });
        break;
      case "92":
        CONTRACT_ADDRESSES.push({
          contract: "0x1A2be08F9E7A73791e97E3Ef559d1F370225DdE0",
          price: "0.00001",
        });
        break;
      case "93":
        CONTRACT_ADDRESSES.push({
          contract: "0x39738eF920E2d3D808b1C3866D18dCc1B1d3D9eb",
          price: "0.0001",
        });
        break;
      case "94":
        CONTRACT_ADDRESSES.push({
          contract: "0x4f8541026d7e874ad50321CC30Ca973A039DcA79",
          price: "0.001",
        });
        break;
      case "95":
        CONTRACT_ADDRESSES.push({
          contract: "0x3B8d0878CEc82dbF31df975Eff56573694366f51",
          price: "0.00",
        });
        break;
      case "96":
        CONTRACT_ADDRESSES.push({
          contract: "0xD01b567e46052771aA0ca3b8aE13984e10Ecfc8a",
          price: "0.00",
        });
        break;
      case "97":
        CONTRACT_ADDRESSES.push({
          contract: "0x8Ace5340fe0470FCE18462A7a684f1F6072602cE",
          price: "0.00001",
        });
        break;
      case "98":
        CONTRACT_ADDRESSES.push({
          contract: "0xb43F7F764f8e9cd1e88002ae0692DC109faF3546",
          price: "0.000005",
        });
        break;
      case "99":
        CONTRACT_ADDRESSES.push({
          contract: "0x593D37b927Ee298Fd308f8b14507adabbD8f9fCf",
          price: "0.0001",
        });
        break;
      case "100":
        CONTRACT_ADDRESSES.push({
          contract: "0x6Ba422E6fe39fbf78bF6260e68B9bDD1489ce668",
          price: "0.000005",
        });
        break;
      case "101":
        CONTRACT_ADDRESSES.push({
          contract: "0x50004f0Dd1Cf87607e99D0AcfC0778C035C8Dbf1",
          price: "0.0001",
        });
        break;
      case "102":
        CONTRACT_ADDRESSES.push({
          contract: "0xB40b6B0ca9589a201bd80Ef49B8266bfA0Fb7214",
          price: "0.0002",
        });
        break;
      case "103":
        CONTRACT_ADDRESSES.push({
          contract: "0x2682d543C6A5AEef6b4451BdDe328a157D35089b",
          price: "0.00001",
        });
        break;
      case "104":
        CONTRACT_ADDRESSES.push({
          contract: "0x33092bDBB68C2F73b7eEbf48F0aBC9101244cAF4",
          price: "0.0001",
        });
        break;
      case "105":
        CONTRACT_ADDRESSES.push({
          contract: "0xbf346a6a1190E927988079dE4cb9C185b2cAa361",
          price: "0.00001",
        });
        break;
      case "106":
        CONTRACT_ADDRESSES.push({
          contract: "0x5A3f80E4BAAbB1Fcd333eaBe237F441b71f687B1",
          price: "0.005",
        });
        break;
      case "107":
        CONTRACT_ADDRESSES.push({
          contract: "0x95F5975d9732f1c1c48D430b8C29677A840e274B",
          price: "0.005",
        });
        break;
      case "108":
        CONTRACT_ADDRESSES.push({
          contract: "0xf9BfA4bC1809a5d50d75BBF41f22670BC190AB2D",
          price: "0.00001",
        });
        break;
      case "109":
        CONTRACT_ADDRESSES.push({
          contract: "0xc84fe46835C8bd0392BAbDa2a897B327405dF1aC",
          price: "0.0001",
        });
        break;
      case "110":
        CONTRACT_ADDRESSES.push({
          contract: "0x713329f6B2Eacee23aeE40ceA9527F22BA630ACc",
          price: "0.000007",
        });
        break;
      case "111":
        CONTRACT_ADDRESSES.push({
          contract: "0x31d4e95D732D74b69a73223bfB5CF260e911B3aF",
          price: "0.0001",
        });
        break;
      case "112":
        CONTRACT_ADDRESSES.push({
          contract: "0xd9fE3CE20b7F3Be51C43bAfB6Eb1144a3e7e9698",
          price: "0.000005",
        });
        break;
      case "113":
        CONTRACT_ADDRESSES.push({
          contract: "0x7077DFf36003dA20f913d72d2f9412d6002EA492",
          price: "0.00001",
        });
        break;
      case "114":
        CONTRACT_ADDRESSES.push({
          contract: "0x058ec32046E000396A16953cD8E7a88854fB5250",
          price: "0.0001",
        });
        break;
      case "115":
        CONTRACT_ADDRESSES.push({
          contract: "0xAC394048D20295638F94358Ae5809e8A4D3769aB",
          price: "0.000005 ",
        });
        break;
      case "116":
        CONTRACT_ADDRESSES.push({
          contract: "0xe1f0d853F9c610E98b8bFdDD6E7a070dD2D08822",
          price: "0.0001",
        });
        break;
      case "117":
        CONTRACT_ADDRESSES.push({
          contract: "0x3C38452c29839cd834ee3148830b6C24b4C4064e",
          price: "0.0001",
        });
        break;
      case "118":
        CONTRACT_ADDRESSES.push({
          contract: "0xaD374b372A1c5C0343Bbf9BF3832A3b298d35295",
          price: "0.00001",
        });
        break;
      case "119":
        CONTRACT_ADDRESSES.push({
          contract: "0xE7003a9315f0e326fe49D2a6DD7129cA3eE1737d",
          price: "0.005",
        });
        break;
      case "120":
        CONTRACT_ADDRESSES.push({
          contract: "0xC1FCD740FCAe2Dd7aDa08101ac8aeA3208B07377",
          price: "0.0001",
        });
        break;
      case "120":
        CONTRACT_ADDRESSES.push({
          contract: "0x856AAc038fD3Ec3ca73B5994BE6845C5dD45fDD0",
          price: "0.01",
        });
        break;
      case "121":
        CONTRACT_ADDRESSES.push({
          contract: "0x012Fa8bAc8Bb3b998b710306d6161069f13A3b27",
          price: "0.005",
        });
        break;
      case "122":
        CONTRACT_ADDRESSES.push({
          contract: "0x666a514724a3CeB5DFA15127f8Bf60ca4EDbAD5f",
          price: "0.005",
        });
        break;
      case "123":
        CONTRACT_ADDRESSES.push({
          contract: "0xeA65F1387b733947BB5d1cBc935d457d5163f468",
          price: "0.0001",
        });
        break;
      case "124":
        CONTRACT_ADDRESSES.push({
          contract: "0x5e4154b76CC0108264e02AA40051BC57c548e5b2",
          price: "0.0001",
        });
        break;
      case "125":
        CONTRACT_ADDRESSES.push({
          contract: "0x3b53631ab2ccce6C1Cd02ade9d1689f173ea53d9",
          price: "0.0001",
        });
        break;
      case "126":
        CONTRACT_ADDRESSES.push({
          contract: "0x670E0d4F72bB32436B0C741b163b8cbD3438D80e",
          price: "0.0001",
        });
        break;
      case "127":
        CONTRACT_ADDRESSES.push({
          contract: "0x3f91fD3B33a059648BA95f7fe7427a51f5e165dF",
          price: "0.00001",
        });
        break;
      case "128":
        CONTRACT_ADDRESSES.push({
          contract: "0xF8127fe9FDe509599FCF159E3f13538D731e3Fd1",
          price: "0.00001",
        });
        break;
      case "129":
        CONTRACT_ADDRESSES.push({
          contract: "0x84072838aBcDEbC1F0E363A427Bc868E3003da52",
          price: "0.00001",
        });
        break;
      case "130":
        CONTRACT_ADDRESSES.push({
          contract: "0x601488EeEEfc2630B48d4a9056017F5e028C6c98",
          price: "0.0001",
        });
        break;
      case "131":
        CONTRACT_ADDRESSES.push({
          contract: "0xf2d2aC8b128aFc73428043E54832771287839075",
          price: "0.00001",
        });
        break;
      case "132":
        CONTRACT_ADDRESSES.push({
          contract: "0xbeDD6ac18cbFe0621941C556227386d6E18Bb831",
          price: "0.0001",
        });
        break;
      case "133":
        CONTRACT_ADDRESSES.push({
          contract: "0xA33Bc71e9b091CD18FC613CBa32006FaD2b15809",
          price: "0.00001",
        });
        break;
      case "134":
        CONTRACT_ADDRESSES.push({
          contract: "0x6094415540Cb1f0281851f04a815F7E1634A73f0",
          price: "0.00001",
        });
        break;
      case "135":
        CONTRACT_ADDRESSES.push({
          contract: "0x3f13CC122b0c11839574de141d378e05d8600f5F",
          price: "0.0001",
        });
        break;
      case "136":
        CONTRACT_ADDRESSES.push({
          contract: "0x56334679f7f36c3879731cDf8403769334a72380",
          price: "0.001",
        });
        break;
      case "137":
        CONTRACT_ADDRESSES.push({
          contract: "0x7356D2acc5De693e7308511933C23856135Bd7a8",
          price: "0.0001",
        });
        break;
      case "138":
        CONTRACT_ADDRESSES.push({
          contract: "0xE88DbB2FbCD9712922e483a56D0a01e94d52A290",
          price: "0.0001",
        });
        break;
      case "139":
        CONTRACT_ADDRESSES.push({
          contract: "0x1350466921508ECb39d8E6Da8485BA73be175042",
          price: "0.0001",
        });
        break;
      case "140":
        CONTRACT_ADDRESSES.push({
          contract: "0xf7ED49eac623B36b63023B2368AcEBFf7Cf0E284",
          price: "0.0001",
        });
        break;
      case "141":
        CONTRACT_ADDRESSES.push({
          contract: "0x91F6e4129E5D7505283b248Df960Cc24aCB7A4A9",
          price: "0.00001",
        });
        break;
      case "142":
        CONTRACT_ADDRESSES.push({
          contract: "0x45055c9E1a0AbD2b369Dab7dBAbBc395Da4924c8",
          price: "0.00001",
        });
        break;
      case "143":
        CONTRACT_ADDRESSES.push({
          contract: "0xDD40ad5379CE9b57504443f5B90119ce2599291E",
          price: "0.00001",
        });
        break;
      case "144":
        CONTRACT_ADDRESSES.push({
          contract: "0xd32Fe4E638B6032BA87598d44cBF6842778E84bf",
          price: "0.0002",
        });
        break;
      case "145":
        CONTRACT_ADDRESSES.push({
          contract: "0x4dc13a35141cF6a5aBC0A207F70d5Bf90EaeCc0B",
          price: "0.0001",
        });
        break;
      case "146":
        CONTRACT_ADDRESSES.push({
          contract: "0x6407ebc0eCaBf67B7014b4211a6fBAAAe6dC0d6C",
          price: "0.0001",
        });
        break;
      case "147":
        CONTRACT_ADDRESSES.push({
          contract: "0x662c35AA2AD6B981E384A7AB9764626bc637Eff5",
          price: "0.0001",
        });
        break;
      case "148":
        CONTRACT_ADDRESSES.push({
          contract: "0x1A8BEAbeECB87a08B83DF7571AC9f1A6d032b602",
          price: "0.0001",
        });
        break;
      case "149":
        CONTRACT_ADDRESSES.push({
          contract: "0x45e6F2858474528fCb18887A3b8928558aD4eF2B",
          price: "0.0001",
        });
        break;
      case "150":
        CONTRACT_ADDRESSES.push({
          contract: "0x3317255a53920d4b037Be3283bB2933FE685Bcd4",
          price: "0.0001",
        });
        break;
      case "151":
        CONTRACT_ADDRESSES.push({
          contract: "0x0cc2130c2279c870489f74bC8f51349fD66DAc69",
          price: "0.0001",
        });
        break;
      case "152":
        CONTRACT_ADDRESSES.push({
          contract: "0xD10756787F1ebbD2cF6d082Bb8fbF4E2d570B16A",
          price: "0.0001",
        });
        break;
      case "153":
        CONTRACT_ADDRESSES.push({
          contract: "0x59Bfef6AFFdfD0988Cd1B4CcD9DC6892A00C0E7e",
          price: "0.0001",
        });
        break;
      case "154":
        CONTRACT_ADDRESSES.push({
          contract: "0x4a5f67d04065FAF11EA58cFF684eDf82Cd0fa798",
          price: "0.0001",
        });
        break;
      case "155":
        CONTRACT_ADDRESSES.push({
          contract: "0x4ac674c996158eEE808779c5F8B3C3DE88ECde9c",
          price: "0.0001",
        });
        break;
      case "156":
        CONTRACT_ADDRESSES.push({
          contract: "0x7B8Fd2635EfF31E531E530A5005E60E3eF3b0CB0",
          price: "0.0001",
        });
        break;
      case "157":
        CONTRACT_ADDRESSES.push({
          contract: "0x82860F8A251f0831f8D149662Ca5C6aC29aec7C4",
          price: "0.0001",
        });
        break;
      case "158":
        CONTRACT_ADDRESSES.push({
          contract: "0x30E47F0F0F3B4437B5eb6CeF2897cA340f3FCd81",
          price: "0.0001",
        });
        break;
      case "159":
        CONTRACT_ADDRESSES.push({
          contract: "0x63e74dF8A06575F6A9377420cbA2C90eaF78264a",
          price: "0.00001",
        });
        break;
      case "160":
        CONTRACT_ADDRESSES.push({
          contract: "0xa6c9A2CceA3fAcFdd296EDF65E609055adb1AC5E",
          price: "0.00001",
        });
        break;
      case "161":
        CONTRACT_ADDRESSES.push({
          contract: "0xb7dE31E812d5760AC88b97845E3f596C7561F15a",
          price: "0.0000099",
        });
        break;
      case "162":
        CONTRACT_ADDRESSES.push({
          contract: "0xc31b65635F5cd7ce0C2616089a9edeed4aDD25C8",
          price: "0.0000055",
        });
        break;
      case "163":
        CONTRACT_ADDRESSES.push({
          contract: "0x266d3f4400a7EBB294760C2365391f4E9b79Aa64",
          price: "0.0000051",
        });
        break;
      case "164":
        CONTRACT_ADDRESSES.push({
          contract: "0xF1bf13A7b1Faf12c18C282c6b4dCD9DEa7e048d6",
          price: "0.001",
        });
        break;
      case "165":
        CONTRACT_ADDRESSES.push({
          contract: "0x095F3e0CdaC51AB4b0F0b8F185fC72A48D7C78af",
          price: "0.00001",
        });
        break;
      case "166":
        CONTRACT_ADDRESSES.push({
          contract: "0x3780655dde2C38298d9a1D589347b7676BC4914E",
          price: "0.000005",
        });
        break;
      case "167":
        CONTRACT_ADDRESSES.push({
          contract: "0x12B940cB73077b63bF98b4d265Bf6878fd3cF6f4",
          price: "0.00001",
        });
        break;
      case "168":
        CONTRACT_ADDRESSES.push({
          contract: "0x793ca7A19dAF9551ebf5588c3ac53FD6aFa6cc77",
          price: "0.0002",
        });
        break;
      case "169":
        CONTRACT_ADDRESSES.push({
          contract: "0x6C7452A5A48A259B8F2f9895A0098C518D880B8d",
          price: "0.0005",
        });
        break;
      case "170":
        CONTRACT_ADDRESSES.push({
          contract: "0x6ffF54b3E7522d21D84eFcB428B09CA41535FbaD",
          price: "0.000005",
        });
        break;
      case "171":
        CONTRACT_ADDRESSES.push({
          contract: "0xE03e6E33781E7CD6C4649C106c5530a7Ee6ADca8",
          price: "0.0000069",
        });
        break;
      case "172":
        CONTRACT_ADDRESSES.push({
          contract: "0xA40820c56F01cE90e47Cc34766947087A285276e",
          price: "0.003",
        });
        break;
      case "173":
        CONTRACT_ADDRESSES.push({
          contract: "0x8FaBfa7A5760402683aB6654d70b9cDB9698Fc24",
          price: "0.00001",
        });
        break;
      case "174":
        CONTRACT_ADDRESSES.push({
          contract: "0x339104E588188d2C28B60D74D6F23D7f3fE859bd",
          price: "0.00001",
        });
        break;
      case "175":
        CONTRACT_ADDRESSES.push({
          contract: "0x098C15D653B9E0bbb66260c0E1Adb45a685fFc67",
          price: "0.00001",
        });
        break;
      case "176":
        CONTRACT_ADDRESSES.push({
          contract: "0xd63B4FDad0099FB30d27e4eC4eA4b89319eE3fb5",
          price: "0.0001",
        });
        break;
      case "177":
        CONTRACT_ADDRESSES.push({
          contract: "0x8d031d08301e0Db789Cc7dECB4b190f2bDCE6e05",
          price: "0.0001",
        });
        break;
      case "178":
        CONTRACT_ADDRESSES.push({
          contract: "0x470d874bE36aEEC5EF96E37b06B8f576E48A6194",
          price: "0.00001",
        });
        break;
      case "179":
        CONTRACT_ADDRESSES.push({
          contract: "0xc251aB6Dc97EE04a50a07A5A629873de4e76D099",
          price: "0.0001",
        });
        break;
      case "180":
        CONTRACT_ADDRESSES.push({
          contract: "0x889B4d6D4F0CDf26481fE44B4c5203fD9BfC04ec",
          price: "0.0001",
        });
        break;
      case "181":
        CONTRACT_ADDRESSES.push({
          contract: "0xA70ECc6184930c082972156edBe4E5262a1d3f95",
          price: "0.00001",
        });
        break;
      case "182":
        CONTRACT_ADDRESSES.push({
          contract: "0x2B7bE2a429b405D8A4D3D533153d1Ced24B96499",
          price: "0.0001",
        });
        break;
      case "183":
        CONTRACT_ADDRESSES.push({
          contract: "0x5924fA26a2fd47075105C2Bf13935D46c1a7d809",
          price: "0.0001",
        });
        break;
      case "184":
        CONTRACT_ADDRESSES.push({
          contract: "0x819B43D261AD204Bb3cBD2bE7bB67e9011f61734",
          price: "0.0001",
        });
        break;
      case "185":
        CONTRACT_ADDRESSES.push({
          contract: "0xc7CdcF7dea5B0FFdC8893fFf7A0F328AD33697c6",
          price: "0.0001",
        });
        break;
      case "186":
        CONTRACT_ADDRESSES.push({
          contract: "0xe9E7AA6199D607FDF99e3DE16AF0573B59585D63",
          price: "0.0001",
        });
        break;
      case "187":
        CONTRACT_ADDRESSES.push({
          contract: "0xc6FB17c4092Ae52AccD19613ce16D2bd6D71a3F3",
          price: "0.0001",
        });
        break;
      case "188":
        CONTRACT_ADDRESSES.push({
          contract: "0x9f6824a92486D74A0083d4D9E871c2FD0436238C",
          price: "0.0001",
        });
        break;
      case "189":
        CONTRACT_ADDRESSES.push({
          contract: "0x82b0b9B57ec7A732657273e287A7303568D9603B",
          price: "0.0001",
        });
        break;
      case "190":
        CONTRACT_ADDRESSES.push({
          contract: "0xAcc15Fc1fE182f7fb7a3110BCA28AecC9531e1F9",
          price: "0.0001",
        });
        break;
      case "191":
        CONTRACT_ADDRESSES.push({
          contract: "0xF548A8088c364752E28A169aa1aB422193962bAB",
          price: "0.0001",
        });
        break;
      case "192":
        CONTRACT_ADDRESSES.push({
          contract: "0x3E25AAb3b0e921aee21C7778127FAdac8AF6D906",
          price: "0.001",
        });
        break;
      case "193":
        CONTRACT_ADDRESSES.push({
          contract: "0x03c77871E3aEF69Dc7a143eaBB5a32DdF8783B44",
          price: "0.0001",
        });
        break;
      case "194":
        CONTRACT_ADDRESSES.push({
          contract: "0xC01c8c44d5C355A4B12a97Eb84EEC028591a4f20",
          price: "0.0001",
        });
        break;
      case "195":
        CONTRACT_ADDRESSES.push({
          contract: "0x2D1478ca122964534Fe225033f0C2AE6c1BC7A61",
          price: "0.0001",
        });
        break;
      case "196":
        CONTRACT_ADDRESSES.push({
          contract: "0xccF3b4D987598878566e8c4D3a617aB6D1cd7956",
          price: "0.0001",
        });
        break;
      case "197":
        CONTRACT_ADDRESSES.push({
          contract: "0x379ed98F3CC4D08ef448A8a24e57877fBF384BDC",
          price: "0.0001",
        });
        break;
      case "198":
        CONTRACT_ADDRESSES.push({
          contract: "0x670D31546cF6bc483f684365F46F94bC9161B04A",
          price: "0.0001",
        });
        break;
      case "199":
        CONTRACT_ADDRESSES.push({
          contract: "0xbb6d044101Aa3d2A73DcF36AA33eF5A51a772401",
          price: "0.0001",
        });
        break;
      case "200":
        CONTRACT_ADDRESSES.push({
          contract: "0xaAC48232c94dEaC83C4d4d41f7Dd4879D1b97b83",
          price: "0.0001",
        });
        break;
      case "201":
        CONTRACT_ADDRESSES.push({
          contract: "0x9b96bCFB1F2327de4C5702cA5F04a53CE35EFAe3",
          price: "0.0001",
        });
        break;
      case "202":
        CONTRACT_ADDRESSES.push({
          contract: "0x3a36d7be2F441F7C278e0F982bC407f8ae0aCdB3",
          price: "0.00001",
        });
        break;
      case "203":
        CONTRACT_ADDRESSES.push({
          contract: "0xF68663361561fFfD6cEdaE4DF17FbA4018043dD7",
          price: "0.0005",
        });
        break;
      case "204":
        CONTRACT_ADDRESSES.push({
          contract: "0x6232305301B88FE725DF8328AC23ff6EA28FcB59",
          price: "0.0001",
        });
        break;
      case "205":
        CONTRACT_ADDRESSES.push({
          contract: "0x7F1073b1d9eC1E3943C5934f2022F8e94BB5Bfe5",
          price: "0.00001",
        });
        break;
      case "206":
        CONTRACT_ADDRESSES.push({
          contract: "0x8B0261DC776F6a6e01C23130C4B08b1B3eC7B6Bd",
          price: "0.00001",
        });
        break;
      case "207":
        CONTRACT_ADDRESSES.push({
          contract: "0x6F95BFbCc994954015F2efCca79AE3C7F88B1ce4",
          price: "0.0001",
        });
        break;
      case "208":
        CONTRACT_ADDRESSES.push({
          contract: "0x34c6950B62DAdBaE157156ED55897287C6134720",
          price: "0.0001",
        });
        break;
      case "209":
        CONTRACT_ADDRESSES.push({
          contract: "0x4b47CABf9689D196b4E6d3872c50b29522722fA2",
          price: "0.0001",
        });
        break;
      case "210":
        CONTRACT_ADDRESSES.push({
          contract: "0xEc9d7b55266EC2d2cE7449cBf111908dAfcfDa12",
          price: "0.0001",
        });
        break;
      case "211":
        CONTRACT_ADDRESSES.push({
          contract: "0xa49130052519553571bc5CB7BD18D1C03A2963ca",
          price: "0.0001",
        });
        break;
      case "212":
        CONTRACT_ADDRESSES.push({
          contract: "0x30e98E5094d978cae991B5de17c525bA3Feb844F",
          price: "0.0001",
        });
        break;
      case "213":
        CONTRACT_ADDRESSES.push({
          contract: "0x98e277e77976343aE14FCB6cEB002cC23d9154e0",
          price: "0.0001",
        });
        break;
      case "214":
        CONTRACT_ADDRESSES.push({
          contract: "0xeCC253Dfc5863EE8f6238a786444A2C6422A9d35",
          price: "0.0001",
        });
        break;
      case "215":
        CONTRACT_ADDRESSES.push({
          contract: "0x16fF711E9a31CF007B21618c6Ee7F5892a71249a",
          price: "0.0001",
        });
        break;
      case "216":
        CONTRACT_ADDRESSES.push({
          contract: "0x1f8b39D00669963a0A3b8D71cB0c371eeB3265f9",
          price: "0.0001",
        });
        break;
      case "217":
        CONTRACT_ADDRESSES.push({
          contract: "0xd77eeAc6e7dA493E7f93c346Dc13fFd6a07A4040",
          price: "0.0001",
        });
        break;
      case "218":
        CONTRACT_ADDRESSES.push({
          contract: "0x8f5DAB200Ac92211d1Aee25F4deDF2d089E76cA2",
          price: "0.0001",
        });
        break;
      case "219":
        CONTRACT_ADDRESSES.push({
          contract: "0x046242776DF6B8A8193B4df9A4aE76910324a9eC",
          price: "0.0001",
        });
        break;
      case "220":
        CONTRACT_ADDRESSES.push({
          contract: "0x346F8A7b06015bB5402D11d0ceF6286a520E704a",
          price: "0.0001",
        });
        break;
      case "221":
        CONTRACT_ADDRESSES.push({
          contract: "0x58e1Ce49BA112e3f5494de110a2a6E30EC98407C",
          price: "0.0001",
        });
        break;
      case "222":
        CONTRACT_ADDRESSES.push({
          contract: "0x2CBD9f2a59B1684A50E559667b0B1e8B21621246",
          price: "0.0001",
        });
        break;
      case "223":
        CONTRACT_ADDRESSES.push({
          contract: "0x476e42B6857B2Ec4CF3Db78487b7733239046685",
          price: "0.00001",
        });
        break;
      case "224":
        CONTRACT_ADDRESSES.push({
          contract: "0xDd7aaa667C4D47a55E5dC2344f104e8195C0B856",
          price: "0.0001",
        });
        break;
      case "225":
        CONTRACT_ADDRESSES.push({
          contract: "0x56434eCaeAb92A66E9ADAA3898242Ba0D8D32216",
          price: "0.00001",
        });
        break;
      case "226":
        CONTRACT_ADDRESSES.push({
          contract: "0xc94956c6BB6E0eBA465b4D548d2F32E0d58FcB67",
          price: "0.0001",
        });
        break;
      case "227":
        CONTRACT_ADDRESSES.push({
          contract: "0xa9441c1E1dC4338E1a100847ceBD556AD7B36556",
          price: "0.00001",
        });
        break;
      case "228":
        CONTRACT_ADDRESSES.push({
          contract: "0xF3cb8b35f3FAd84e036cEee0710367D2e36d0108",
          price: "0.00001",
        });
        break;
      case "229":
        CONTRACT_ADDRESSES.push({
          contract: "0xEf1F7dFCb3ceFA6107320dF1fc7F96384ADc7E0A",
          price: "0.0001",
        });
        break;
      case "230":
        CONTRACT_ADDRESSES.push({
          contract: "0xC51F807EF9E521AD87D8681a481bEa326a2182e1",
          price: "0.0001",
        });
        break;
      case "231":
        CONTRACT_ADDRESSES.push({
          contract: "0x2648f8D699274D1E1A872d609d04284df4b6Bdf7",
          price: "0.0001",
        });
        break;
      case "232":
        CONTRACT_ADDRESSES.push({
          contract: "0x26931a9Fd3B8CcD83136EE246301EC39024918FA",
          price: "0.0001",
        });
        break;
      case "233":
        CONTRACT_ADDRESSES.push({
          contract: "0x6bcd0b391f99D0e066903424771c9a0B6c1d4Bb1",
          price: "0.00001",
        });
        break;
      case "234":
        CONTRACT_ADDRESSES.push({
          contract: "0xdC509B1F2231d81B44128195f6b8930b7B8BD389",
          price: "0.0001",
        });
        break;
      case "235":
        CONTRACT_ADDRESSES.push({
          contract: "0xa42D37FaDBed249A62ad9B075f3689CACAE69706",
          price: "0.0001",
        });
        break;
      case "236":
        CONTRACT_ADDRESSES.push({
          contract: "0xd93EC354aFAd45e2c617F463650c47C84E8c5FA4",
          price: "0.0001",
        });
        break;
      case "237":
        CONTRACT_ADDRESSES.push({
          contract: "0x5fB2624314f6c72c8e508FB833c90490811206EC",
          price: "0.0001",
        });
        break;
      case "238":
        CONTRACT_ADDRESSES.push({
          contract: "0xec77A85059525264dbDe2238BaCF11dADe961531",
          price: "0.0001",
        });
        break;
      case "239":
        CONTRACT_ADDRESSES.push({
          contract: "0x7280E16191d6e811f3DC6E41bB571dDA4A98B3Ee",
          price: "0.0001",
        });
        break;
      case "240":
        CONTRACT_ADDRESSES.push({
          contract: "0xB4f66eB66C7f18BB14C51Ccc7998366BC59B89CF",
          price: "0.00001",
        });
        break;
      case "241":
        CONTRACT_ADDRESSES.push({
          contract: "0x4A7993B17D13711Ad785536d193c13532ae5Dd5b",
          price: "0.00001",
        });
        break;
      case "242":
        CONTRACT_ADDRESSES.push({
          contract: "0x2988066CAb8702fB92982CC3afe8d3781ba349CA",
          price: "0.0001",
        });
        break;
      case "243":
        CONTRACT_ADDRESSES.push({
          contract: "0x9844D5B6d8d7526D1F0AB49a3a9C91228eDDf4B3",
          price: "0.0001",
        });
        break;
      case "244":
        CONTRACT_ADDRESSES.push({
          contract: "0x2E43216D2856918B0e8089E96889c12CA6FD4E54",
          price: "0.0001",
        });
        break;
      case "245":
        CONTRACT_ADDRESSES.push({
          contract: "0x1bdd3d5DaC1882dABB4f702F6B220Cc104728B2C",
          price: "0.0001",
        });
        break;
      case "246":
        CONTRACT_ADDRESSES.push({
          contract: "0x13C2cC1F276E465f108683c3C7Aa5F4c6cba7682",
          price: "0.0001",
        });
        break;
      case "247":
        CONTRACT_ADDRESSES.push({
          contract: "0xdEA3d427C4bd21e237db3991172ef36a60cf2057",
          price: "0.0001",
        });
        break;
      case "248":
        CONTRACT_ADDRESSES.push({
          contract: "0xAB8037e3F1dB38D1362BFEf7480A3F010CbdFF82",
          price: "0.0001",
        });
        break;
      case "249":
        CONTRACT_ADDRESSES.push({
          contract: "0xCed4541315c78a900ac644c7002fac6DbB76a11B",
          price: "0.0001",
        });
        break;
      case "250":
        CONTRACT_ADDRESSES.push({
          contract: "0x92fc1c9a4C8edb50B185F6d3292503F3F47AacFb",
          price: "0.0001",
        });
        break;
      case "251":
        CONTRACT_ADDRESSES.push({
          contract: "0x7FfE4488962eaC626175acBE32f5fda63dB9e249",
          price: "0.0001",
        });
        break;
      case "252":
        CONTRACT_ADDRESSES.push({
          contract: "0x90666b63889Ebf14878c61e6aB6af8d6D6541fC6",
          price: "0.0001",
        });
        break;
      case "253":
        CONTRACT_ADDRESSES.push({
          contract: "0x4Eb0091889f105EbE70178aAF2278E2A31f4F87B",
          price: "0.001",
        });
        break;
      case "254":
        CONTRACT_ADDRESSES.push({
          contract: "0x2f92327301C57Ca0A80AF49a2beb9EC22020a0e2",
          price: "0.0001",
        });
        break;
      case "255":
        CONTRACT_ADDRESSES.push({
          contract: "0x4946AEc127A24c58f85D449800aE7d6ff0c25Cb0",
          price: "0.0001",
        });
        break;
      case "256":
        CONTRACT_ADDRESSES.push({
          contract: "0x6De73198c7C332eb499cdC54DF13DA79Fe99b154",
          price: "0.0001",
        });
        break;
      case "257":
        CONTRACT_ADDRESSES.push({
          contract: "0x36aFADa88fc02D05c36b946Edbae44502625B3DB",
          price: "0.0001",
        });
        break;
      case "258":
        CONTRACT_ADDRESSES.push({
          contract: "0xf03E307929F4b35f3184759A34aaC058384A4c64",
          price: "0.0001",
        });
        break;
      case "259":
        CONTRACT_ADDRESSES.push({
          contract: "0x001CFd398992BE744B6a8322eB27935F5C6D2362",
          price: "0.0001",
        });
        break;
      case "260":
        CONTRACT_ADDRESSES.push({
          contract: "0x12c99836Cc219a48825C47bEFE94E3B1501e0d85",
          price: "0.0001",
        });
        break;
      case "261":
        CONTRACT_ADDRESSES.push({
          contract: "0x263af0A8d8ace5c8F9a3a255E1F7132488331D99",
          price: "0.0001",
        });
        break;
      case "262":
        CONTRACT_ADDRESSES.push({
          contract: "0xC09c419C95b4092D971e20b0C6898622C4399CC9",
          price: "0.0001",
        });
        break;
      case "263":
        CONTRACT_ADDRESSES.push({
          contract: "0x0bFb8c208E20eB5EC202D995919EA716e6c47f92",
          price: "0.00001",
        });
        break;
      case "264":
        CONTRACT_ADDRESSES.push({
          contract: "0x2813a587Ab4EC3CE65aF5cb8A8CAb740A8edb798",
          price: "0.0001",
        });
        break;
      case "265":
        CONTRACT_ADDRESSES.push({
          contract: "0xE559Ddcca05487cA3f55C33263b927D40C841BFf",
          price: "0.0001",
        });
        break;
      case "266":
        CONTRACT_ADDRESSES.push({
          contract: "0x67A25D74767DDa50b075AEe9bbBBd6252d60D2a0",
          price: "0.0001",
        });
        break;
      case "267":
        CONTRACT_ADDRESSES.push({
          contract: "0x35D831e88B3143790a16d5addd06225911Fc9C61",
          price: "0.0001",
        });
        break;
      case "268":
        CONTRACT_ADDRESSES.push({
          contract: "0xba4522a84731F3271D4bC6bb1Fd5056Fb44A8315",
          price: "0.0001",
        });
        break;
      case "269":
        CONTRACT_ADDRESSES.push({
          contract: "0xc2b4fEf1A0D6FdAc1bA611E1e5d69561dF21C69e",
          price: "0.0001",
        });
        break;
      case "270":
        CONTRACT_ADDRESSES.push({
          contract: "0x7e5eCc2AC0622F4784D3536ba3C7b708Af124737",
          price: "0.0001",
        });
        break;
      case "271":
        CONTRACT_ADDRESSES.push({
          contract: "0x50Ba3576868b3c424571C730a21177448c161221",
          price: "0.0001",
        });
        break;
      case "272":
        CONTRACT_ADDRESSES.push({
          contract: "0x0B996124c2d36E27016fe02DDcCf13BD1e2Ad359",
          price: "0.0001",
        });
        break;
      case "273":
        CONTRACT_ADDRESSES.push({
          contract: "0x4be7764C2353273a57d998C966672305dAA9B712",
          price: "0.0001",
        });
        break;
      case "274":
        CONTRACT_ADDRESSES.push({
          contract: "0x78F6601910D11ae263De858E4F93A138c81B320b",
          price: "0.0001",
        });
        break;
      case "275":
        CONTRACT_ADDRESSES.push({
          contract: "0xc168Ba0915367b89ac545B6DcF9c79Cf5376BaB3",
          price: "0.0001",
        });
        break;
      case "276":
        CONTRACT_ADDRESSES.push({
          contract: "0xb52E3390ec54414DC42770ad2dA9920FD271cd92",
          price: "0.0001",
        });
        break;
      case "277":
        CONTRACT_ADDRESSES.push({
          contract: "0x131B7aFE28eE3c01F31b3611856981aae24e8C25",
          price: "0.0001",
        });
        break;
      case "278":
        CONTRACT_ADDRESSES.push({
          contract: "0x3Ee29b7Df9410A0676cA52d0BdC10B23582913e6",
          price: "0.0001",
        });
        break;
      case "279":
        CONTRACT_ADDRESSES.push({
          contract: "0xD3635195Bb501e2b734e22AE9aC4882440F2Cbe1",
          price: "0.0001",
        });
        break;
      case "280":
        CONTRACT_ADDRESSES.push({
          contract: "0xa605D1a98c2600cb5a50cf95F94531f17817648a",
          price: "0.0001",
        });
        break;
      case "281":
        CONTRACT_ADDRESSES.push({
          contract: "0x78690Be355247113ca941c3B8a7204d56b93f861",
          price: "0.0001",
        });
        break;
      case "282":
        CONTRACT_ADDRESSES.push({
          contract: "0x685a7e7808b08EB2f4698488487c247d598bEd39",
          price: "0.0001",
        });
        break;
      case "283":
        CONTRACT_ADDRESSES.push({
          contract: "0xe249c9328FBC5b7914E99F794d0F0f876753A0CB",
          price: "0.0001",
        });
        break;
      case "284":
        CONTRACT_ADDRESSES.push({
          contract: "0x3586EC3e2deEF9a33032cA255AA8E28242636DC2",
          price: "0.0001",
        });
        break;
      case "285":
        CONTRACT_ADDRESSES.push({
          contract: "0x103Cab21B28550C4Cb727a553Dc8cE3ccBabB77a",
          price: "0.0001",
        });
        break;
      case "286":
        CONTRACT_ADDRESSES.push({
          contract: "0xe1BD26ECC26f750A471aEE1B63E2d130AF38D75e",
          price: "0.0001",
        });
        break;
      case "287":
        CONTRACT_ADDRESSES.push({
          contract: "0x046A38101f656e6457E9a61005A835a60dD3a87C",
          price: "0.0001",
        });
        break;
      case "288":
        CONTRACT_ADDRESSES.push({
          contract: "0xc53402cE5Ab2623b827563b7B8E85eDE627000e0",
          price: "0.00001",
        });
        break;
      case "289":
        CONTRACT_ADDRESSES.push({
          contract: "0xbFccD5999289dBBf639bB3c3744DBaa381503135",
          price: "0.0001",
        });
        break;
      case "290":
        CONTRACT_ADDRESSES.push({
          contract: "0xF25d31CA1B66D4bda105ad4DB66CF65727F0f2bD",
          price: "0.0001",
        });
        break;
      case "291":
        CONTRACT_ADDRESSES.push({
          contract: "0x44107645e290683c6f2d1429C29A8F94b080366D",
          price: "0.00001",
        });
        break;
      case "292":
        CONTRACT_ADDRESSES.push({
          contract: "0x4E3f78F665922957468CB3Bf78C2680f7Ed28A41",
          price: "0.0001",
        });
        break;
      case "293":
        CONTRACT_ADDRESSES.push({
          contract: "0xBbA8d6e264E6dcA70281b34225Ca8925a5f2B379",
          price: "0.0001",
        });
        break;
      case "294":
        CONTRACT_ADDRESSES.push({
          contract: "0xc16376f067995b93d6B6Ca7d70382621B1365a21",
          price: "0.0001",
        });
        break;
      case "295":
        CONTRACT_ADDRESSES.push({
          contract: "0x383F32CD343347fEe75f7304cc65EFE833F4d3aE",
          price: "0.0001",
        });
        break;
      case "296":
        CONTRACT_ADDRESSES.push({
          contract: "0xA3bDf30892502E5019aD6D2b8B4F78a26aAD05B3",
          price: "0.001",
        });
        break;
      case "297":
        CONTRACT_ADDRESSES.push({
          contract: "0x2c3792340f1bFfCd0C8C1c869c519dF9A3DdEcAe",
          price: "0.0001",
        });
        break;
      case "298":
        CONTRACT_ADDRESSES.push({
          contract: "0x8de36ad04E6397c24Ca78E0F7BB190d3344B66D3",
          price: "0.0001",
        });
        break;
      case "299":
        CONTRACT_ADDRESSES.push({
          contract: "0x0Fa8f74b34cf650696Ab0Ed21DFbf9bEdc8Ae724",
          price: "0.0001",
        });
        break;
      case "300":
        CONTRACT_ADDRESSES.push({
          contract: "0x2E6f58a9Ce95a69511b4845a21c8882A6cAb2FD6",
          price: "0.00001",
        });
        break;
      case "301":
        CONTRACT_ADDRESSES.push({
          contract: "0x559E9a6c2D64Cf4473281b8ba92844066F056127",
          price: "0.00001",
        });
        break;
      case "302":
        CONTRACT_ADDRESSES.push({
          contract: "0x66a0Ba3993f998C1Ac916bf37883C933F1Bfe309",
          price: "0.00001",
        });
        break;
      case "303":
        CONTRACT_ADDRESSES.push({
          contract: "0x211D539FaCb7a7060c5CF9a997AA5A8da13d2B14",
          price: "0.00001",
        });
        break;
      case "304":
        CONTRACT_ADDRESSES.push({
          contract: "0x6883C44f7C06338cdD08200b77DFd746CA32C03d",
          price: "0.00001",
        });
        break;
      case "305":
        CONTRACT_ADDRESSES.push({
          contract: "0xa3be1aEFCCccDfF4b3E53eB8cC2b965b5E153dca",
          price: "0.0001",
        });
        break;
      case "306":
        CONTRACT_ADDRESSES.push({
          contract: "0xCCab480799fE4ee15FEB3E2733DAb62b1b9075f9",
          price: "0.0001",
        });
        break;
      case "307":
        CONTRACT_ADDRESSES.push({
          contract: "0xD47Da1D483F5de90DC7510B567590b3B2e0F8dd5",
          price: "0.0001",
        });
        break;
      case "308":
        CONTRACT_ADDRESSES.push({
          contract: "0xda494162BA2D37dbF4f2287C8E2c2A8062E36240",
          price: "0.0001",
        });
        break;
      case "309":
        CONTRACT_ADDRESSES.push({
          contract: "0x9f4876dBF6A734F02cD68461319525c747F75Bbe",
          price: "0.0001",
        });
        break;
      case "310":
        CONTRACT_ADDRESSES.push({
          contract: "0x3694ae23C0eFCe829F4Cfab589335E481eEa41F8",
          price: "0.0001",
        });
        break;
      case "311":
        CONTRACT_ADDRESSES.push({
          contract: "0x74efB9aD865E84054128Bc461B4d186169e7ffef",
          price: "0.001",
        });
        break;
      case "312":
        CONTRACT_ADDRESSES.push({
          contract: "0x7074AfFaaF34295412DE7d2640eada281244fB36",
          price: "0.0001",
        });
        break;
      case "313":
        CONTRACT_ADDRESSES.push({
          contract: "0x8a41bD5C76Da46CC9531586b1De7C19974ead412",
          price: "0.0001",
        });
        break;
      case "314":
        CONTRACT_ADDRESSES.push({
          contract: "0x5109d06a267ac8DD62d25d0034e4900cCd3361E9",
          price: "0.0001",
        });
        break;
      case "315":
        CONTRACT_ADDRESSES.push({
          contract: "0xCCfb2aA667f6CC9343A6F600509cbA2b77003ff8",
          price: "0.0001",
        });
        break;
      case "316":
        CONTRACT_ADDRESSES.push({
          contract: "0x6f7eA97876C3Cd9ecd0FCf090Ff5BFc78f6f465B",
          price: "0.0001",
        });
        break;
      case "317":
        CONTRACT_ADDRESSES.push({
          contract: "0xAB31eaD83CcfbC21d27E576eF8421F8Aa2bEDC7F",
          price: "0.0001",
        });
        break;
      case "318":
        CONTRACT_ADDRESSES.push({
          contract: "0xdb34a8B56913ceee7f1F7115dBAC5B635FE18538",
          price: "0.0001",
        });
        break;
      case "319":
        CONTRACT_ADDRESSES.push({
          contract: "0x64fE924D990fF946602f66e706497bE1217a882A",
          price: "0.0001",
        });
        break;
      case "320":
        CONTRACT_ADDRESSES.push({
          contract: "0x86748A4C04513171be44AC0745fa1041eE32AA72",
          price: "0.0001",
        });
        break;
      case "321":
        CONTRACT_ADDRESSES.push({
          contract: "0xd58e87fF297CFF79335641B1C904ED89541d351E",
          price: "0.0001",
        });
        break;
      case "322":
        CONTRACT_ADDRESSES.push({
          contract: "0x46FcDF8d0A5a912ec7fD71ef7710F5324B7544Ec",
          price: "0.0001",
        });
        break;
      case "323":
        CONTRACT_ADDRESSES.push({
          contract: "0x1Caa7B77140274FB5505f90049fBED80F0882362",
          price: "0.0001",
        });
        break;
      case "324":
        CONTRACT_ADDRESSES.push({
          contract: "0x6B8889AAa4b1FA8230d6833FefA1c8D3be078f06",
          price: "0.0001",
        });
        break;
      case "325":
        CONTRACT_ADDRESSES.push({
          contract: "0xa1F585fdF3b51F09535dE282D8f8D897D0962385",
          price: "0.00001",
        });
        break;
      case "326":
        CONTRACT_ADDRESSES.push({
          contract: "0x4548ec0766327e0D5ACD5c7A37A18218E2eFdB74",
          price: "0.0001",
        });
        break;
      case "327":
        CONTRACT_ADDRESSES.push({
          contract: "0xd45bf9bc86DB8F1Bc5A2EFDD0a250Ee887b310F8",
          price: "0.0001",
        });
        break;
      case "328":
        CONTRACT_ADDRESSES.push({
          contract: "0x721d2ccB75dF5532376390F016cAB825FA23FF5C",
          price: "0.00001",
        });
        break;
      case "329":
        CONTRACT_ADDRESSES.push({
          contract: "0x0a9e53F0e7E7F5611DbA1eD1CaFAA8eF78B2Ba08",
          price: "0.00001",
        });
        break;
      case "330":
        CONTRACT_ADDRESSES.push({
          contract: "0xc000De76bbCB2ecCD3A72461fa7509e0BfC8D66F",
          price: "0.0001",
        });
        break;
      case "331":
        CONTRACT_ADDRESSES.push({
          contract: "0x521B5585cd6af3407b021E101f9C9448b77BC6A6",
          price: "0.0001",
        });
        break;
      case "332":
        CONTRACT_ADDRESSES.push({
          contract: "0xe8292ea9E36d4dE2A2F682cB12E85532798B93F2",
          price: "0.0001",
        });
        break;
      case "333":
        CONTRACT_ADDRESSES.push({
          contract: "0x893de840AF2D439F34548ddEB0E5B146DB8880e8",
          price: "0.0001",
        });
        break;
      case "334":
        CONTRACT_ADDRESSES.push({
          contract: "0x5031022Ca08e525B5C80d81cf76d004e2B21c567",
          price: "0.0001",
        });
        break;
      case "335":
        CONTRACT_ADDRESSES.push({
          contract: "0xd5437eE9e7d2655a6F04F4340904266cb92f1FBE",
          price: "0.0001",
        });
        break;
      case "336":
        CONTRACT_ADDRESSES.push({
          contract: "0xe9C403FfF2A33ca0f22B7501801A11432C040Bb2",
          price: "0.0001",
        });
        break;
      case "337":
        CONTRACT_ADDRESSES.push({
          contract: "0xb3da602Ff859B40bE51fAf1BA0177a25EFe9d517",
          price: "0.0001",
        });
        break;
      case "338":
        CONTRACT_ADDRESSES.push({
          contract: "0xf87B6741c845BbCCb071CcB0F4D99d4251aC0616",
          price: "0.0001",
        });
        break;
      case "339":
        CONTRACT_ADDRESSES.push({
          contract: "0x3f4899C23E4FC469e29f0484618Eb4b746775Efe",
          price: "0.0001",
        });
        break;
      case "340":
        CONTRACT_ADDRESSES.push({
          contract: "0xD4756f7a8478775c02f6d5C4c8dCf699d7a2948C",
          price: "0.0001",
        });
        break;
      case "341":
        CONTRACT_ADDRESSES.push({
          contract: "0xC20E350DC1fFf457293b9F81B6E9d44662cC8Dce",
          price: "0.0001",
        });
        break;
      case "342":
        CONTRACT_ADDRESSES.push({
          contract: "0xC37095a7b980Df1D198656014209b91A445be2A6",
          price: "0.0001",
        });
        break;
      case "343":
        CONTRACT_ADDRESSES.push({
          contract: "0x63285AD5bEa6c7276fE96c50b186fbf3b4eFe4DC",
          price: "0.0001",
        });
        break;
      case "344":
        CONTRACT_ADDRESSES.push({
          contract: "0x7EC447b325cd5f43b7Af3DcBFE7da24a524BC8D0",
          price: "0.0001",
        });
        break;
      case "345":
        CONTRACT_ADDRESSES.push({
          contract: "0xb112aDE35f9705db184ed0176C8c4ee44CEb4ED2",
          price: "0.0001",
        });
        break;
      case "346":
        CONTRACT_ADDRESSES.push({
          contract: "0xdA82fec34E3AA8CFb1469276CD2c11b3f21A4668",
          price: "0.0001",
        });
        break;
      case "347":
        CONTRACT_ADDRESSES.push({
          contract: "0x095a8f65D1660dAaAA82405a6f6E3372d7B234ac",
          price: "0.0001",
        });
        break;
      case "348":
        CONTRACT_ADDRESSES.push({
          contract: "0x9bbd106fD88d67706bbB5148FAea7A7cCA2bd760",
          price: "0.0001",
        });
        break;
      case "349":
        CONTRACT_ADDRESSES.push({
          contract: "0x766eCeDc90ebBB7cD374c70CFdA1EC197cea79a9",
          price: "0.0001",
        });
        break;
      case "350":
        CONTRACT_ADDRESSES.push({
          contract: "0xeD686Fe922fc6521D55D135Bc5CC5a332352217B",
          price: "0.0001",
        });
        break;
      case "351":
        CONTRACT_ADDRESSES.push({
          contract: "0xA14925cBa240644fc9F62e04Fe5fC42b4D0132A0",
          price: "0.0001",
        });
        break;
      case "352":
        CONTRACT_ADDRESSES.push({
          contract: "0x913338AbE08dc2858Da1c6db3379BF9C1fD58d55",
          price: "0.0001",
        });
        break;
      case "353":
        CONTRACT_ADDRESSES.push({
          contract: "0x5F98e784e1151ee324A9E3ff6792e634DB3413ec",
          price: "0.0001",
        });
        break;
      case "354":
        CONTRACT_ADDRESSES.push({
          contract: "0x3c546d4c8D6Cd33C5cF7bb72CcEDf7D226210Bc3",
          price: "0.0001",
        });
        break;
      case "355":
        CONTRACT_ADDRESSES.push({
          contract: "0xB9c4098ee1380A7a4a75C119716A0E9d5fc54137",
          price: "0.0001",
        });
        break;
      case "356":
        CONTRACT_ADDRESSES.push({
          contract: "0x9520f2f54332A3eDB49ea479CF63b824f60365Dd",
          price: "0.0001",
        });
        break;
      case "357":
        CONTRACT_ADDRESSES.push({
          contract: "0x305fb05169adE3B533E69020fd9ddd9F8c96f684",
          price: "0.0001",
        });
        break;
      case "358":
        CONTRACT_ADDRESSES.push({
          contract: "0xa88fEe6C86465dAFa35579C57bDc503D4099AC72",
          price: "0.0001",
        });
        break;
      case "359":
        CONTRACT_ADDRESSES.push({
          contract: "0xD8dcf684d31C60F832Bf75fA89bAd0A66429a8E0",
          price: "0.0001",
        });
        break;
      case "360":
        CONTRACT_ADDRESSES.push({
          contract: "0xB2805A38658f3383599506cd93BC631d3d67e83f",
          price: "0.0001",
        });
        break;
      case "361":
        CONTRACT_ADDRESSES.push({
          contract: "0xEA27cA9F9e05fCb1910d1A3945346844751F4133",
          price: "0.0001",
        });
        break;
      case "362":
        CONTRACT_ADDRESSES.push({
          contract: "0x3a7a2B10f4ADab1972C1F704921524CFF05AcF66",
          price: "0.0001",
        });
        break;
      case "363":
        CONTRACT_ADDRESSES.push({
          contract: "0xb8cBf4Dc7D4e0333299007A7eE7062761642C81C",
          price: "0.0001",
        });
        break;
      case "364":
        CONTRACT_ADDRESSES.push({
          contract: "0x5F7385cB7859C86D002188d1e812eD6Ea668BDe4",
          price: "0.0001",
        });
        break;
      case "365":
        CONTRACT_ADDRESSES.push({
          contract: "0x92Fa9B587B49e35921Ee5B0c318d0d5B5180Dc4b",
          price: "0.0001",
        });
        break;
      case "366":
        CONTRACT_ADDRESSES.push({
          contract: "0x2988066CAb8702fB92982CC3afe8d3781ba349CA",
          price: "0.0001",
        });
        break;
      case "367":
        CONTRACT_ADDRESSES.push({
          contract: "0xc13146D59f371E25E7638ff9F94BD55f3B1aDe6E",
          price: "0.00001",
        });
        break;
      case "368":
        CONTRACT_ADDRESSES.push({
          contract: "0x606f42eE05A4ef7E53e1D1cAa9663A1727cd6dFD",
          price: "0.00001",
        });
        break;
      case "369":
        CONTRACT_ADDRESSES.push({
          contract: "0xfd30724c6D0a6753Ef5c3b7dbC56Da05794c9149",
          price: "0.0001",
        });
        break;
      case "370":
        CONTRACT_ADDRESSES.push({
          contract: "0x6db929329D290e294f0B2138E8FD2f28cb57f77C",
          price: "0.0001",
        });
        break;
      case "371":
        CONTRACT_ADDRESSES.push({
          contract: "0xFe2e625C91906BBE5bb36cE13534F4d8B156fC18",
          price: "0.0001",
        });
        break;
      case "372":
        CONTRACT_ADDRESSES.push({
          contract: "0x2F45c911a710e182DCE3ea1c1983cD4caA0a91D8",
          price: "0.0001",
        });
        break;
      case "373":
        CONTRACT_ADDRESSES.push({
          contract: "0xA16ff5FC572F28a5beb3f210cE89ead70BA912D4",
          price: "0.0001",
        });
        break;
      case "374":
        CONTRACT_ADDRESSES.push({
          contract: "0x8Ab6cB75a0957BFD834eF168975C492934F9418c",
          price: "0.0001",
        });
        break;
      case "375":
        CONTRACT_ADDRESSES.push({
          contract: "0xa923Fbf21Eb2FA379D3871d56E0688BE2c22200b",
          price: "0.0001",
        });
        break;
      case "376":
        CONTRACT_ADDRESSES.push({
          contract: "0x045FDC63A12c17c2fD0E371C8B9595A75Ddf599E",
          price: "0.0001",
        });
        break;
      case "377":
        CONTRACT_ADDRESSES.push({
          contract: "0xe7a4EDa723F9a319B304645023b2C208cC209deB",
          price: "0.0001",
        });
        break;
      case "378":
        CONTRACT_ADDRESSES.push({
          contract: "0xf052bF819CCf02B4223c58594eAC1fE23b8d74cf",
          price: "0.0001",
        });
        break;
      case "379":
        CONTRACT_ADDRESSES.push({
          contract: "0xe071DE8A879EE30CbBB6b2E32BB68947BAb12547",
          price: "0.0001",
        });
        break;
      case "380":
        CONTRACT_ADDRESSES.push({
          contract: "0xc26B6853a5bbCE93Bf8159402D2cFCB185170139",
          price: "0.0001",
        });
        break;
      case "381":
        CONTRACT_ADDRESSES.push({
          contract: "0xBa17179de038bd7417BF0457C26A4464C2099772",
          price: "0.0001",
        });
        break;
      case "382":
        CONTRACT_ADDRESSES.push({
          contract: "0x2791910C326BEAfB73f86D9A2F49De17c43B2600",
          price: "0.0001",
        });
        break;
      case "383":
        CONTRACT_ADDRESSES.push({
          contract: "0x94784a0C874192f2b3473E37c4f73F083514c93b",
          price: "0.0001",
        });
        break;
      case "384":
        CONTRACT_ADDRESSES.push({
          contract: "0x898c78C3417e8e39c4b6A4D2B408E1240c716fa0",
          price: "0.0001",
        });
        break;
      case "385":
        CONTRACT_ADDRESSES.push({
          contract: "0xFc556296b7EED7aF3F4140aB2881856c795AcB93",
          price: "0.0001",
        });
        break;
      case "386":
        CONTRACT_ADDRESSES.push({
          contract: "0x218E58E6F799f1C902dC22da6A0d23e195D85136",
          price: "0.00001",
        });
        break;
      case "387":
        CONTRACT_ADDRESSES.push({
          contract: "0x3f335Dd1D1935233d25264fB016Ca359D19af0D2",
          price: "0.0001",
        });
        break;
      case "388":
        CONTRACT_ADDRESSES.push({
          contract: "0x58cb21CAf20dE355Ce638A767EB351DF5a8f621A",
          price: "0.0001",
        });
        break;
      case "all":
        CONTRACT_ADDRESSES.push(
          {
            contract: "0xb9bbfc6030b4d3876b90c0f76e8559a020ed4246",
            price: "0.001",
          },
          {
            contract: "0x88bad6f1f4e32e270ac879452bcad9e3f11aeb1e",
            price: "0.0007",
          },
          {
            contract: "0xd7637c422233db03b379bdc68374d8bf40731b6a",
            price: "0.001",
          },
          {
            contract: "0x6e35194aaa456f6ca840f95ee5ef101c9f491d5c",
            price: "0.000",
          },
          {
            contract: "0xb8027dca96746f073896c45f65b720f9bd2afee7",
            price: "0.000",
          }
        );
        break;
    }
  });

  console.log("Số lượng contract", CONTRACT_ADDRESSES.length);
  let countFee = 0;
  CONTRACT_ADDRESSES.forEach((a) => {
    countFee += Number(a.price);
  });
  console.log("Số ETH sẽ tiêu tốn (chưa tính fee gas)", countFee);
  const contract1=[
    "0xb8027dca96746f073896c45f65b720f9bd2afee7",
    "0x6e35194aaa456f6ca840f95ee5ef101c9f491d5c",
    "0xd7637c422233db03b379bdc68374d8bf40731b6a",
    "0x88bad6f1f4e32e270ac879452bcad9e3f11aeb1e",
    "0xb9bbfc6030b4d3876b90c0f76e8559a020ed4246",
  ]

  for (const CONTRACT_ADDRESS of CONTRACT_ADDRESSES) {
    for (let i = 0; i < wallets.length; i++) {
      console.log("Ví thứ", i + 1);
      const [address, privateKey] = wallets[i].split("|");
      try {
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const wallet = new ethers.Wallet(privateKey, provider);
        if ([contract1].some((a) => a === CONTRACT_ADDRESS.contract)) {
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS.contract,
            ABI,
            wallet
          );

          const tx = await await contract.claim(
            address, // _receiver
            1, // _quantity
            "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", // _currency (ETH)
            ethers.parseEther(CONTRACT_ADDRESS.price), // _pricePerNFT
            {
              proof: [],
              quantityLimitPerWallet: 0,
              pricePerToken: 0,
              currency: "0x0000000000000000000000000000000000000000",
            },
            "0x",
            {
              value: ethers.parseEther(CONTRACT_ADDRESS.price),
            }
          );

          console.log("Minting... Tx hash:", tx.hash);
          await tx.wait();
          console.log("✅ Minted successfully!");
        } else {
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS.contract,
            ABI_1,
            wallet
          );

          const tx = await contract.mint(1, {
            value: ethers.parseEther(CONTRACT_ADDRESS.price),
          });

          console.log("Minting... Tx hash:", tx.hash);
          await tx.wait();
          console.log("✅ Minted successfully!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  rl.close();
}

main().catch(console.error);
