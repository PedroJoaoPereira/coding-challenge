const Country = require("./country.model");

function load(req, res, next, id) {
  Country.get(id)
    .then(country => {
      req.country = country; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.country);
}

function create(req, res, next) {
  const country = new Country({
    name: req.body.name,
    alpha2Code: req.body.alpha2Code
  });

  country
    .save()
    .then(savedCountry => res.json(savedCountry))
    .catch(e => next(e));
}

function update(req, res, next) {
  const country = req.country;
  country.name = req.body.name;
  country.alpha2Code = req.body.alpha2Code;

  country
    .save()
    .then(savedCountry => res.json(savedCountry))
    .catch(e => next(e));
}

function list(req, res, next) {
  Country.list()
    .then(countries => res.json(countries))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const country = req.country;
  country
    .remove()
    .then(deletedCountry => res.json(deletedCountry))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
