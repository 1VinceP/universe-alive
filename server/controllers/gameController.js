const Game = require('../models/gameModel');

module.exports = {
   getAllGames: async (_, res) => {
      try {
         const games = await Game.find();
         res.status(200).send(games);
      } catch (error) {
         res.status(400).send(error);
      }
   },

   getUserGames: async (req, res) => {
      const { id } = req.params;
      try {
         const games = await Game.find({
            $or: [{ owner_id: id }, { 'players.uid': id }],
         });
         res.status(200).send(games);
      } catch (error) {
         res.status(400).send(error);
      }
   },

   getGameByGameKey: async (req, res) => {
      const { key } = req.params;
      try {
         const game = await Game.findOne({ game_key: key });
         res.status(200).send(game);
      } catch (error) {
         res.status(400).send(error);
      }
   },

   createGame: async (req, res) => {
      try {
         const game = new Game({ ...req.body });
         const newGame = await game.save();
         res.status(200).send(newGame);
      } catch (error) {
         res.status(400).send(error);
      }
   },
};
