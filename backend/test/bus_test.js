const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Bus API Tests", () => {
  it("GET /api/buses - should return all buses", (done) => {
    chai
      .request(server)
      .get("/api/buses")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("POST /api/auth/register - should register a new user", (done) => {
    chai
      .request(server)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "test123"
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("token");
        done();
      });
  });
});
