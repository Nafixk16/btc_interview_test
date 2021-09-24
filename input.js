const readline = require("readline")
const { askQuestion, isPriceBetween5Percent, showText, storeSellerAmount, readSellerAmount } = require('./helper');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const init = async () => {
  while (true) {
    showText();
    const answer = await askQuestion('');
    if (answer == 1) await buyPrice();
    if (answer == 2) await sellPrice();
  }

}

const buyPrice = async () => {
  const price = await askQuestion('Enter buy price =');
  const flag = isPriceBetween5Percent(price);
  if (!flag) {
    return console.log(`Price Must be Between 5% above or below of ${global.CURRENT_BTC}\n`)
  }
  const amounts = await readSellerAmount();
  if (amounts == price) {
    console.log('\n\norder executed, balanced updated\n\n');
  }
}

const sellPrice = async () => {
  const price = await askQuestion('Enter sell price =');
  const flag = isPriceBetween5Percent(price);
  if (!flag) {
    return console.log(`Price Must be Between 5% above or below of ${global.CURRENT_BTC}`)
  }
  storeSellerAmount(price);
}

const main = async () => {
  init()
}

main()
