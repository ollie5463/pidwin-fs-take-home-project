import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import userRouter from "./src/api/user.js";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 8000;

let listener;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    listener = app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
  )
  .catch((error) => console.error(error.message));

  export { listener };
  export default app;