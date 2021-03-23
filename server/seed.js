const mongoose = require('mongoose');
const Game = require('./models/gameModel');
const chalk = require('chalk');

const games = [
   {
      owner_id: '10',
      game_key: '123456789012',
      name: 'Test Game',
      players: [
         {
            uid: '11',
            character_id: '111000000000',
            gmControl: false,
         },
         {
            uid: '12',
            character_id: '112000000000',
            gmControl: true,
         },
         {
            uid: '13',
            character_id: '113000000000',
            gmControl: false,
         },
      ],
      items_id: '101000000000',
      npcs_id: '201000000000',
      timeline_id: '301000000000',
      party: {
         character_ids: ['111000000000', '112000000000', '113000000000'],
         npc_ids: [],
         party_loot: [],
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
      owner_id: '11',
      game_key: '123123123123',
      name: 'Test Game 2',
      players: [{
         uid: '10',
         character_id: '110000000000',
         gmControl: true,
      }],
      items_id: '102000000000',
      npcs_id: '202000000000',
      timeline_id: '302000000000',
      party: {
         character_ids: ['111000000000'],
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
