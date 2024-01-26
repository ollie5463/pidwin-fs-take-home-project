import User from "../models/user.js";
import Transactions from "../models/transactions.js";

const wagerHistory = async (req, res) => {
  const userId = req.userId;
  try {
    let user = await User.findById(userId);
    if(!!user) {
     let transactions = await Transactions.find({ user_id: userId }).sort("-time").limit(10);
     res.status(200).json({ transactions })
    } else {
      res.status(404).json({ message: "User doesn't exist" });
    }

  } catch(err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export default wagerHistory;