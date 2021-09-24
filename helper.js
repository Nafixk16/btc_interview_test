const readline = require("readline");
const axios = require('axios').default
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

exports.askQuestion = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      readline.moveCursor(process.stdout, 0, -2);
      resolve(answer)
    })
  })
}

exports.showText = async (text) => {
  await this.fetchCurrentBTC()
  readline.cursorTo(process.stdout, 0);
  console.log(`Admin Balance:  100BTC \t Current BTC:${global.CURRENT_BTC}  \t`, `User Balance: $50000000`);
  console.log('************************************************************************************');
  console.log('Press Option 1 for buying (buyer), Press Option 2 for selling (admin)');
  console.log('************************************************************************************');
  rl.prompt(true);
}

exports.fetchCurrentBTC = async () => {
  try {
    const url = `${process.env.BINANCE_BASE_URL}/api/v3/avgPrice?symbol=BTCUSDT`;
    const data = await axios.get(url);
    const { price } = data.data;
    global.CURRENT_BTC = price || 0;
    return price || 0;
  } catch (error) {
    console.error(error)
    return null;
  }
}

exports.isPriceBetween5Percent = (price) => {
  const fivePercent = global.CURRENT_BTC * 0.05;
  const belowPrice = global.CURRENT_BTC - fivePercent;
  const abovePrice = Number(global.CURRENT_BTC) + Number(fivePercent);
  if (price <= abovePrice && price >= belowPrice) {
    return true
  }
  return false;
}

exports.readSellerAmount = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('seller.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      resolve(data);
    })
  })
}


exports.storeSellerAmount = (content) => {
  fs.writeFileSync('seller.txt', content, { encoding: 'utf8', flag: 'w' })
}