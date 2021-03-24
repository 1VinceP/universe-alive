const mongoose = require('mongoose');
const Game = require('./models/gameModel');
const chalk = require('chalk');

const games = [
   {
      ownerId: '10',
      gameKey: '123456789012',
      name: 'Test Game',
      players: [
         {
            uid: '11',
            characterId: '111000000000',
            gmControl: false,
         },
         {
            uid: '12',
            characterId: '112000000000',
            gmControl: true,
         },
         {
            uid: '13',
            characterId: '113000000000',
            gmControl: false,
         },
      ],
      itemsId: '101000000000',
      npcsId: '201000000000',
      timelineId: '301000000000',
      party: {
         characterIds: ['111000000000', '112000000000', '113000000000'],
      },
      settings: {
         market: {
            timelineEffects: false,
            priceFluctuations: true,
            itemVariance: true,
         }
      }
   },
   {
      ownerId: '11',
      gameKey: '123123123123',
      name: 'Test Game 2',
      players: [{
         uid: '10',
         characterId: '110000000000',
         gmControl: true,
      }],
      itemsId: '102000000000',
      npcsId: '202000000000',
      timelineId: '302000000000',
      party: {
         characterIds: ['111000000000'],
      },
      settings: {
         market: {
            timelineEffects: false,
            priceFluctuations: true,
            itemVariance: true,
         }
      }
   },
];

module.exports = async db => {
   try {
      // drop current collections
      await Promise.all([
         db.dropCollection('games'),
      ]);

      // create new collections
      await Promise.all([
         Game.insertMany(games),
      ]);

      console.log(chalk.yellow('database seeded'));
   } catch (error) {
      console.log(error);
      console.log(chalk.red('database failed to seed'));
      process.exit();
   }
};
