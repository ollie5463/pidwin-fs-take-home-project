import app, { listener } from "../../index";
import supertest from "supertest";
import { jwtDecode } from "jwt-decode";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("Wager tests", () => {
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

    describe("And the user wagers", () => {
      let wagerResult;
      beforeAll(async () => {
        userCreationResult = await supertest(app).post("/api/user/wager")
          .set({'Authorization': `Bearer ${userCreationResult.body.token}`})
          .send({ choice: "heads", tokens: 5 });
      });

      it("Should change their balance accordingly", () => {
        // A bit hacky but havent mocked the win/non win behaviour
        const { isWin, tokens } = userCreationResult.body

        const expectedTokens = isWin ? 105 : 95;

        expect(tokens).toEqual(expectedTokens);
      })
    });
  });
});