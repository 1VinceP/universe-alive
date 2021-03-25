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
            $or: [{ ownerId: id }, { 'players.uid': id }],
         });
         res.status(200).send(games);
      } catch (error) {
         res.status(400).send(error);
      }
   },

   getGameByGameKey: async (req, res) => {
      const { key } = req.params;
      try {
         // const game = await Game.findOne({ gameKey: key });
         const game = await Game.findOne({
            $and: [{ gameKey: key }, { open: true }],
         });
         res.status(200).send(game);
      } catch (error) {
         res.status(400).send(error);
      }
   },

   createGame: async (req, res) => {
      try {
         const game = new Game({ ...req.body, ownerId: req.session.uid });
         const newGame = await game.save();
         res.status(200).send(newGame);
      } catch (error) {
         res.status(400).send(error);
      }
   },

   getGameRelation: async (req, res) => {
      const { gameId } = req.params;
      const { uid } = req.session;
      let status = 200;
      let relation = 'guest';

      try {
         const game = await Game.findOne({ _id: gameId });

         if (!req.session || !uid) {
            if (game.open) relation = 'guest';
            else {
               status = 401;
               relation = null;
            }
            res.status(status).send(relation);
            return;
         }

         if (game.ownerId === uid) relation = 'owner';
         else if (game.players.find(player => player.uid === uid)) relation = 'player';
         else if (game.open) relation = 'guest';
         else {
            status = 401;
            relation = null;
         }

         res.status(status).send({ relation });
      } catch (error) {
         res.status(401).send(error);
      }
   },
};
