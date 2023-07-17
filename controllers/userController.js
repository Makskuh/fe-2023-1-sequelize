module.exports.createUser = (req, res) => {
  res.send(req.body);
};

module.exports.getUsers = (req, res) => {};

module.exports.getUser = (req, res) => {};

module.exports.updateUser = (req, res) => {};

module.exports.deleteUser = (req, res) => {
  const {
    params: { userId },
  } = req;

  res.send(`user ${userId} is deleted`);
};
