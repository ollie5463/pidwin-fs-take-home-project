// const { MongoMemoryServer } = require("mongodb-memory-server");
import mongoose from "mongoose";
// const router = require("../../src/api/user");
import app from "../../index";
import supertest, {request} from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
// Change this to ESM

describe("Wager tests", () => {
  let mongoServer;

  // let con;
  // let mongoServer;
  let uri;

  beforeAll(async () =>{
    // mongoServer = await MongoMemoryServer.create();
    mongoServer = await MongoMemoryServer.create({ instance: { port: 27018 } });
    uri = mongoServer.getUri();
    console.log(uri)

    // mongo = await MongoMemoryServer.create();
    // const uri = mongo.getUri();
   
    // await mongoose.connect(uri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    // process.env.MONGODB_URL=uri
    // con = await mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true })
  });

  it("should pass", async () => {


    await supertest(app).post("/api/user/signup").send({ 
      email: "bannisteroliver@gmail.com",
      password: "password1234", 
      confirmPassword: "password1234", 
      firstName: "oliver", 
      lastName: "bannister"
     }).expect(200)
    // await supertest(router).post("/api/user/wager").send(
    //   {
    //     "choice": "heads",
    //     "tokens": 10
    // }
    //  )
    expect(true).toBe(true);
  }, 10000)
});