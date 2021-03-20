const Game = require('./models/gameModel');
const chalk = require('chalk');

const games = [
   {
      owner_id: '10',
      name: 'Test Game',
      players: ['11', '12', '13'],
      items: '101000000000',
      npcs: '201000000000',
      timeline: '301000000000',
      party: {
         players: ['11', '12'],
         npcs: [],
         party_loot: [],
      },
   },
   {
      owner_id: '11',
      name: 'Test Game 2',
      players: ['10'],
      items: '102000000000',
      npcs: '202000000000',
      timeline: '302000000000',
      party: {
         players: ['11'],
      },
   },
];

module.exports = async (db) => {
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
   }
};
