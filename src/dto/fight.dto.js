const User = require("../models/user.model");
const Room = require("../models/fight.model");

const dtoFighting = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.pokefight === undefined) {
      res
        .status(401)
        .json({ pokefight: "You must chose one or more pokemon to fight" });
      return;
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

module.exports = {
  dtoFighting,
};
