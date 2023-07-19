module.exports.sequelizeUniqueConflictHandler = async (err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).send({ errors: err.errors });
  }

  next(err);
};

module.exports.basicHandler = async (err, req, res, next) => {
  res.status(500).send({ errors: ['Error happened'] });
};
