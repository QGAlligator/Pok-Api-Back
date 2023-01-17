const { model, Schema } = require("mongoose");

const fightSchema = new Schema({
  dressors: [],
  winner: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Fight", fightSchema, "fight");
