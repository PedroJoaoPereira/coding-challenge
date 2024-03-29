const mongoose = require("mongoose");
const util = require("util");

const config = require("./config/config");
const app = require("./config/express");

const debug = require("debug")("express-mongoose-es6-rest-api:index");

Promise = require("bluebird"); // eslint-disable-line no-global-assign

mongoose.Promise = Promise;

const mongoUri = config.mongo.host;
mongoose.connect(
  mongoUri,
  { server: { socketOptions: { keepAlive: 1 } } }
);
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

if (config.mongooseDebug) {
  mongoose.set("debug", (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

module.exports = app;
