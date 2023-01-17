const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  login: String,
  password: String,
  coin: Number,
  pokemons: [{}],
  pokefight: [{}],
  isFigthing: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema, "users");
