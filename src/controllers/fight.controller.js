const User = require("../models/user.model");
const Fight = require("../models/fight.model");

const patch = async (req, res) => {
  try {
    const user = req.user;

    const room = await Fight.findById("63c4687f03ecf0fcde343b08");
    room.dressors.push(user.pokefight);

    await room.save();

    res.status(200).json({
      room: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const fighting = async (req, res) => {
  try {
    const user = req.user;

    const room = await Fight.findById("63c4687f03ecf0fcde343b08");

    let index = 0;
    index = Math.floor(Math.random() * room.dressors.length);
    console.log("INDEX ==================" + index);

    let trainer = room.dressors[index];
    console.log(trainer[1]);

    let i = user.pokefight.length - 1;
    let j = trainer.length - 1;

    let ii = 0;
    let jj = 0;

    while (true) {
      trainer[jj].hp -= user.pokefight[ii].atk / (1 + trainer[jj].def * 0, 01);
      console.log("HP =======" + trainer[jj].hp);
      if (trainer[jj].hp <= 0) {
        if (j == jj) {
          room.winner = user.login;
          await room.save();
          user.coin += 1;
          await user.save();
          break;
        } else {
          jj++;
        }
      }
      user.pokefight[ii].hp -=
        trainer[jj].atk / (1 + user.pokefight[ii].def * 0, 01);
      if (user.pokefight[ii].hp <= 0) {
        if (i == ii) {
          room.winner = "63c4687f03ecf0fcde343b08";
          await room.save();
          break;
        } else {
          ii++;
        }
      }
    }

    res.status(200).json({
      winner: room.winner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

module.exports = {
  fighting,
  patch,
};
