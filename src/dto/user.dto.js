const User = require("../models/user.model");

const dtoUserGet = async (req, res, next) => {
  try {
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

const dtoCoinPatch = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body.coin;

    if (typeof data !== "number") {
      res.status(401).json({ coin: "Coin is a number" });
      return;
    }

    if (user.coin + data < 0) {
      res.status(401).json({ coin: "You don't have enough coin" });
      return;
    }
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

const dtoPokemonsPatch = async (req, res, next) => {
  try {
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

const dtoAddPokefight = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body.pokefight;

    if (user.pokefight.length >= 4) {
      res.status(401).json({
        pokefight: "You can't have more than 4 pokemons in your teams",
      });
      return;
    }

    if (user.pokefight.find((pokm) => pokm.id === data.id)) {
      res.status(401).json({
        pokefight: "You can't have the same pokemon twice",
      });
      return;
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

const dtoRmPokefight = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body.pokefight;

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

module.exports = {
  dtoUserGet,
  dtoCoinPatch,
  dtoPokemonsPatch,
  dtoAddPokefight,
  dtoRmPokefight,
};
