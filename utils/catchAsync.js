const { findOneAndUpdate } = require("../models/campground");

module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
