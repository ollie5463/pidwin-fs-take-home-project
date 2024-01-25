import User from "../models/user.js";
import Transactions from "../models/transactions.js";

const wager = async (req, res) => {
  const { choice, tokens: wager } = req.body;

  const choiceMapping = {
    "tails": 0,
    "heads": 1
  };

  if(!isValidChoice(choice, choiceMapping)) {
    return res.status(400).json({ message: "Incorrect choice" });
  }
  const userId = req.userId;
  console.log("choice: ", choice);

  try {
    let user = await User.findById(userId);
    let isValidWager = Math.sign(user.tokens - wager) === 1;
    console.log("user.tokens: ", user.tokens)
    console.log("wager: ", wager);

    if(isValidWager) {
      user.tokens -= wager;
      await user.save();

      let isWin = isWinningChoice(choice, choiceMapping);
      await Transactions.create({
        user_id: userId,
        is_win: isWin,
        time: Date.now()
      });
      // @TODO: Add choice!

      let consecutiveWins = await getConsecutiveWins(userId);
      console.log("consecutiveWins: ", consecutiveWins);

      let bonusAmount = getBonusAmount(consecutiveWins, wager);

      if(isWin) {
        user.tokens += bonusAmount || wager * 2 ;
        await user.save();
        console.log("Win Amount:", bonusAmount || wager * 2);
      };
      console.log("bonusAmount:", bonusAmount);
      

      // Add win amount

      res.status(200).json({ isWin, tokens: user.tokens });

    } else {
      return res.status(400).json({ message: "Insufficient funds" });
    }


    console.log(user);
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }

};

function isValidChoice(choice, choiceMapping){
  return !(choiceMapping[choice] === undefined);
}

function isWinningChoice(choice, choiceMapping) {
  const randomChoice = Math.round(Math.random());
  if(choiceMapping[choice] == randomChoice){
    return true;
  };
  return false;
}

function getBonusAmount(consecutiveWins, wager) {
  if(consecutiveWins === 0) {
    return 0
  } else if(consecutiveWins % 5 === 0) {
    console.log("consecutiveWins % 5 === 0", consecutiveWins % 5 === 0);
      return wager * 10;
  } else if (consecutiveWins === 3 || consecutiveWins % 5 % 3 === 0) {
      return wager * 3;
  }
  return 0;
}

async function getConsecutiveWins(userId) {
  let transactions = await Transactions.find({ user_id: userId });
  transactions = transactions.sort((a, b) => a - b ).reverse();
  let consecutiveWins = transactions.findIndex((transaction) => transaction.is_win === false);
  return consecutiveWins;
}

export default wager;