const User = require("../models/user.model");
const axios = require("axios");

const getUser = async (req, res) => {
  try {
    const user = req.user;

    console.log(user);
    res.status(200).json({
      username: user.login,
      coin: user.coin,
      pokemons: user.pokemons,
    });
  } catch (error) {
    res.status(500).send("An error has occured");
  }
};

const patchCoin = async (req, res) => {
  try {
    const user = req.user;

    const data = req.body.coin;

    user.coin += data;

    await user.save();

    console.log(user);
    res.status(200).json({
      coin: user.coin,
    });
  } catch (error) {
    res.status(500).send("An error has occured");
  }
};

const patchPokemons = async (req, res) => {
  try {
    const user = req.user;
    const total = req.body.total;

    let newPokemon = {};
    let idp = "";
    let namep = "";
    let id = 0;
    id = Math.floor(Math.random() * total);
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=" + id + "&limit=1")
      .then((res) => res.data)
      .then((data) => {
        console.log("data " + JSON.stringify(data));
        idp = data.results[0].url.split("/")[6];
        console.log("bloquer01");
        namep = data.results[0].name;
        return { data, idp, namep };
      })
      .then(({ data, idp, namep }) =>
        axios
          .get(data.results[0].url)
          .then((res) => res.data)
          .then((data) => {
            console.log("bloquer1");
            if (data.types[1]) {
              newPokemon = {
                id: idp,
                name: namep,
                type1: data.types[0].type.name,
                type2: data.types[1]?.type?.name,
                hp: data.stats[0].base_stat,
                atk: data.stats[1].base_stat,
                def: data.stats[2].base_stat,
                atksp: data.stats[3].base_stat,
                defsp: data.stats[4].base_stat,
                spd: data.stats[5].base_stat,
              };
            } else {
              newPokemon = {
                id: idp,
                name: namep,
                type1: data.types[0].type.name,
                hp: data.stats[0].base_stat,
                atk: data.stats[1].base_stat,
                def: data.stats[2].base_stat,
                atksp: data.stats[3].base_stat,
                defsp: data.stats[4].base_stat,
                spd: data.stats[5].base_stat,
              };
            }
          })
          .then(async () => {
            console.log("bloquer2");
            user.pokemons.push(newPokemon);

            await user.save();

            console.log(user);
            res.status(200).json({
              pokemons: user.pokemons,
            });
          })
      )
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

module.exports = {
  getUser,
  patchCoin,
  patchPokemons,
};
