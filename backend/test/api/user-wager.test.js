// const { MongoMemoryServer } = require("mongodb-memory-server");
import { MongoClient } from "mongodb";
// const router = require("../../src/api/user");
import { MongoMemoryServer } from "mongodb-memory-server";
// Change this to ESM

describe("Test my mongo code", () => {
  let con;
  let mongoServer;

  beforeAll(async () =>{
    mongoServer = await MongoMemoryServer.create();
    con = await MongoClient.connect(mongoServer.getUri(), {});
  });

  it("should pass", () => {
    expect(true).toBe(true);
  })
});