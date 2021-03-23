const mongoose = require('mongoose');
const { itemSchemaJoin } = require('./itemModel');
const { ObjectId } = mongoose.Schema.Types;

const BooleanSetting = { type: Boolean, default: false };

const game = new mongoose.Schema({
   owner_id: String,
   game_key: {
      type: String,
      minlength: 12,
      maxlength: 12,
   },
   name: String,
   players: [{
      uid: String,
      character_id: ObjectId,
      gmControl: { type: Boolean, default: false },
   }],
   createdOn: { type: Date, default: Date.now, immutable: true },
   lastOpened: { type: Date, default: Date.now },
   items_id: ObjectId,
   npcs_id: ObjectId,
   timeline_id: ObjectId,
   party: {
      character_ids: [ObjectId],
      npc_ids: [ObjectId],
      party_loot: [itemSchemaJoin],
   },
   settings: {
      market: {
         timelineEffects: BooleanSetting, // if major timeline events can have large effects on the market
         priceFluctuation: BooleanSetting, // if market prices change based on supply/demand
         itemVariance: BooleanSetting, // if all items are available at every market or not
      },
   },
});

module.exports = mongoose.model('Game', game);
