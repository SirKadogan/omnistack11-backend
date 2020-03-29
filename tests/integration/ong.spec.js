const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");
describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ong ", async () => {
    try {
      const response = await request(app)
        .post("/ongs")
        .send({
          name: "NewOng",
          email: "contato@hotmail.com.br",
          whatsapp: "00000000000",
          city: "Rio do Sul",
          uf: "SC"
        });
      // console.log("response", response.body);
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toHaveLength(8);
    } catch (error) {
      console.log(error);
    }
  });
});
