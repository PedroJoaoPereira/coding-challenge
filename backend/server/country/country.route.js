const express = require("express");
const validate = require("express-validation");
const expressJwt = require("express-jwt");
const paramValidation = require("../../config/param-validation");
const countryCtrl = require("./country.controller");
const config = require("../../config/config");

const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/countries - Get list of countries */
  .get(countryCtrl.list)

  /** POST /api/countries - Create new country */
  .post(
    validate(paramValidation.createCountry),
    expressJwt({ secret: config.jwtSecret }),
    countryCtrl.create
  );

router
  .route("/:countryId")
  /** GET /api/countries/:countryId - Get country */
  .get(countryCtrl.get)

  /** PUT /api/countries/:countryId - Update country */
  .put(
    validate(paramValidation.updateCountry),
    expressJwt({ secret: config.jwtSecret }),
    countryCtrl.update
  )

  /** DELETE /api/countries/:countryId - Delete country */
  .delete(expressJwt({ secret: config.jwtSecret }), countryCtrl.remove);

/** Load country when API with countryId route parameter is hit */
router.param("countryId", countryCtrl.load);

module.exports = router;
