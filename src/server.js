const express = require("express");
const cors = require("cors");

require("./database/index");

const { registerUser, loginUser } = require("./controllers/logreg.controller");
const { dtoUserRegister, dtoUserLogin } = require("./dto/logreg.dto");

const {
  getUser,
  patchCoin,
  patchPokemons,
  addPokefight,
  rmPokefight,
} = require("./controllers/user.controller");
const {
  dtoCoinPatch,
  dtoUserGet,
  dtoPokemonsPatch,
  dtoAddPokefight,
  dtoRmPokefight,
} = require("./dto/user.dto");

const { fighting, patch } = require("./controllers/fight.controller");
const { dtoFighting } = require("./dto/fight.dto");

const isAuth = require("./middlewares/auth.middleware");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// USER
app.post("/register", dtoUserRegister, registerUser);
app.post("/login", dtoUserLogin, loginUser);

app.get("/user", isAuth, dtoUserGet, getUser);
app.patch("/c", isAuth, dtoCoinPatch, patchCoin);
app.patch("/p", isAuth, dtoPokemonsPatch, patchPokemons);
app.patch("/pf", isAuth, dtoAddPokefight, addPokefight);
app.patch("/pfr", isAuth, dtoRmPokefight, rmPokefight);

app.get("/f", isAuth, dtoFighting, fighting);
app.get("/t", isAuth, patch);

app.listen(3030, () => {
  console.log("Server running");
});
