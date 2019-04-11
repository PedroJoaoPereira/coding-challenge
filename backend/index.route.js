const express = require("express");
const countryRoutes = require("./server/country/country.route");
const authRoutes = require("./server/auth/auth.route");

const router = express.Router(); // eslint-disable-line new-cap

router.get("/health-check", (req, res) => res.send("OK"));

router.use("/countries", countryRoutes);
router.use("/auth", authRoutes);

module.exports = router;
