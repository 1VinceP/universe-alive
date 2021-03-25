const mongoose = require('mongoose');
const { itemSchemaJoin } = require('./itemModel');
const { ObjectId } = mongoose.Schema.Types;

const BooleanSetting = { type: Boolean, default: false };

const game = new mongoose.Schema({
   ownerId: String,
   gameKey: {
      type: String,
      minlength: 12,
      maxlength: 12,
   },
   name: String,
   open: { type: Boolean, default: true },
   players: {
      type: [{
         uid: String,
         characterId: ObjectId,
         gmControl: { type: Boolean, default: false },
      }],
      default: [],
   },
   createdOn: { type: Date, default: Date.now, immutable: true },
   lastOpened: { type: Date, default: Date.now },
   itemsId: ObjectId,
   npcsId: ObjectId,
   timelineId: ObjectId,
   universeType: { type: String, default: 'planet', enum: ['planet', 'system', 'galaxy'] },
   template: String,
   party: {
      characterIds: { type: [ObjectId], default: [] },
      npcIds: { type: [ObjectId], default: [] },
      partyLoot: { type: [itemSchemaJoin], default: [] },
   },
   settings: {
      simulation: {
         bgsType: { type: String, default: 'moderate', enum: ['passive', 'moderate', 'aggressive'] },
         fgsType: { type: String, default: 'moderate', enum: ['passive', 'moderate', 'aggressive'] },
      },
      market: {
         timelineEffects: BooleanSetting, // if major timeline events can have large effects on the market
         priceFluctuation: BooleanSetting, // if market prices change based on supply/demand
         itemVariance: BooleanSetting, // if all items are available at every market or not
      },
   },
});

module.exports = mongoose.model('Game', game);
