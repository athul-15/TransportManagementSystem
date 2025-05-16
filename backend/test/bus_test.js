const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Bus CRUD API", function () {
  this.timeout(10000);

  let token;
  let createdBusId;

  // Login as admin before tests
  before(async () => {
    const res = await chai.request(server).post("/api/auth/login").send({
      email: "achu@gmail.com",   //  use a real admin
      password: "achu",         //  and the correct password
    });

    expect(res).to.have.status(200);
    token = res.body.token;
  });

  //  CREATE
  it("POST /api/buses - should create a new bus", async () => {
    const newBus = {
      busNumber: "BN-1001",
      from: "Brisbane",
      to: "Sydney",
      departureTime: "10:00",
      date: "2025-05-10",
      seatsAvailable: 40,
    };

    const res = await chai
      .request(server)
      .post("/api/buses")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTgwYTRmZjdmNjViYTIwYzM2MzE5NiIsImlhdCI6MTc0MzUxODUwNywiZXhwIjoxNzQ0MTIzMzA3fQ.3AeW76FvtdFr0cEjadlprqArE13fNS1a1XROyG8i48o") // 👈 Add token
      .send(newBus);

    expect(res).to.have.status(201);
    createdBusId = res.body._id;
  });

  //  READ
  it("GET /api/buses - should return all buses", async () => {
    const res = await chai.request(server).get("/api/buses");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });

  //  UPDATE
  it("PUT /api/buses/:id - should update the bus", async () => {
    const updates = {
      departureTime: "11:30",
      seatsAvailable: 35,
    };

    const res = await chai
      .request(server)
      .put(`/api/buses/${createdBusId}`)
      .set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTgwYTRmZjdmNjViYTIwYzM2MzE5NiIsImlhdCI6MTc0MzUxODUwNywiZXhwIjoxNzQ0MTIzMzA3fQ.3AeW76FvtdFr0cEjadlprqArE13fNS1a1XROyG8i48o") // 👈 Add token
      .send(updates);

    expect(res).to.have.status(200);
  });

  //  DELETE
  it("DELETE /api/buses/:id - should delete the bus", async () => {
    const res = await chai
      .request(server)
      .delete(`/api/buses/${createdBusId}`)
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTgwYTRmZjdmNjViYTIwYzM2MzE5NiIsImlhdCI6MTc0MzUxODUwNywiZXhwIjoxNzQ0MTIzMzA3fQ.3AeW76FvtdFr0cEjadlprqArE13fNS1a1XROyG8i48o"); // 👈 Add token

    expect(res).to.have.status(200);
  });
});
