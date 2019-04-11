const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  alpha2Code: {
    type: String,
    required: true,
    match: [
      /^[A-Z]{2}$/,
      "The value of path {PATH} ({VALUE}) is not a valid country code."
    ]
  }
});

CountrySchema.method({});
CountrySchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then(country => {
        if (country) {
          return country;
        }
        const err = new APIError(
          "No such country exists!",
          httpStatus.NOT_FOUND
        );
        return Promise.reject(err);
      });
  },

  list() {
    return this.find()
      .sort({ createdAt: -1 })
      .exec();
  }
};

module.exports = mongoose.model("Country", CountrySchema);
