import User from "../models/user.js";

const wager = async (req, res) => {

  const { choice } = req.body;
  const wagerCost = 5;
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
    let isValidWager = Math.sign(user.tokens - wagerCost) === 1;

    if(isValidWager) {
      user.tokens -= wagerCost;
      await user.save();

      let isWin = isWinningChoice(choice, choiceMapping);

      if(isWin) {
        user.tokens += 10;
        await user.save();
      };
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
  return !!choiceMapping[choice];
}

function isWinningChoice(choice, choiceMapping) {
  const randomChoice = Math.round(Math.random());
  if(choiceMapping[choice] == randomChoice){
    return true;
  };
  return false;
}

export default wager;