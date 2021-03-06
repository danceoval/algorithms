//bottom up
//time complexity: 0(amount*coins.length)
//space complexity: 0(amount)

var coinChange = function (coins, amount) {
  let res = Array(amount + 1).fill(amount + 1);
  res[0] = 0;

  for (let c of coins) {
    for (let i = c; i < res.length; i++) {
      res[i] = Math.min(res[i], res[i - c] + 1);
      //recurance relation^
    }
  }
  return res[amount] == amount + 1 ? -1 : res[amount];
};

//top down with memoization:

var coinChange = function (coins, amount) {
  let memo = new Map();

  function dp(amount) {
    if (amount == 0) return 0;
    if (amount < 0) return -1;
    if (memo.has(amount)) return memo.get(amount);

    let res = Number.MAX_SAFE_INTEGER;
    for (let c of coins) {
      let q = dp(amount - c);
      if (q == -1) continue;
      res = Math.min(q + 1, res);
    }

    res = res == Number.MAX_SAFE_INTEGER ? -1 : res;
    memo.set(amount, res);
    return res;
  }

  return dp(amount);
};

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let total = amount;
  let least = Infinity;
  const memo = {};

  if (amount === 0) {
    return 0;
  }

  //sort coins
  coins.sort((a, b) => a - b);

  //if smallest coin is greater than amount after sorting
  if (coins[0] > amount) {
    return -1;
  }

  function recursive(total, count, goldCoins) {
    //if we've hit 0, then we update our least coins required
    if (total === 0) {
      least = Math.min(count, least);
      return true;
    }
    //if the amount isnt divisible by remaining coin
    //or if there are no coins left and we still have money
    if (
      (goldCoins.length === 1 && total % goldCoins[0] !== 0) ||
      (goldCoins.length === 0 && total > 0)
    ) {
      return false;
    }

    //if total is divisible by largest coin
    if (goldCoins[goldCoins.length - 1] <= total) {
      recursive(total - goldCoins[goldCoins.length - 1], count + 1, goldCoins);
    }
    //we should always check this alternate case;
    const cutCoins = goldCoins.slice(0, goldCoins.length - 1);
    recursive(total, count, cutCoins);
  }
  recursive(total, 0, coins);

  return least === Infinity ? -1 : least;
};
