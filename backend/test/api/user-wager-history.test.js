import app, { listener } from "../../index";
import supertest from "supertest";
import { jwtDecode } from "jwt-decode";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("Wager History tests", () => {
  let mongoServer;
  let uri;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({ instance: { port: 27018 } });
    uri = mongoServer.getUri();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
    await listener.close()
  });


  describe("When a user signs up", () => {
    let userCreationResult;
    beforeAll(async () => {
      userCreationResult = await supertest(app).post("/api/user/signup").send({ 
        email: "bannisteroliver@gmail.com",
        password: "password1234", 
        confirmPassword: "password1234", 
        firstName: "oliver", 
        lastName: "bannister"
       });
    })
    it("Should give the user 100 tokens", async () => {
         let jwt = userCreationResult.body.token;
         let {tokens} = jwtDecode(jwt);

         expect(userCreationResult.status).toBe(200);
         expect(tokens).toBe(100);

    });

    describe("And the user wagers 10 times", () => {
      beforeAll(async () => {
        let wagers = [];
        for(let i = 0; i < 10; i++){
          wagers.push(supertest(app).post("/api/user/wager")
          .set({'Authorization': `Bearer ${userCreationResult.body.token}`})
          .send({ choice: "heads", tokens: 5 }))
        }
        await Promise.all(wagers);
      });

      describe("And a request get the wager history is made", () => {
        let wagerHistoryResults;
        beforeAll(async () => {
          wagerHistoryResults = await supertest(app).get("/api/user/wager/history")
            .set({'Authorization': `Bearer ${userCreationResult.body.token}`});
        });

        it("It should be added to their wager history", () => {
          expect(wagerHistoryResults.status).toEqual(200);
          expect(wagerHistoryResults.body.transactions.length).toEqual(10);
        })
      });
    });
  });
});