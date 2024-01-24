import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  user_id: { type: String },
  is_win: { type: Boolean },
  time: { type: Number },
  choice: { type: String }
});

export default mongoose.model("Transactions", transactionSchema);