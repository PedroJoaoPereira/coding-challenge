const mongoose = require("mongoose");
const request = require("supertest-as-promised");
const httpStatus = require("http-status");
const chai = require("chai"); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require("../../index");

chai.config.includeStack = true;

after(done => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe("## Country APIs", () => {
  let country = {
    name: "Afghanistan",
    alpha2Code: "AF"
  };

  describe("# POST /api/countries", () => {
    it("should create a new country", done => {
      request(app)
        .post("/api/countries")
        .send(country)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal(country.name);
          expect(res.body.alpha2Code).to.equal(country.alpha2Code);
          country = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/countries/:countryId", () => {
    it("should get country details", done => {
      request(app)
        .get(`/api/countries/${country._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal(country.name);
          expect(res.body.alpha2Code).to.equal(country.alpha2Code);
          done();
        })
        .catch(done);
    });

    it("should report error with message - Not found, when country does not exists", done => {
      request(app)
        .get("/api/countries/56c787ccc67fc16ccc1a5e92")
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal("Not Found");
          done();
        })
        .catch(done);
    });
  });

  describe("# PUT /api/countries/:countryId", () => {
    it("should update country details", done => {
      country.name = "AG";
      request(app)
        .put(`/api/countries/${country._id}`)
        .send(country)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal("AG");
          expect(res.body.alpha2Code).to.equal(country.alpha2Code);
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/countries/", () => {
    it("should get all countries", done => {
      request(app)
        .get("/api/countries")
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });
  });

  describe("# DELETE /api/countries/", () => {
    it("should delete country", done => {
      request(app)
        .delete(`/api/countries/${country._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal("AG");
          expect(res.body.alpha2Code).to.equal(country.alpha2Code);
          done();
        })
        .catch(done);
    });
  });
});
